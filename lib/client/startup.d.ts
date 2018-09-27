import { IProcessApi } from './IProcessApi';
import { ICompressor } from './ICompressor';
export declare function download(url: string): Promise<ArrayBuffer>;
export declare function run(bytes: ArrayBuffer): Promise<IProcessApi>;
export declare function startup(url: string): Promise<ICompressor>;
