export interface ICompressor {
    compress(data: ArrayBuffer): ArrayBuffer;
    decompress(data: ArrayBuffer): ArrayBuffer;
}
