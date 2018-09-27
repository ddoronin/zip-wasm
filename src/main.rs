extern crate libflate;

use std::io::Read;
use std::io::Write;
use std::mem;
use std::slice;
use std::os::raw::c_void;
use libflate::zlib::{Encoder, Decoder};

fn main() {}

#[no_mangle]
pub extern "C" fn alloc(size: usize) -> *mut c_void {
    let mut buf = Vec::with_capacity(size);
    let ptr = buf.as_mut_ptr();
    mem::forget(buf);
    return ptr as *mut c_void;
}

#[no_mangle]
pub extern "C" fn dealloc(ptr: *mut c_void, cap: usize) {
    unsafe  {
        let _buf = Vec::from_raw_parts(ptr, 0, cap);
    }
}

#[no_mangle]
pub extern "C" fn compress(pointer: *mut u8, byte_size: usize, meta: *mut usize) -> *mut c_void {
    let data = unsafe { slice::from_raw_parts_mut(pointer, byte_size) };
    let meta_data = unsafe { slice::from_raw_parts_mut(meta, 1) };

    let mut encoder = Encoder::new(Vec::new()).unwrap();
    encoder.write_all(&data).unwrap();
    let mut res = encoder.finish().into_result().unwrap();

    meta_data[0] = res.len();
    let ptr = res.as_mut_ptr();
    mem::forget(res);
    ptr as *mut c_void
}

#[no_mangle]
pub extern "C" fn decompress(pointer: *mut u8, byte_size: usize, meta: *mut usize) -> *mut c_void {
    let encoded_data = unsafe { slice::from_raw_parts_mut(pointer, byte_size) };
    let meta_data = unsafe { slice::from_raw_parts_mut(meta, 1) };

    let mut buf = Vec::new();
    Decoder::new(&encoded_data[..])
        .unwrap()
        .read_to_end(&mut buf)
        .unwrap();

    meta_data[0] = buf.len();
    let ptr = buf.as_mut_ptr();
    mem::forget(buf);
    ptr as *mut c_void
}
