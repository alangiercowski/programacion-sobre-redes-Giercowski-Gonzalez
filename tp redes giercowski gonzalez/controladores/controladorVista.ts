import { vista } from "../vista";
import { Router } from "express";
import { videos } from "..";
import { video } from "../video";
import { controladorVistaDB } from "./controladorDB/controladorVistaDB";
import { verifyToken } from "../JWT/key";

export const routerVistas = Router()

const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017/Vistas";
const client = new MongoClient(url)
const database = client.db("Vistas");

var vistaDB: controladorVistaDB = new controladorVistaDB(url, database, database.collection("vista"))

routerVistas.use("/vistas", verifyToken)

//añadir vista
routerVistas.post("/vistas", (_req, _res)=>{ 
  let vistaASubir = new vista(Number(_req.body.idVista), Number(_req.body.idVideo), Number(_req.body.duracion), _req.body.ubicacion, _req.body.fecha);
  vistaDB.subirVista(vistaASubir).then((v)=>{
      _res.json(v);
    })
})

//quitar vista
routerVistas.delete("/vistas/:idVista", (_req,_res) => {
    vistaDB.quitarVista(Number(_req.params.idVista)).then((v)=>{
      _res.json(v);
    })
})

//modificar vista
routerVistas.put("/vistas/:id", (_req, _res) =>{
  let vistaACambiar = new vista(Number(_req.params.id), Number(_req.body.idVideo), Number(_req.body.duracion), _req.body.ubicacion, _req.body.fecha)  
  vistaDB.modificarVista(vistaACambiar).then((v)=>{
    _res.json(vistaACambiar)
  })
})
