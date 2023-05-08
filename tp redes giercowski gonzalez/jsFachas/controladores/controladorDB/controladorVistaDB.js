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
exports.controladorVistaDB = void 0;
const vista_1 = require("../../vista");
class controladorVistaDB {
    constructor(url, database, collection) {
        this.url = url;
        this.database = database;
        this.collection = collection;
    }
    subirVista(vistaASubir) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = JSON.parse('{"$push":{"listaVistas":' + JSON.stringify(vistaASubir) + '}}');
            this.collection.findOneAndUpdate({ id: vistaASubir.idVideo }, query);
        });
    }
    quitarVista(idAborrar) {
        return __awaiter(this, void 0, void 0, function* () {
            let vistaABorrar = new vista_1.vista(-1, -1, -1, "", "");
            yield this.collection.find().forEach((document) => {
                for (let i = 0; i < document.listaVistas.length; i++) {
                    if (document.listaVistas[i].idVista == idAborrar) {
                        vistaABorrar = document.listaVistas[i];
                        console.log(vistaABorrar);
                    }
                    const query = JSON.parse('{"$pull":{"listaVistas": {"idVista": ' + JSON.stringify(idAborrar) + '}}}');
                    this.collection.findOneAndUpdate({ id: vistaABorrar.idVideo }, query);
                }
            });
        });
    }
    modificarVista(vistaModificada) {
        return __awaiter(this, void 0, void 0, function* () {
            let idVideoOriginal = -1;
            yield this.collection.find().forEach((document) => {
                for (let i = 0; i < document.listaVistas.length; i++) {
                    if (document.listaVistas[i].idVista == vistaModificada.idVista) {
                        idVideoOriginal = document.listaVistas[i].idVideo;
                    }
                }
                if (idVideoOriginal == vistaModificada.idVideo) {
                    const query = JSON.parse('{"$set":{"listaVistas": ' + JSON.stringify([vistaModificada]) + '}}');
                    this.collection.findOneAndUpdate({ id: vistaModificada.idVideo }, query);
                }
                else if (idVideoOriginal != vistaModificada.idVideo && idVideoOriginal != -1) {
                    const queryQuitar = JSON.parse('{"$pull":{"listaVistas": {"idVista": ' + JSON.stringify(vistaModificada.idVista) + '}}}');
                    this.collection.findOneAndUpdate({ id: idVideoOriginal }, queryQuitar);
                    const query = JSON.parse('{"$push":{"listaVistas":' + JSON.stringify(vistaModificada) + '}}');
                    this.collection.findOneAndUpdate({ id: vistaModificada.idVideo }, query);
                }
            });
        });
    }
}
exports.controladorVistaDB = controladorVistaDB;
