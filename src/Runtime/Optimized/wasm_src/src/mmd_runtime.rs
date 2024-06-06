use std::ptr::NonNull;
use std::sync::atomic;

use wasm_bindgen::prelude::*;

use crate::animation::mmd_runtime_animation::MmdRuntimeAnimation;
use crate::mmd_model::MmdModel;
use crate::mmd_model_metadata::MetadataBuffer;

#[cfg(feature = "parallel")]
use rayon::prelude::*;

#[wasm_bindgen]
pub struct MmdRuntime {
    #[allow(clippy::vec_box)]
    mmd_models: Vec<Box<MmdModel>>,
    locked: atomic::AtomicU8,
}

#[wasm_bindgen]
impl MmdRuntime {
    pub(crate) fn new() -> Self {
        MmdRuntime {
            mmd_models: Vec::new(),
            locked: atomic::AtomicU8::new(0),
        }
    }

    #[wasm_bindgen(js_name = "allocateBuffer")]
    pub fn allocate_buffer(&self, size: usize) -> *mut u8 {
        let mut vec = vec![0; size].into_boxed_slice();
        let ptr = vec.as_mut_ptr();
        std::mem::forget(vec);
        ptr
    }

    #[wasm_bindgen(js_name = "deallocateBuffer")]
    pub fn deallocate_buffer(&self, ptr: *mut u8, size: usize) {
        unsafe {
            let _ = Box::from_raw(std::slice::from_raw_parts_mut(ptr, size));
        }
    }

    #[wasm_bindgen(js_name = "createMmdModel")]
    pub fn create_mmd_model(&mut self, serialized_metadata_ptr: *const u8, serialized_metadata_size: usize) -> *mut usize {
        let serialized_metadata = unsafe {
            std::slice::from_raw_parts(serialized_metadata_ptr, serialized_metadata_size)
        };
        let metadata_buffer = MetadataBuffer::new(serialized_metadata);

        let mmd_model = Box::new(MmdModel::new(metadata_buffer));
        let ptr = &*mmd_model as *const MmdModel as *mut usize;
        self.mmd_models.push(mmd_model);
        ptr
    }

    #[wasm_bindgen(js_name = "destroyMmdModel")]
    pub fn destroy_mmd_model(&mut self, ptr: *mut usize) {
        let ptr = ptr as *mut MmdModel;
        let index = match self.mmd_models.iter().position(|mmd_model| &**mmd_model as *const MmdModel == ptr) {
            Some(index) => index,
            None => return,
        };
        self.mmd_models.remove(index);
    }

    #[wasm_bindgen(js_name = "getAnimationArena")]
    pub fn get_animation_bone_arena(&mut self, ptr: *mut usize) -> *mut f32 {
        let ptr = ptr as *mut MmdModel;
        let animation_arena = unsafe {
            &mut *ptr
        }.animation_arena_mut();
        animation_arena.bone_arena_mut().as_mut_ptr() as *mut f32
    }

    #[wasm_bindgen(js_name = "getAnimationIkSolverStateArena")]
    pub fn get_animation_iksolver_state_arena(&mut self, ptr: *mut usize) -> *mut u8 {
        let ptr = ptr as *mut MmdModel;
        let animation_arena = unsafe {
            &mut *ptr
        }.animation_arena_mut();
        animation_arena.iksolver_state_arena_mut().as_mut_ptr()
    }

    #[wasm_bindgen(js_name = "getAnimationMorphArena")]
    pub fn get_animation_morph_arena(&mut self, ptr: *mut usize) -> *mut f32 {
        let ptr = ptr as *mut MmdModel;
        let animation_arena = unsafe {
            &mut *ptr
        }.animation_arena_mut();
        animation_arena.morph_arena_mut().as_mut_ptr()
    }
    
    #[wasm_bindgen(js_name = "getBoneWorldMatrixArena")]
    pub fn get_bone_world_matrix_arena(&mut self, ptr: *mut usize) -> *mut f32 {
        let ptr = ptr as *mut MmdModel;
        let bone_arena = unsafe {
            &mut *ptr
        }.bone_arena_mut();
        bone_arena.world_matrix_arena_mut_ptr()
    }

    #[wasm_bindgen(js_name = "createBoneWorldMatrixBackBuffer")]
    pub fn create_bone_world_matrix_back_buffer(&mut self, ptr: *mut usize) -> *mut f32 {
        let ptr = ptr as *mut MmdModel;
        let bone_arena = unsafe {
            &mut *ptr
        }.bone_arena_mut();
        bone_arena.create_world_matrix_back_buffer()
    }

    #[wasm_bindgen(js_name = "setRuntimeAnimation")]
    pub fn set_runtime_animation(&mut self, ptr: *mut usize, runtime_animation: *mut usize) {
        let ptr = ptr as *mut MmdModel;

        let runtime_animation = NonNull::new(runtime_animation as *mut MmdRuntimeAnimation);

        let animation = unsafe {
            &mut *ptr
        }.runtime_animation_mut();
        *animation = runtime_animation;
    }

    #[wasm_bindgen(js_name = "setExternalPhysics")]
    pub fn set_external_physics(&mut self, ptr: *mut usize, external_physics: bool) {
        let ptr = ptr as *mut MmdModel;

        let physics = unsafe {
            &mut *ptr
        }.external_physics_mut();
        *physics = external_physics;
    }

    #[wasm_bindgen(js_name = "beforePhysics")]
    pub fn before_physics(&mut self, frame_time: Option<f32>){
        #[cfg(feature = "parallel")]
        {
            if 1 < self.mmd_models.len() {
                self.mmd_models.par_iter_mut().for_each(|mmd_model| {
                    mmd_model.before_physics(frame_time);
                });
            } else if !self.mmd_models.is_empty() {
                self.mmd_models[0].before_physics(frame_time);
            }
        }

        #[cfg(not(feature = "parallel"))]
        for mmd_model in &mut self.mmd_models {
            mmd_model.before_physics(frame_time);
        }
    }

    #[wasm_bindgen(js_name = "afterPhysics")]
    pub fn after_physics(&mut self) {
        #[cfg(feature = "parallel")]
        {
            if 1 < self.mmd_models.len() {
                self.mmd_models.par_iter_mut().for_each(|mmd_model| {
                    mmd_model.after_physics();
                });
            } else if !self.mmd_models.is_empty() {
                self.mmd_models[0].after_physics();
            }
        }

        #[cfg(not(feature = "parallel"))]
        for mmd_model in &mut self.mmd_models {
            mmd_model.after_physics();
        }
    }

    #[wasm_bindgen(js_name = "getLockStatePtr")]
    pub fn get_lock_state_ptr(&self) -> *const u8 {
        &self.locked as *const atomic::AtomicU8 as *const u8
    }

    #[wasm_bindgen(js_name = "swapWorldMatrixBuffer")]
    pub fn swap_world_matrix_buffer(&mut self) {
        for mmd_model in &mut self.mmd_models {
            mmd_model.bone_arena_mut().swap_buffer();
        }
    }

    #[cfg(feature = "parallel")]
    #[wasm_bindgen(js_name = "bufferedBeforePhysics")]
    pub fn buffered_before_physics(mmd_runtime: &mut MmdRuntime, frame_time: Option<f32>) {
        let mmd_runtime = unsafe {
            &mut *(mmd_runtime as *mut MmdRuntime)
        };
        mmd_runtime.locked.store(1, atomic::Ordering::Release);
        rayon::spawn(move || {
            mmd_runtime.before_physics(frame_time);
            mmd_runtime.locked.store(0, atomic::Ordering::Release);
        });
    }

    #[cfg(feature = "parallel")]
    #[wasm_bindgen(js_name = "bufferedUpdate")]
    pub fn buffered_update(mmd_runtime: &mut MmdRuntime, frame_time: Option<f32>) {
        let mmd_runtime = unsafe {
            &mut *(mmd_runtime as *mut MmdRuntime)
        };
        mmd_runtime.locked.store(1, atomic::Ordering::Release);
        rayon::spawn(move || {
            mmd_runtime.before_physics(frame_time);
            mmd_runtime.after_physics();
            mmd_runtime.locked.store(0, atomic::Ordering::Release);
        });
    }
}

impl Default for MmdRuntime {
    fn default() -> Self {
        Self::new()
    }
}
