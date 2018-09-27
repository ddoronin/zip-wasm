"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ZLib {
    constructor(api) {
        this.api = api;
    }
    compress(data) {
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
    decompress(data) {
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
exports.ZLib = ZLib;
//# sourceMappingURL=ZLib.js.map