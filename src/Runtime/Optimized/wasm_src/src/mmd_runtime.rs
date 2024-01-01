use wasm_bindgen::prelude::*;
use web_sys::js_sys::{Uint8Array, Float32Array};

use crate::{mmd_model::MmdModel, mmd_model_metadata::MetadataBuffer};

#[wasm_bindgen]
pub struct MmdRuntime {
    #[allow(clippy::vec_box)]
    mmd_models: Vec<Box<MmdModel>>,
}

#[wasm_bindgen]
impl MmdRuntime {
    pub fn new() -> Self {
        MmdRuntime {
            mmd_models: Vec::new(),
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

    #[wasm_bindgen(js_name = "bufferToUint8Array")]
    pub fn buffer_to_uint8_array(&self, ptr: *mut u8, size: usize) -> Uint8Array {
        let slice = unsafe {
            std::slice::from_raw_parts_mut(ptr, size)
        };
        unsafe {
            Uint8Array::view(slice)
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
    pub fn get_animation_bone_arena(&mut self, ptr: *mut usize) -> Float32Array {
        let ptr = ptr as *mut MmdModel;
        let animation_arena = unsafe {
            &mut *ptr
        }.animation_arena();
        unsafe {
            animation_arena.bone_arena_typed_array()
        }
    }

    #[wasm_bindgen(js_name = "getAnimationIkSolverStateArena")]
    pub fn get_animation_iksolver_state_arena(&mut self, ptr: *mut usize) -> Uint8Array {
        let ptr = ptr as *mut MmdModel;
        let animation_arena = unsafe {
            &mut *ptr
        }.animation_arena();
        unsafe {
            animation_arena.iksolver_state_arena_typed_array()
        }
    }

    #[wasm_bindgen(js_name = "getAnimationMorphArena")]
    pub fn get_animation_morph_arena(&mut self, ptr: *mut usize) -> Float32Array {
        let ptr = ptr as *mut MmdModel;
        let animation_arena = unsafe {
            &mut *ptr
        }.animation_arena();
        unsafe {
            animation_arena.morph_arena_typed_array()
        }
    }
    
    #[wasm_bindgen(js_name = "getBoneWorldMatrixArena")]
    pub fn get_bone_world_matrix_arena(&mut self, ptr: *mut usize) -> Float32Array {
        let ptr = ptr as *mut MmdModel;
        let bone_arena = unsafe {
            &mut *ptr
        }.bone_arena();
        unsafe {
            bone_arena.world_matrix_arena_typed_array()
        }
    }

    #[wasm_bindgen(js_name = "beforePhysics")]
    pub fn before_physics(&mut self) {
        for mmd_model in &mut self.mmd_models {
            mmd_model.before_physics();
        }
    }

    #[wasm_bindgen(js_name = "afterPhysics")]
    pub fn after_physics(&mut self) {
        for mmd_model in &mut self.mmd_models {
            mmd_model.after_physics();
        }
    }
}

impl Default for MmdRuntime {
    fn default() -> Self {
        Self::new()
    }
}
