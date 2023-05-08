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
exports.routerUsuario = void 0;
const usuario_1 = require("../usuario");
const controladorUsuarioDB_1 = require("./controladorDB/controladorUsuarioDB");
const mongodb_1 = require("mongodb");
const express_1 = require("express");
const { createHash } = require("crypto");
const jwt = require("jsonwebtoken");
const key_1 = require("../JWT/key");
const claveSecureta = key_1.SECRET_KEY;
const url = "mongodb://localhost:27017/Vistas";
const client = new mongodb_1.MongoClient(url);
const database = client.db("Vistas");
var usuarioDB = new controladorUsuarioDB_1.controladorUsuarioDB(url, database, database.collection("usuario"));
exports.routerUsuario = (0, express_1.Router)();
function hash(string) {
    return createHash("sha256").update(string).digest("hex");
}
exports.routerUsuario.post("/usuarios", (_req, _res) => __awaiter(void 0, void 0, void 0, function* () {
    let usuarioAsubir = new usuario_1.usuario(_req.body.id, _req.body.mail, _req.body.nombreUsuario, yield hash(String(_req.body.contraseña)));
    usuarioDB.subirUsuario(usuarioAsubir).then((u) => {
        _res.send(204);
    });
}));
exports.routerUsuario.post("/usuarios/login", (_req, _res) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield usuarioDB.login(_req.body.nombreUsuario, _req.body.contraseña)) {
        let data = {
            nombre: _req.body.nombreUsuario,
        };
        let tokenJWT = jwt.sign(data, claveSecureta, { expiresIn: "2h" });
        _res.send(tokenJWT);
    }
    else {
        _res.send("usuario no encontrado");
    }
}));
