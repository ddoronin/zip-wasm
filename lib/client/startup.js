"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ZLib_1 = require("./ZLib");
function download(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const wasm = yield fetch(url);
        return yield wasm.arrayBuffer();
    });
}
exports.download = download;
function run(bytes) {
    return __awaiter(this, void 0, void 0, function* () {
        const { instance } = yield WebAssembly.instantiate(bytes, {});
        return instance.exports;
    });
}
exports.run = run;
function startup(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const assembly = yield download(url);
        const api = yield run(assembly);
        return new ZLib_1.ZLib(api);
    });
}
exports.startup = startup;
//# sourceMappingURL=startup.js.map