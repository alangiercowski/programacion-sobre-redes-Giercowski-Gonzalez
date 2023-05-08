"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.video = void 0;
class video {
    constructor(id, titulo, duracion, miniatura, listaVista, usuario) {
        this.id = id;
        this.duracion = duracion;
        this.miniatura = miniatura;
        this.titulo = titulo;
        this.listaVistas = listaVista;
        this.usuario = usuario;
    }
    getTitulo() {
        return this.titulo;
    }
    setTitulo(tituloNuevo) {
        this.titulo = tituloNuevo;
    }
}
exports.video = video;
