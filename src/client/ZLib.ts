import { IProcessApi } from './IProcessApi';
import { ICompressor } from './ICompressor';

export class ZLib implements ICompressor {
    constructor(private api: IProcessApi) {
    }

    alloc(data: ArrayBuffer): ArrayBuffer {
        try {
            const data_size = data.byteLength;
            const data_pointer = this.api.alloc(data_size);

            const data_view = new DataView(this.api.memory.buffer, data_pointer, data_size);
            const from = new DataView(data);
            for(let i = 0; i < data_size; i++) {
                data_view.setUint8(i, from.getUint8(i));
            }
            return data_view.buffer;
        }
        finally {
            // TODO: dealloc
        }
    }

    compress(data: ArrayBuffer) {
        try {
            const data_size = data.byteLength;
            const data_pointer = this.api.alloc(data_size);

            const meta_size = 1;
            const meta_pointer = this.api.alloc(meta_size);

            const compressed_pointer = this.api.compress(data_pointer, data_size, meta_pointer);
            const meta_data_view = new DataView(this.api.memory.buffer, meta_pointer, meta_size);

            const compressed_size = meta_data_view.getUint8(0);
            const compressed_data_view = new DataView(this.api.memory.buffer, compressed_pointer, compressed_size);
            return compressed_data_view.buffer;
        }
        finally {
            // TODO: dealloc
        }
    }

    decompress(data: ArrayBuffer) {
        try {
            const data_size = data.byteLength;
            const data_pointer = this.api.alloc(data_size);

            const meta_size = 1;
            const meta_pointer = this.api.alloc(meta_size);

            const decompressed_pointer = this.api.decompress(data_pointer, data_size, meta_pointer);
            const meta_data_view = new DataView(this.api.memory.buffer, meta_pointer, meta_size);
            const decompressed_size = meta_data_view.getUint8(0);

            const decompressed_data_view = new DataView(this.api.memory.buffer, decompressed_pointer, decompressed_size);
            return decompressed_data_view.buffer;
        }
        finally {
            // TODO: dealloc
        }   
    }
}
