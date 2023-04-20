import { vista } from "../vista";
import { video } from "../video";
import { Router } from "express";
import { videos } from "..";
import { controladorPersonalizadoDB } from "./controladorDB/controladorPersonalizadoDB";

export const routerPersonalizados = Router()

const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017/Vistas";
const client = new MongoClient(url)
const database = client.db("Vistas");

var personalizadoDB: controladorPersonalizadoDB = new controladorPersonalizadoDB(url, database, database.collection("video"))

//mostrar videos con cierta cantidad de vistas o más
routerPersonalizados.get("/videos/verVideosXVistas/:cantMinima", (_req,_res) => {
    personalizadoDB.getVideosConXVistas(Number(_req.params.cantMinima)).then((v)=>{
      _res.json(v);
    })
  
})

//mostrar vistas de los videos
routerPersonalizados.get("/videos/verVistasVideos", (_req, _res) => {
  personalizadoDB.verVistasVideos().then((v)=>{
    _res.json(v);
  })
})

// mostrar videos de mayor longitud
routerPersonalizados.get("/videos/verVideoMasLargo", (_req, _res) => {
  personalizadoDB.verVideoMasLargo().then((v)=>{
    _res.json(v);
  })
})