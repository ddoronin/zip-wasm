export interface IProcessApi {
    // Memory Management
    alloc: (byteSize: number) => number;
    dealloc: (offset: number, byteSize: number) => void;

    // zlib
    compress: (pointer: number, byteSize: number, meta: number) => number;
    decompress: (pointer: number, byteSize: number, meta: number) => number;

    memory: any;
}
