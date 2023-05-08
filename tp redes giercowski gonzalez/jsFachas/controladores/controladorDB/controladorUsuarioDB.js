"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controladorUsuarioDB = void 0;
const { createHash } = require('crypto');
class controladorUsuarioDB {
    constructor(url, database, collection) {
        this.url = url;
        this.database = database;
        this.collection = collection;
    }
    subirUsuario(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            this.collection.insertOne(JSON.parse(JSON.stringify(usuario)));
        });
    }
    login(usuario, contraseña) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarioTemp = yield this.collection.findOne({ nombreUsuario: usuario, contraseña: hash(contraseña) });
            if ((usuarioTemp === null || usuarioTemp === void 0 ? void 0 : usuarioTemp.contraseña) == hash(contraseña)) {
                return true;
            }
        });
    }
}
exports.controladorUsuarioDB = controladorUsuarioDB;
function hash(string) {
    return createHash('sha256').update(string).digest('hex');
}
