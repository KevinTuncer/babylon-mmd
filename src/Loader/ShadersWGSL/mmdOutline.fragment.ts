import "@babylonjs/core/ShadersWGSL/ShadersInclude/clipPlaneFragmentDeclaration";
import "@babylonjs/core/ShadersWGSL/ShadersInclude/logDepthDeclaration";
import "@babylonjs/core/ShadersWGSL/ShadersInclude/clipPlaneFragment";
import "@babylonjs/core/ShadersWGSL/ShadersInclude/logDepthFragment";

import { ShaderStore } from "@babylonjs/core/Engines/shaderStore";

const name = "mmdOutlinePixelShader";
const shader = /* wgsl */`
uniform color: vec4f;

#ifdef ALPHATEST
varying vUV: vec2;
var diffuseSamplerSampler: sampler;
var diffuseSampler: texture_2d<f32>;
#endif
#include<clipPlaneFragmentDeclaration>
#include<logDepthDeclaration>


#define CUSTOM_FRAGMENT_DEFINITIONS

@fragment
fn main(input: FragmentInputs) -> FragmentOutputs {

#define CUSTOM_FRAGMENT_MAIN_BEGIN

#include<clipPlaneFragment>

#ifdef ALPHATEST
	if (textureSample(diffuseSampler, diffuseSamplerSampler, vUV).a < 0.4) {
		discard;
    }
#endif
#include<logDepthFragment>
    fragmentOutputs.color = uniforms.color;

#define CUSTOM_FRAGMENT_MAIN_END
}
`;
// Sideeffect
ShaderStore.ShadersStoreWGSL[name] = shader;
/** @internal */
export const mmdOutlinePixelShader = { name, shader };
