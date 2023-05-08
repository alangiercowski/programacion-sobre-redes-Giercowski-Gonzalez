import { usuario } from "../usuario";
import { controladorUsuarioDB } from "./controladorDB/controladorUsuarioDB";
import { MongoClient } from "mongodb";
import { Router } from "express";
const { createHash } = require("crypto");
const jwt = require("jsonwebtoken");
import { SECRET_KEY, verifyToken } from "../JWT/key";
const claveSecureta = SECRET_KEY;

const url = "mongodb://localhost:27017/Vistas";
const client = new MongoClient(url);
const database = client.db("Vistas");

var usuarioDB: controladorUsuarioDB = new controladorUsuarioDB(
  url,
  database,
  database.collection("usuario")
);

export const routerUsuario = Router();

function hash(string: string) {
  return createHash("sha256").update(string).digest("hex");
}


routerUsuario.post("/usuarios", async (_req, _res) => {
  let usuarioAsubir: usuario = new usuario(
    _req.body.id,
    _req.body.mail,
    _req.body.nombreUsuario,
    await hash(String(_req.body.contraseña))
  );
  usuarioDB.subirUsuario(usuarioAsubir).then((u) => {
    _res.send(204);
  });
});

routerUsuario.post("/usuarios/login", async (_req, _res) => {
  if (await usuarioDB.login(_req.body.nombreUsuario, _req.body.contraseña)) {
    let data = {
      nombre: _req.body.nombreUsuario,
    };
    let tokenJWT = jwt.sign(data, claveSecureta, { expiresIn: "2h" });
    _res.send(tokenJWT);
  } else {
    _res.send("usuario no encontrado");
  }
});
