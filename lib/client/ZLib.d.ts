import { IProcessApi } from './IProcessApi';
import { ICompressor } from './ICompressor';
export declare class ZLib implements ICompressor {
    private api;
    constructor(api: IProcessApi);
    compress(data: ArrayBuffer): ArrayBuffer;
    decompress(data: ArrayBuffer): ArrayBuffer;
}
