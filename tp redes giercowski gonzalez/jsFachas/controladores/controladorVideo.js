"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerVideos = void 0;
const video_1 = require("../video");
const express_1 = require("express");
const controladorVideoDB_1 = require("./controladorDB/controladorVideoDB");
const key_1 = require("../JWT/key");
const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017/Vistas";
const client = new MongoClient(url);
const database = client.db("Vistas");
var videoDB = new controladorVideoDB_1.controladorVideoDB(url, database, database.collection("video"));
exports.routerVideos = (0, express_1.Router)();
exports.routerVideos.use("/videos", key_1.verifyToken);
exports.routerVideos.get("/videos", (_req, _res) => {
    videoDB.getVideos().then((v) => {
        _res.json(v);
    });
});
//subir video
exports.routerVideos.post("/videos", (_req, _res) => {
    let videoASubir = new video_1.video(Number(_req.body.id), _req.body.titulo, Number(_req.body.duracion), _req.body.miniatura, _req.body.vistas, _req.body.usuario);
    videoDB.subirVideo(videoASubir).then((v) => {
        _res.json(v);
    });
});
// eliminar video
exports.routerVideos.delete("/videos/:id", (_req, _res) => {
    videoDB.quitarVideo(Number(_req.params.id)).then((v) => {
        _res.json(v);
    });
});
//modificar video
exports.routerVideos.put("/videos/:id", (_req, _res) => {
    const videoAModificar = new video_1.video(Number(_req.params.id), _req.body.titulo, Number(_req.body.duracion), _req.body.miniatura, _req.body.listaVistas, _req.body.usuario);
    videoDB.modificarVideo(videoAModificar).then((v) => {
        _res.json(v);
    });
});
