import { IProcessApi } from './IProcessApi';
import { ICompressor } from './ICompressor';
import { ZLib } from './ZLib';

export async function download(url: string) {
    const wasm = await fetch(url);
    return await wasm.arrayBuffer();
}

export async function run(bytes: ArrayBuffer) {
    const {instance} = await WebAssembly.instantiate(bytes, {});
    return instance.exports as IProcessApi;
}

export async function startup(url: string): Promise<ICompressor> {
    const assembly = await download(url);
    const api = await run(assembly);
    return new ZLib(api);
}
