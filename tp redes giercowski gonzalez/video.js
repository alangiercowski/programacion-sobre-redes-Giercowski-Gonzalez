"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.video = void 0;
var video = /** @class */ (function () {
    function video(id, titulo, duracion, miniatura, listaVista, usuario) {
        this.id = id;
        this.duracion = duracion;
        this.miniatura = miniatura;
        this.titulo = titulo;
        this.listaVistas = listaVista;
        this.usuario = usuario;
    }
    video.prototype.getTitulo = function () {
        return this.titulo;
    };
    video.prototype.setTitulo = function (tituloNuevo) {
        this.titulo = tituloNuevo;
    };
    return video;
}());
exports.video = video;
