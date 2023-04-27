import { usuario } from "../usuario";
import { controladorUsuarioDB } from "./controladorDB/controladorUsuarioDB";
import { MongoClient } from "mongodb";
import { Router } from "express";
const { createHash } = require('crypto');

const url = "mongodb://localhost:27017/Vistas";
const client = new MongoClient(url)
const database = client.db("Vistas");

var usuarioDB: controladorUsuarioDB = new controladorUsuarioDB(url, database, database.collection("usuario"))

export const routerUsuario = Router()


function hash(string: string) {
    return createHash('sha256').update(string).digest('hex');
  }
  
routerUsuario.post("/usuarios", async (_req, _res)=>{
    let usuarioAsubir: usuario = new usuario(_req.body.id,_req.body.mail,_req.body.nombreUsuario,await hash(String(_req.body.contraseña)));
    usuarioDB.subirUsuario(usuarioAsubir).then((u)=>{
        _res.send(204)
    })
})
