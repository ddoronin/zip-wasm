export interface ICompressor {
    alloc(data: ArrayBuffer): ArrayBuffer;
    compress(data: ArrayBuffer): ArrayBuffer;
    decompress(data: ArrayBuffer): ArrayBuffer;
}
