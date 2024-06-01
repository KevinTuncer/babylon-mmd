mod animation;
mod animation_arena;
mod append_transform_solver;
mod ik_chain_info;
mod ik_solver;
mod mmd_model_metadata;
mod mmd_model;
mod mmd_morph_controller;
mod mmd_runtime_bone;
mod mmd_runtime;
mod unchecked_slice;

use wasm_bindgen::prelude::*;

#[cfg(feature = "parallel")]
pub use wasm_bindgen_rayon::init_thread_pool;

#[wasm_bindgen(js_name = init)]
pub fn init() {
    #[cfg(debug_assertions)]
    console_error_panic_hook::set_once();
}

#[wasm_bindgen(js_name = createMmdRuntime)]
pub fn create_mmd_runtime() -> mmd_runtime::MmdRuntime {
    mmd_runtime::MmdRuntime::new()
}

#[wasm_bindgen(js_name = createAnimationPool)]
pub fn create_animation_pool() -> animation::animation_pool::AnimationPool {
    animation::animation_pool::AnimationPool::new()
}
