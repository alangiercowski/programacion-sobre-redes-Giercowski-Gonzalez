"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerVistas = void 0;
const vista_1 = require("../vista");
const express_1 = require("express");
const controladorVistaDB_1 = require("./controladorDB/controladorVistaDB");
const key_1 = require("../JWT/key");
exports.routerVistas = (0, express_1.Router)();
const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017/Vistas";
const client = new MongoClient(url);
const database = client.db("Vistas");
var vistaDB = new controladorVistaDB_1.controladorVistaDB(url, database, database.collection("vista"));
exports.routerVistas.use("/vistas", key_1.verifyToken);
//añadir vista
exports.routerVistas.post("/vistas", (_req, _res) => {
    let vistaASubir = new vista_1.vista(Number(_req.body.idVista), Number(_req.body.idVideo), Number(_req.body.duracion), _req.body.ubicacion, _req.body.fecha);
    vistaDB.subirVista(vistaASubir).then((v) => {
        _res.json(v);
    });
});
//quitar vista
exports.routerVistas.delete("/vistas/:idVista", (_req, _res) => {
    vistaDB.quitarVista(Number(_req.params.idVista)).then((v) => {
        _res.json(v);
    });
});
//modificar vista
exports.routerVistas.put("/vistas/:id", (_req, _res) => {
    let vistaACambiar = new vista_1.vista(Number(_req.params.id), Number(_req.body.idVideo), Number(_req.body.duracion), _req.body.ubicacion, _req.body.fecha);
    vistaDB.modificarVista(vistaACambiar).then((v) => {
        _res.json(vistaACambiar);
    });
});
