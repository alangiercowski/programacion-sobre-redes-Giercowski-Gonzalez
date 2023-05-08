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
exports.controladorVideoDB = void 0;
const video_1 = require("../../video");
const vista_1 = require("../../vista");
class controladorVideoDB {
    constructor(url, database, collection) {
        this.url = url;
        this.database = database;
        this.collection = collection;
    }
    getVideos() {
        return __awaiter(this, void 0, void 0, function* () {
            var listaDeVideos = new Array;
            yield this.collection.find().forEach(function (document) {
                var listaDeVistas = new Array;
                for (let i = 0; i < document.listaVistas.length; i++) {
                    let vistaRePuta = new vista_1.vista(Number(document.listaVistas[i].idVista), Number(document.listaVistas[i].idVideo), Number(document.listaVistas[i].duracion), document.listaVistas[i].ubicacion, document.listaVistas[i].fecha);
                    listaDeVistas.push(vistaRePuta);
                }
                let videoAux = new video_1.video(Number(document.id), document.titulo, Number(document.duracion), document.miniatura, listaDeVistas, document.usuario);
                listaDeVideos.push(videoAux);
            });
            return listaDeVideos;
        });
    }
    subirVideo(videoASubir) {
        return __awaiter(this, void 0, void 0, function* () {
            const document = {
                id: videoASubir.id,
                titulo: videoASubir.titulo,
                duracion: videoASubir.duracion,
                miniatura: videoASubir.miniatura,
                listaVistas: videoASubir.listaVistas,
                usuario: videoASubir.usuario
            };
            const result = yield this.collection.insertOne(document);
            console.log(`A document was inserted with the _id: ${result.insertedId}`);
        });
    }
    quitarVideo(idAborrar) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.collection.find().forEach(() => {
                const query = { id: idAborrar };
                this.collection.findOneAndDelete(query);
            });
        });
    }
    modificarVideo(videoASubir) {
        return __awaiter(this, void 0, void 0, function* () {
            const document = {
                id: videoASubir.id,
                titulo: videoASubir.titulo,
                duracion: videoASubir.duracion,
                miniatura: videoASubir.miniatura,
                listaVistas: videoASubir.listaVistas,
                usuario: videoASubir.usuario
            };
            const result = yield this.collection.find().forEach(() => {
                this.collection.findOneAndReplace({ "id": videoASubir.id }, document);
            });
        });
    }
}
exports.controladorVideoDB = controladorVideoDB;
