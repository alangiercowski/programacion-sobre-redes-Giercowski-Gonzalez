"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerPersonalizados = void 0;
const express_1 = require("express");
const controladorPersonalizadoDB_1 = require("./controladorDB/controladorPersonalizadoDB");
const key_1 = require("../JWT/key");
exports.routerPersonalizados = (0, express_1.Router)();
const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017/Vistas";
const client = new MongoClient(url);
const database = client.db("Vistas");
var personalizadoDB = new controladorPersonalizadoDB_1.controladorPersonalizadoDB(url, database, database.collection("video"));
exports.routerPersonalizados.use("/videos", key_1.verifyToken);
//mostrar videos con cierta cantidad de vistas o más
exports.routerPersonalizados.get("/videos/verVideosXVistas/:cantMinima", (_req, _res) => {
    personalizadoDB.getVideosConXVistas(Number(_req.params.cantMinima)).then((v) => {
        _res.json(v);
    });
});
//mostrar vistas de los videos
exports.routerPersonalizados.get("/videos/verVistasVideos", (_req, _res) => {
    personalizadoDB.verVistasVideos().then((v) => {
        _res.json(v);
    });
});
// mostrar videos de mayor longitud
exports.routerPersonalizados.get("/videos/verVideoMasLargo", (_req, _res) => {
    personalizadoDB.verVideoMasLargo().then((v) => {
        _res.json(v);
    });
});
