export interface IProcessApi {
    alloc: (byteSize: number) => number;
    dealloc: (offset: number, byteSize: number) => void;
    compress: (pointer: number, byteSize: number, meta: number) => number;
    decompress: (pointer: number, byteSize: number, meta: number) => number;
    memory: any;
}
