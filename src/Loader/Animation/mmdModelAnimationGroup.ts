import { Animation } from "@babylonjs/core/Animations/animation";
import { AnimationGroup } from "@babylonjs/core/Animations/animationGroup";
import type { IAnimationKey } from "@babylonjs/core/Animations/animationKey";
import { AnimationKeyInterpolation } from "@babylonjs/core/Animations/animationKey";
import { Quaternion, Vector3 } from "@babylonjs/core/Maths/math.vector";
import type { Nullable } from "@babylonjs/core/types";

import type { MmdModel } from "@/Runtime/mmdModel";

import { computeHermiteTangent } from "./Common/computeHermiteTangent";
import type { IMmdAnimation } from "./IMmdAnimation";
import type { MmdAnimation } from "./mmdAnimation";
import type { MmdBoneAnimationTrack, MmdMorphAnimationTrack, MmdMovableBoneAnimationTrack, MmdPropertyAnimationTrack } from "./mmdAnimationTrack";

/**
 * A container type that stores mmd model animations using the `Animation` container in babylon.js
 *
 * It aims to utilize the animation runtime of babylon.js
 */
export class MmdModelAnimationGroup implements IMmdAnimation {
    /**
     * Animation name for identification
     */
    public readonly name: string;

    /**
     * Bone position animation tracks for one `mesh.skeleton`
     */
    public readonly bonePositionAnimations: readonly Animation[];

    /**
     * Bone position animation track bind map for one `mesh.skeleton`
     */
    public readonly bonePositionAnimationBindMap: readonly string[];

    /**
     * Bone rotation animation tracks for one `mesh.skeleton`
     */
    public readonly boneRotationAnimations: readonly Animation[];

    /**
     * Bone rotation animation track bind map for one `mesh.skeleton`
     */
    public readonly boneRotationAnimationBindMap: readonly string[];

    /**
     * Morph animation tracks for one `mmdModel.morph`
     */
    public readonly morphAnimations: readonly Animation[];

    /**
     * Property animation track(a.k.a. IK toggle animation) for one `mmdModel`
     */
    public readonly propertyAnimations: readonly Animation[];

    /**
     * Visibility animation track for one `mesh`
     */
    public readonly visibilityAnimation: Nullable<Animation>;

    /**
     * The start frame of this animation
     */
    public readonly startFrame: number;

    /**
     * The end frame of this animation
     */
    public readonly endFrame: number;

    /**
     * Create a unbinded mmd model animation group
     * @param mmdAnimation The mmd animation data
     * @param builder The builder for constructing mmd model animation group
     */
    public constructor(
        mmdAnimation: MmdAnimation,
        builder: new () => IMmdModelAnimationGroupBuilder
    ) {
        const builderInstance = new builder();

        const name = this.name = mmdAnimation.name;

        const moveableBoneTracks = mmdAnimation.moveableBoneTracks;
        const bonePositionAnimations: Animation[] = this.bonePositionAnimations = new Array(moveableBoneTracks.length);
        const bonePositionAnimationBindMap: string[] = this.bonePositionAnimationBindMap = new Array(moveableBoneTracks.length);
        for (let i = 0; i < moveableBoneTracks.length; ++i) {
            bonePositionAnimations[i] = builderInstance.createBonePositionAnimation(name, moveableBoneTracks[i]);
            bonePositionAnimationBindMap[i] = moveableBoneTracks[i].name;
        }

        const boneTracks = mmdAnimation.boneTracks;
        const boneRotationAnimations: Animation[] = this.boneRotationAnimations = new Array(boneTracks.length + moveableBoneTracks.length);
        const boneRotationAnimationBindMap: string[] = this.boneRotationAnimationBindMap = new Array(boneTracks.length + moveableBoneTracks.length);
        for (let i = 0; i < boneTracks.length; ++i) {
            boneRotationAnimations[i] = builderInstance.createBoneRotationAnimation(name, boneTracks[i]);
            boneRotationAnimationBindMap[i] = boneTracks[i].name;
        }
        for (let i = 0; i < moveableBoneTracks.length; ++i) {
            boneRotationAnimations[boneTracks.length + i] = builderInstance.createBoneRotationAnimation(name, moveableBoneTracks[i]);
            boneRotationAnimationBindMap[boneTracks.length + i] = moveableBoneTracks[i].name;
        }

        const morphTracks = mmdAnimation.morphTracks;
        const morphAnimations: Animation[] = this.morphAnimations = new Array(morphTracks.length);
        for (let i = 0; i < morphTracks.length; ++i) {
            morphAnimations[i] = builderInstance.createMorphAnimation(name, morphTracks[i]);
        }

        this.propertyAnimations = builderInstance.createPropertyAnimation(name, mmdAnimation.propertyTrack);
        this.visibilityAnimation = builderInstance.createVisibilityAnimation(name, mmdAnimation.propertyTrack);

        this.startFrame = mmdAnimation.startFrame;
        this.endFrame = mmdAnimation.endFrame;
    }

    /**
     * Create a binded mmd model animation group for the given `MmdModel`
     * @param mmdModel The mmd model to bind
     * @returns The binded mmd model animation group
     */
    public createAnimationGroup(mmdModel: MmdModel): AnimationGroup {
        const animationGroup = new AnimationGroup(this.name, mmdModel.mesh.getScene(), 1);
        animationGroup.isAdditive = true;

        const skeletonBoneMap = new Map<string, number>();
        const skeletonBones = mmdModel.mesh.skeleton.bones;
        for (let i = 0; i < skeletonBones.length; ++i) {
            skeletonBoneMap.set(skeletonBones[i].name, i);
        }

        const bonePositionAnimations = this.bonePositionAnimations;
        const bonePositionAnimationBindMap = this.bonePositionAnimationBindMap;
        for (let i = 0; i < bonePositionAnimations.length; ++i) {
            const boneIndex = skeletonBoneMap.get(bonePositionAnimationBindMap[i]);
            if (boneIndex !== undefined) {
                animationGroup.addTargetedAnimation(bonePositionAnimations[i], skeletonBones[boneIndex]);
            }
        }

        const boneRotationAnimations = this.boneRotationAnimations;
        const boneRotationAnimationBindMap = this.boneRotationAnimationBindMap;
        for (let i = 0; i < boneRotationAnimations.length; ++i) {
            const boneIndex = skeletonBoneMap.get(boneRotationAnimationBindMap[i]);
            if (boneIndex !== undefined) {
                animationGroup.addTargetedAnimation(boneRotationAnimations[i], skeletonBones[boneIndex]);
            }
        }

        // const morphAnimations = this.morphAnimations;
        // for (let i = 0; i < morphAnimations.length; ++i) {
        //     animationGroup.addTargetedAnimation(morphAnimations[i], mmdModel.morph.getMorph
        // }

        // const propertyAnimations = this.propertyAnimations;
        // for (let i = 0; i < propertyAnimations.length; ++i) {
        //     animationGroup.addTargetedAnimation(propertyAnimations[i], mmdModel.sortedRuntimeBones[0].ikSolver?.enabled);
        // }

        const visibilityAnimation = this.visibilityAnimation;
        if (visibilityAnimation !== null) {
            animationGroup.addTargetedAnimation(visibilityAnimation, mmdModel.mesh);
        }

        return animationGroup;
    }
}

/**
 * Mmd model animation builder for constructing mmd model animation group
 */
export interface IMmdModelAnimationGroupBuilder {
    /**
     * Create mmd model bone position animation
     * @param rootName root animation name
     * @param mmdAnimationTrack mmd bone animation track
     * @returns babylon.js animation
     */
    createBonePositionAnimation(rootName: string, mmdAnimationTrack: MmdMovableBoneAnimationTrack): Animation;

    /**
     * Create mmd model bone rotation animation
     * @param rootName root animation name
     * @param mmdAnimationTrack mmd bone animation track
     * @returns babylon.js animation
     */
    createBoneRotationAnimation(rootName: string, mmdAnimationTrack: MmdBoneAnimationTrack | MmdMovableBoneAnimationTrack): Animation;

    /**
     * Create mmd model morph animation
     * @param rootName root animation name
     * @param mmdAnimationTrack mmd morph animation track
     * @returns babylon.js animation
     */
    createMorphAnimation(rootName: string, mmdAnimationTrack: MmdMorphAnimationTrack): Animation;

    /**
     * Create mmd model property animation
     * @param rootName root animation name
     * @param mmdAnimationTrack mmd property animation track
     * @returns babylon.js animations
     */
    createPropertyAnimation(rootName: string, mmdAnimationTrack: MmdPropertyAnimationTrack): Animation[];

    /**
     * Create mmd model visibility animation
     * @param rootName root animation name
     * @param mmdAnimationTrack mmd property animation track
     * @returns babylon.js animation
     */
    createVisibilityAnimation(rootName: string, mmdAnimationTrack: MmdPropertyAnimationTrack): Nullable<Animation>;
}

/**
 * Use hermite interpolation for import animation bezier curve parameter
 *
 * This has some loss of curve shape, but it converts animations reliably while maintaining a small amount of keyframes
 */
export class MmdModelAnimationGroupHermiteBuilder implements IMmdModelAnimationGroupBuilder {
    /**
     * Create mmd model bone position animation
     * @param rootName root animation name
     * @param mmdAnimationTrack mmd bone animation track
     * @returns babylon.js animation
     */
    public createBonePositionAnimation(rootName: string, mmdAnimationTrack: MmdMovableBoneAnimationTrack): Animation {
        const animation = new Animation(rootName + "_bone_position_" + mmdAnimationTrack.name, "position", 30, Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CYCLE);

        const frameNumbers = mmdAnimationTrack.frameNumbers;
        const positions = mmdAnimationTrack.positions;
        const positionInterpolations = mmdAnimationTrack.positionInterpolations;

        const keys = new Array<IAnimationKey>(frameNumbers.length);
        for (let i = 0; i < frameNumbers.length; ++i) {
            const frame = frameNumbers[i];
            const hasPreviousFrame = 0 < i;
            const nextFrame = i + 1 < frameNumbers.length ? frameNumbers[i + 1] : Infinity;
            const inFrameDelta = frame - (0 < i ? frameNumbers[i - 1] : -30);
            const outFrameDelta = nextFrame - frame;

            keys[i] = {
                frame: frame,
                value: new Vector3(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]),
                inTangent: hasPreviousFrame
                    ? new Vector3(
                        computeHermiteTangent(1 - positionInterpolations[i * 12 + 1] / 127, 1 - positionInterpolations[i * 12 + 3] / 127, inFrameDelta, positions[i * 3] - positions[(i - 1) * 3]),
                        computeHermiteTangent(1 - positionInterpolations[i * 12 + 5] / 127, 1 - positionInterpolations[i * 12 + 7] / 127, inFrameDelta, positions[i * 3 + 1] - positions[(i - 1) * 3 + 1]),
                        computeHermiteTangent(1 - positionInterpolations[i * 12 + 9] / 127, 1 - positionInterpolations[i * 12 + 11] / 127, inFrameDelta, positions[i * 3 + 2] - positions[(i - 1) * 3 + 2])
                    )
                    : undefined,
                outTangent: nextFrame < Infinity
                    ? new Vector3(
                        computeHermiteTangent(positionInterpolations[(i + 1) * 12 + 0] / 127, positionInterpolations[(i + 1) * 12 + 2] / 127, outFrameDelta, positions[(i + 1) * 3] - positions[i * 3]),
                        computeHermiteTangent(positionInterpolations[(i + 1) * 12 + 4] / 127, positionInterpolations[(i + 1) * 12 + 6] / 127, outFrameDelta, positions[(i + 1) * 3 + 1] - positions[i * 3 + 1]),
                        computeHermiteTangent(positionInterpolations[(i + 1) * 12 + 8] / 127, positionInterpolations[(i + 1) * 12 + 10] / 127, outFrameDelta, positions[(i + 1) * 3 + 2] - positions[i * 3 + 2])
                    )
                    : undefined,
                interpolation: AnimationKeyInterpolation.NONE,
                lockedTangent: false
            };
        }
        animation.setKeys(keys);

        return animation;
    }

    // ref: https://github.com/UuuNyaa/blender_mmd_tools/blob/main/mmd_tools/core/vmd/importer.py#L274-L280
    private _minimizeRotationDifference(rotation: Quaternion, previousRotation: Quaternion): void {
        const dot = Quaternion.Dot(rotation, previousRotation);
        if (dot < 0) {
            rotation.x = -rotation.x;
            rotation.y = -rotation.y;
            rotation.z = -rotation.z;
            rotation.w = -rotation.w;
        }
    }

    /**
     * Create mmd model bone rotation animation
     * @param rootName root animation name
     * @param mmdAnimationTrack mmd bone animation track
     * @returns babylon.js animation
     */
    public createBoneRotationAnimation(rootName: string, mmdAnimationTrack: MmdBoneAnimationTrack | MmdMovableBoneAnimationTrack): Animation {
        const animation = new Animation(rootName + "_bone_rotation_" + mmdAnimationTrack.name, "rotationQuaternion", 30, Animation.ANIMATIONTYPE_QUATERNION, Animation.ANIMATIONLOOPMODE_CYCLE);

        const frameNumbers = mmdAnimationTrack.frameNumbers;
        const rotations = mmdAnimationTrack.rotations;
        const rotationInterpolations = mmdAnimationTrack.rotationInterpolations;
        let previousRotation = new Quaternion(0, 0, 0, 0);

        const keys = new Array<IAnimationKey>(frameNumbers.length);
        for (let i = 0; i < frameNumbers.length; ++i) {
            const frame = frameNumbers[i];
            const hasPreviousFrame = 0 < i;
            const nextFrame = i + 1 < frameNumbers.length ? frameNumbers[i + 1] : Infinity;
            const inFrameDelta = frame - (0 < i ? frameNumbers[i - 1] : -30);
            const outFrameDelta = nextFrame - frame;

            const rotation = new Quaternion(rotations[i * 4], rotations[i * 4 + 1], rotations[i * 4 + 2], rotations[i * 4 + 3]);
            this._minimizeRotationDifference(rotation, previousRotation);

            const nextRotation = new Quaternion(rotations[(i + 1) * 4], rotations[(i + 1) * 4 + 1], rotations[(i + 1) * 4 + 2], rotations[(i + 1) * 4 + 3]);
            this._minimizeRotationDifference(nextRotation, rotation);

            // Uses different interpolation methods from mmd
            // ref: https://github.com/UuuNyaa/blender_mmd_tools/blob/main/mmd_tools/core/vmd/importer.py#L435-L437
            keys[i] = {
                frame: frame,
                value: rotation,
                inTangent: hasPreviousFrame
                    ? new Quaternion(
                        computeHermiteTangent(1 - rotationInterpolations[i * 4 + 1] / 127, 1 - rotationInterpolations[i * 4 + 3] / 127, inFrameDelta, rotation.x - previousRotation.x),
                        computeHermiteTangent(1 - rotationInterpolations[i * 4 + 1] / 127, 1 - rotationInterpolations[i * 4 + 3] / 127, inFrameDelta, rotation.y - previousRotation.y),
                        computeHermiteTangent(1 - rotationInterpolations[i * 4 + 1] / 127, 1 - rotationInterpolations[i * 4 + 3] / 127, inFrameDelta, rotation.z - previousRotation.z),
                        computeHermiteTangent(1 - rotationInterpolations[i * 4 + 1] / 127, 1 - rotationInterpolations[i * 4 + 3] / 127, inFrameDelta, rotation.w - previousRotation.w)
                    )
                    : undefined,
                outTangent: nextFrame < Infinity
                    ? new Quaternion(
                        computeHermiteTangent(rotationInterpolations[(i + 1) * 4 + 0] / 127, rotationInterpolations[(i + 1) * 4 + 2] / 127, outFrameDelta, nextRotation.x - rotation.x),
                        computeHermiteTangent(rotationInterpolations[(i + 1) * 4 + 0] / 127, rotationInterpolations[(i + 1) * 4 + 2] / 127, outFrameDelta, nextRotation.y - rotation.y),
                        computeHermiteTangent(rotationInterpolations[(i + 1) * 4 + 0] / 127, rotationInterpolations[(i + 1) * 4 + 2] / 127, outFrameDelta, nextRotation.z - rotation.z),
                        computeHermiteTangent(rotationInterpolations[(i + 1) * 4 + 0] / 127, rotationInterpolations[(i + 1) * 4 + 2] / 127, outFrameDelta, nextRotation.w - rotation.w)
                    )
                    : undefined,
                interpolation: AnimationKeyInterpolation.NONE,
                lockedTangent: false
            };

            previousRotation = rotation;
        }
        animation.setKeys(keys);

        return animation;
    }

    /**
     * Create mmd model morph animation
     * @param rootName root animation name
     * @param mmdAnimationTrack mmd morph animation track
     * @returns babylon.js animation
     */
    public createMorphAnimation(rootName: string, mmdAnimationTrack: MmdMorphAnimationTrack): Animation {
        const animation = new Animation(rootName + "_morph_" + mmdAnimationTrack.name, mmdAnimationTrack.name, 30, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE);

        const frameNumbers = mmdAnimationTrack.frameNumbers;
        const weights = mmdAnimationTrack.weights;

        const keys = new Array<IAnimationKey>(frameNumbers.length);
        for (let i = 0; i < frameNumbers.length; ++i) {
            keys[i] = {
                frame: frameNumbers[i],
                value: weights[i],
                interpolation: AnimationKeyInterpolation.NONE
            };
        }
        animation.setKeys(keys);

        return animation;
    }

    /**
     * Create mmd model visibility animation
     * @param rootName root animation name
     * @param mmdAnimationTrack mmd property animation track
     * @returns babylon.js animation
     */
    public createPropertyAnimation(rootName: string, mmdAnimationTrack: MmdPropertyAnimationTrack): Animation[] {
        const animations: Animation[] = new Array(mmdAnimationTrack.ikBoneNames.length);

        const ikBoneNames = mmdAnimationTrack.ikBoneNames;
        for (let i = 0; i < ikBoneNames.length; ++i) {
            const animation = animations[i] = new Animation(rootName + "_ik_" + ikBoneNames[i], ikBoneNames[i], 30, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE);

            const frameNumbers = mmdAnimationTrack.frameNumbers;
            const ikStates = mmdAnimationTrack.ikStates[i];

            const keys = new Array<IAnimationKey>(frameNumbers.length);
            for (let j = 0; j < frameNumbers.length; ++j) {
                keys[j] = {
                    frame: frameNumbers[j],
                    value: ikStates[j],
                    interpolation: AnimationKeyInterpolation.STEP
                };
            }
            animation.setKeys(keys);
        }

        return animations;
    }

    /**
     * Create mmd model visibility animation
     * @param rootName root animation name
     * @param mmdAnimationTrack mmd property animation track
     * @returns babylon.js animation
     */
    public createVisibilityAnimation(rootName: string, mmdAnimationTrack: MmdPropertyAnimationTrack): Nullable<Animation> {
        const animation = new Animation(rootName + "_visibility", "visibility", 30, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE);

        const frameNumbers = mmdAnimationTrack.frameNumbers;
        const visibles = mmdAnimationTrack.visibles;

        const keys = new Array<IAnimationKey>(frameNumbers.length);
        for (let i = 0; i < frameNumbers.length; ++i) {
            keys[i] = {
                frame: frameNumbers[i],
                value: visibles[i] - 1,
                interpolation: AnimationKeyInterpolation.STEP
            };
        }
        animation.setKeys(keys);

        if (frameNumbers.length === 0) return null;
        else if (frameNumbers.length === 1 && visibles[0] === 1) return null;

        return animation;
    }
}

/**
 * Samples the bezier curve for every frame for import animation bezier curve parameter
 *
 * This method samples the bezier curve with 30 frames to preserve the shape of the curve as much as possible. However, it will use a lot of memory
 */
// export class MmdModelAnimationGroupSampleBuilder implements IMmdModelAnimationBuilder {

// }


/**
 * Use bezier interpolation for import animation bezier curve parameter
 *
 * This method uses the bezier curve as it is, But since babylon.js doesn't support bazier curves, we inject a bazier curve implementation to make it possible
 *
 * This method is not compatible with the Animation Curve Editor, but it allows you to import animation data completely lossless
 */
// export class MmdModelAnimationGroupBezierBuilder implements IMmdModelAnimationBuilder {

// }
