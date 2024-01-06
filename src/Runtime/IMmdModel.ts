import type { IIkStateContainer } from "./IIkStateContainer";
import type { IMmdRuntimeBone } from "./IMmdRuntimeBone";
import type { IMmdLinkedBoneContainer } from "./IMmdRuntimeLinkedBone";
import type { RuntimeMmdMesh } from "./mmdMesh";
import type { MmdMorphControllerBase } from "./mmdMorphControllerBase";

/**
 * IMmdModel is a model that can bind animation.
 */
export interface IMmdModel extends IIkStateContainer {
    /**
     * The root mesh of this model
     */
    readonly mesh: RuntimeMmdMesh;

    /**
     * The skeleton of this model
     *
     * This can be a instance of `Skeleton`, or if you are using a humanoid model, it will be referencing a virtualized bone tree
     *
     * So MmdModel.metadata.skeleton is not always equal to MmdModel.skeleton
     */
    readonly skeleton: IMmdLinkedBoneContainer;

    /**
     * The array of final transform matrices of bones (ie. the matrix sent to shaders)
     */
    readonly worldTransformMatrices: Float32Array;

    /**
     * Uint8Array that stores the state of IK solvers
     *
     * If `ikSolverState[MmdModel.runtimeBones[i].ikSolverIndex]` is 0, IK solver of `MmdModel.runtimeBones[i]` is disabled and vice versa
     */
    readonly ikSolverStates: Uint8Array;

    /**
     * Runtime bones of this model
     *
     * You can get the final transform matrix of a bone by `MmdModel.runtimeBones[i].getFinalMatrixToRef()`
     */
    readonly runtimeBones: readonly IMmdRuntimeBone[];

    /**
     * The morph controller of this model
     *
     * The `MmdMorphControllerBase` not only wrapper of `MorphTargetManager` but also controls the CPU bound morphs (bone, material, group)
     */
    readonly morph: MmdMorphControllerBase;
}
