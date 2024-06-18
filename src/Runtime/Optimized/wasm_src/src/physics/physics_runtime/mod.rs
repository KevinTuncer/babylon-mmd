pub(crate) mod physics_model_context;
mod physics_model_handle;
mod world_container;

use glam::{EulerRot, Mat4, Quat, Vec3};
use physics_model_context::PhysicsModelContext;
use physics_model_handle::PhysicsModelHandle;
use world_container::{PhysicsWorldId, WorldContainer};

use crate::{diagnostic::DiagnosticWriter, mmd_model::mmd_runtime_bone::MmdRuntimeBone, mmd_model_metadata::{JointKind, RigidbodyMetadata, RigidbodyMetadataReader, RigidbodyPhysicsMode, RigidbodyShapeType}};

use super::bullet::bind::{constraint::{ConstraintConstructionInfo, ConstraintType}, rigidbody::{MotionType, RigidbodyConstructionInfo, ShapeType}};

pub(crate) struct PhysicsRuntime {
    max_sub_steps: i32,
    fixed_time_step: f32,
    worlds: WorldContainer,
}

impl PhysicsRuntime {
    pub(crate) fn new() -> Self {
        Self {
            max_sub_steps: 120,
            fixed_time_step: 1.0 / 120.0,
            worlds: WorldContainer::new(),
        }
    }

    pub(crate) fn max_sub_steps_mut(&mut self) -> &mut i32 {
        &mut self.max_sub_steps
    }

    pub(crate) fn fixed_time_step_mut(&mut self) -> &mut f32 {
        &mut self.fixed_time_step
    }

    pub(crate) fn get_gravity(&self) -> &Vec3 {
        self.worlds.get_gravity()
    }

    pub(crate) fn set_gravity(&mut self, gravity: Vec3) {
        self.worlds.set_gravity(gravity);
    }

    pub(crate) fn override_world_gravity(&mut self, world_id: PhysicsWorldId, gravity: Option<Vec3>) {
        self.worlds.override_world_gravity(world_id, gravity);
    }

    pub(crate) fn get_world_gravity(&self, world_id: PhysicsWorldId) -> Option<&Vec3> {
        self.worlds.get_world_gravity(world_id)
    }

    pub(crate) fn step_simulation(&mut self, time_step: f32) {
        self.worlds.step_simulation(time_step, self.max_sub_steps, self.fixed_time_step);
    }

    pub(crate) fn build_physics_object(
        &mut self,
        bones: &[MmdRuntimeBone],
        mut reader: RigidbodyMetadataReader,
        mut diagnostic: DiagnosticWriter
    ) -> PhysicsModelContext {
        let world_matrix = *reader.model_initial_world_matrix();

        let (scaling_factor, world_rotation) = if world_matrix.determinant() == 0.0 {
            (1.0, glam::Quat::IDENTITY)
        } else {
            let (scale, rotation, _) = world_matrix.to_scale_rotation_translation();
            if ((scale.x - scale.y).abs() < 0.0001) && ((scale.y - scale.z).abs() < 0.0001) {
                if (scale.x - 1.0).abs() < 0.0001 {
                    (1.0, rotation)
                } else {
                    diagnostic.warning("Root node scaling is not 1, simulation may differ from the original".to_string());
                    (scale.x, rotation)
                }
            } else {
                diagnostic.warning("Root node scaling is not uniform, physics may not work correctly".to_string());
                (scale.max_element(), rotation)
            }
        };

        let world_id = reader.physics_world_id();
        let world = self.worlds.get_or_create_world(world_id);
        let physics_object_handle = world.create_physics_object();
        let physics_object = world.get_physics_object_mut(physics_object_handle);
        let physics_handle = PhysicsModelHandle::new(world_id, physics_object_handle);

        let mut rigidbody_map = vec![-1; reader.count() as usize];
        let mut rigidbody_initial_transforms = Vec::with_capacity(reader.count() as usize);

        let mut rb_info = RigidbodyConstructionInfo::new();
        let mut kinematic_object_count = 0;

        let mut set_rb_info = |rb_info: &mut RigidbodyConstructionInfo, rigidbody_index: u32, metadata: RigidbodyMetadata| {
            let bone_index = metadata.bone_index;
            if bone_index < 0 || bones.len() <= bone_index as usize {
                diagnostic.warning(format!("Bone index out of range failed to create rigid body {}", rigidbody_index));
                return None;
            }

            let shape_size = metadata.shape_size * scaling_factor;

            let (shape_type, is_zero_volume) = if metadata.shape_type == RigidbodyShapeType::Sphere as u8 {
                let is_zero_volume = shape_size.x == 0.0;
                (ShapeType::Sphere, is_zero_volume)
            } else if metadata.shape_type == RigidbodyShapeType::Box as u8 {
                let is_zero_volume = shape_size.x == 0.0 || shape_size.y == 0.0 || shape_size.z == 0.0;
                (ShapeType::Box, is_zero_volume)
            } else if metadata.shape_type == RigidbodyShapeType::Capsule as u8 {
                let is_zero_volume = shape_size.x == 0.0 || shape_size.y == 0.0;
                (ShapeType::Capsule, is_zero_volume)
            } else {
                diagnostic.warning(format!("Unsupported shape type {} for rigid body {}", metadata.shape_type, rigidbody_index));
                return None;
            };
            rb_info.set_shape_type(shape_type);
            
            rb_info.set_shape_size(shape_size.extend(0.0));

            let motion_type = if metadata.physics_mode == RigidbodyPhysicsMode::FollowBone as u8 {
                MotionType::Kinematic
            } else if metadata.physics_mode == RigidbodyPhysicsMode::Physics as u8 || metadata.physics_mode == RigidbodyPhysicsMode::PhysicsWithBone as u8 {
                MotionType::Dynamic
            } else {
                diagnostic.warning(format!("Unsupported physics mode {} for rigid body {}", metadata.physics_mode, rigidbody_index));
                return None;
            };
            rb_info.set_motion_type(motion_type);

            // model space position and rotation
            let position = metadata.shape_position;
            let rotation = Quat::from_euler(
                EulerRot::YXZ,
                metadata.shape_rotation.y, metadata.shape_rotation.x, metadata.shape_rotation.z
            );

            // compute the offset matrix from the bone to the rigid body
            let body_offset_matrix = {
                let world_matrix = Mat4::from_rotation_translation(rotation, position.into());
                let parent_world_matrix_inverse = *bones[bone_index as usize].absolute_inverse_bind_matrix();

                parent_world_matrix_inverse * world_matrix
            };

            // world space position and rotation
            let position = world_matrix.transform_point3a(position);
            let rotation = world_rotation * rotation;

            rb_info.set_start_transform(position.into(), rotation);
            rb_info.set_mass(metadata.mass * scaling_factor);
            rb_info.set_damping(metadata.linear_damping, metadata.angular_damping);
            rb_info.set_friction(metadata.friction);
            rb_info.set_restitution(metadata.repulsion);
            rb_info.set_additional_damping(true);
            rb_info.set_no_contact_response(metadata.collision_mask == 0x0000 || is_zero_volume);
            rb_info.set_collision_group_mask(metadata.collision_group as u16, metadata.collision_mask);
            rb_info.set_sleeping_threshold(0.0, 0.0);
            rb_info.set_disable_deactivation(true);

            Some((bone_index, motion_type, body_offset_matrix))
        };

        physics_object.reserve_bodies(reader.count() as usize);
        reader.enumerate(|rigidbody_index, metadata| {
            let position = metadata.shape_position;
            let rotation = metadata.shape_rotation;

            let (bone_index, motion_type, body_offset_matrix) = match set_rb_info(&mut rb_info, rigidbody_index, metadata) {
                Some(v) => v,
                None => return,
            };

            physics_object.create_rigidbody(&rb_info, bone_index as u32, &body_offset_matrix);

            rigidbody_map[rigidbody_index as usize] = rigidbody_initial_transforms.len() as i32;
            rigidbody_initial_transforms.push((position, rotation));

            if let MotionType::Kinematic = motion_type {
                kinematic_object_count += 1;
            }
        });

        let kinematic_shared_physics_world_ids = reader.take_kinematic_shared_physics_world_ids();
        let mut kinematic_shared_physics_handles = Vec::with_capacity(kinematic_shared_physics_world_ids.len());

        for world_id in kinematic_shared_physics_world_ids {
            let world = self.worlds.get_or_create_world(world_id);
            let physics_object_handle = world.create_physics_object();
            let physics_object = world.get_physics_object_mut(physics_object_handle);
            let physics_handle = PhysicsModelHandle::new(world_id, physics_object_handle);

            physics_object.reserve_bodies(kinematic_object_count);
            reader.enumerate(|rigidbody_index, metadata| {
                if metadata.physics_mode != RigidbodyPhysicsMode::FollowBone as u8 {
                    return;
                }
                
                let (bone_index, _, body_offset_matrix) = match set_rb_info(&mut rb_info, rigidbody_index, metadata) {
                    Some(v) => v,
                    None => return,
                };

                physics_object.create_rigidbody(&rb_info, bone_index as u32, &body_offset_matrix);
            });

            kinematic_shared_physics_handles.push(physics_handle);
        }

        let mut reader = reader.next().unwrap();
        let world = self.worlds.get_or_create_world(world_id);
        let physics_object = world.get_physics_object_mut(physics_object_handle);

        let mut constraint_info = ConstraintConstructionInfo::new();

        physics_object.reserve_constraints(reader.count() as usize);
        reader.enumerate(|constraint_index, metadata| {
            let rigidbody_index_a = metadata.rigidbody_index_a;
            let rigidbody_index_b = metadata.rigidbody_index_b;

            let rigidbody_index_a = if rigidbody_index_a < 0 || rigidbody_map.len() <= rigidbody_index_a as usize {
                diagnostic.warning(format!("Rigid body index out of range failed to create joint {}", constraint_index));
                return;
            } else {
                let rigidbody_index_a = rigidbody_map[rigidbody_index_a as usize];
                if rigidbody_index_a == -1 {
                    diagnostic.warning(format!("Rigid body not found failed to create joint {}", constraint_index));
                    return;
                }
                rigidbody_index_a
            };

            let rigidbody_index_b = if rigidbody_index_b < 0 || rigidbody_map.len() <= rigidbody_index_b as usize {
                diagnostic.warning(format!("Rigid body index out of range failed to create joint {}", constraint_index));
                return;
            } else {
                let rigidbody_index_b = rigidbody_map[rigidbody_index_b as usize];
                if rigidbody_index_b == -1 {
                    diagnostic.warning(format!("Rigid body not found failed to create joint {}", constraint_index));
                    return;
                }
                rigidbody_index_b
            };
            
            let constraint_type = if metadata.kind == JointKind::Spring6Dof as u8 {
                ConstraintType::Generic6DofSpring
            } else {
                diagnostic.warning(format!("Unsupported joint kind {} for joint {}", metadata.kind, constraint_index));
                return;
            };

            constraint_info.set_type(constraint_type);
            constraint_info.set_bodies(rigidbody_index_a as usize, rigidbody_index_b as usize);

            let joint_transform = Mat4::from_rotation_translation(
                Quat::from_euler(
                    EulerRot::YXZ,
                    metadata.rotation.y, metadata.rotation.x, metadata.rotation.z
                ),
                (metadata.position * scaling_factor).into()
            );

            let rigidbody_a_inverse = {
                let (position, rotation) = rigidbody_initial_transforms[rigidbody_index_a as usize];
                let world_matrix = Mat4::from_rotation_translation(
                    Quat::from_euler(
                        EulerRot::YXZ,
                        rotation.y, rotation.x, rotation.z
                    ),
                    (position * scaling_factor).into()
                );
                world_matrix.inverse()
            };

            let rigidbody_b_inverse = {
                let (position, rotation) = rigidbody_initial_transforms[rigidbody_index_b as usize];
                let world_matrix = Mat4::from_rotation_translation(
                    Quat::from_euler(
                        EulerRot::YXZ,
                        rotation.y, rotation.x, rotation.z
                    ),
                    (position * scaling_factor).into()
                );
                world_matrix.inverse()
            };

            let joint_final_transform_a = rigidbody_a_inverse * joint_transform;
            let joint_final_transform_b = rigidbody_b_inverse * joint_transform;

            constraint_info.set_frames(&joint_final_transform_a, &joint_final_transform_b);
            constraint_info.set_use_linear_reference_frame_a(true);
            constraint_info.set_disable_collisions_between_linked_bodies(false);
            constraint_info.set_linear_limits(metadata.position_min.into(), metadata.position_max.into());
            constraint_info.set_angular_limits(metadata.rotation_min.into(), metadata.rotation_max.into());
            constraint_info.set_stiffness(metadata.spring_position.into(), metadata.spring_rotation.into());

            if let Err(message) = physics_object.create_constraint(&constraint_info) {
                diagnostic.warning(message);
            }

            // adjust the physics mode of the rigid bodies
            // ref: https://web.archive.org/web/20140815111315/www20.atpages.jp/katwat/wp/?p=4135
            // const nodeA = nodes[joint.rigidbodyIndexA]!;
            // const nodeB = nodes[joint.rigidbodyIndexB]!;

            // if (nodeA.physicsMode !== PmxObject.RigidBody.PhysicsMode.FollowBone &&
            //     nodeB.physicsMode === PmxObject.RigidBody.PhysicsMode.PhysicsWithBone) { // case: A is parent of B
            //     if (resolveRigidBodyBone(bodyInfoB)!.parentBone === resolveRigidBodyBone(bodyInfoA)!) {
            //         nodeB.physicsMode = PmxObject.RigidBody.PhysicsMode.Physics;
            //     }
            // } else if (nodeB.physicsMode !== PmxObject.RigidBody.PhysicsMode.FollowBone &&
            //     nodeA.physicsMode === PmxObject.RigidBody.PhysicsMode.PhysicsWithBone) { // case: B is parent of A
            //     if (resolveRigidBodyBone(bodyInfoA)!.parentBone === resolveRigidBodyBone(bodyInfoB)!) {
            //         nodeA.physicsMode = PmxObject.RigidBody.PhysicsMode.Physics;
            //     }
            // }
        });

        PhysicsModelContext::new(
            physics_handle,
            kinematic_shared_physics_handles,
            world_matrix,
        )
    }

    pub(crate) fn destroy_physics_context(&mut self, context: &PhysicsModelContext) {
        self.worlds.destroy_physics_context(context);
    }
}
