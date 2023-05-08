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
exports.controladorPersonalizadoDB = void 0;
const video_1 = require("../../video");
class controladorPersonalizadoDB {
    constructor(url, database, collection) {
        this.url = url;
        this.database = database;
        this.collection = collection;
    }
    getVideosConXVistas(cantMinima) {
        return __awaiter(this, void 0, void 0, function* () {
            var listaDeVideos = new Array;
            yield this.collection.find().forEach(function (document) {
                console.log(document.listaVistas.length);
                if (document.listaVistas.length >= cantMinima) {
                    let videoAux = new video_1.video(Number(document.id), document.titulo, Number(document.duracion), document.miniatura, document.listaVistas, document.usuario);
                    listaDeVideos.push(videoAux);
                }
            });
            return listaDeVideos;
        });
    }
    verVistasVideos() {
        return __awaiter(this, void 0, void 0, function* () {
            class vistasDeVideos {
                constructor(tit, cant) {
                    this.titulo = tit;
                    this.cantidadVisitas = cant;
                }
            }
            let listaItems = new Array;
            yield this.collection.find().forEach(function (document) {
                let itemLista = new vistasDeVideos(document.titulo, document.listaVistas.length);
                listaItems.push(itemLista);
            });
            return listaItems;
        });
    }
    verVideoMasLargo() {
        return __awaiter(this, void 0, void 0, function* () {
            let masLargo = new video_1.video(-1, "", 0, "", [], "");
            let listaMasLargos = new Array;
            yield this.collection.find().forEach(function (document) {
                if (document.duracion > masLargo.duracion) {
                    listaMasLargos = [];
                    listaMasLargos.push(new video_1.video(Number(document.id), document.titulo, Number(document.duracion), document.miniatura, document.listaVistas, document.usuario));
                    masLargo = listaMasLargos[0];
                }
                else if (document.duracion == masLargo.duracion) {
                    listaMasLargos.push(new video_1.video(Number(document.id), document.titulo, Number(document.duracion), document.miniatura, document.listaVistas, document.usuario));
                }
            });
            return listaMasLargos;
        });
    }
}
exports.controladorPersonalizadoDB = controladorPersonalizadoDB;
