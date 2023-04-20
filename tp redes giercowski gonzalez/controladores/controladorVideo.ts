import { video } from "../video";
import { Router } from "express";
import { videos } from "..";
import { vista } from "../vista";
import { controladorVideoDB } from "./controladorDB/controladorVideoDB";


const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017/Vistas";
const client = new MongoClient(url)
const database = client.db("Vistas");

var videoDB: controladorVideoDB = new controladorVideoDB(url, database, database.collection("video"))

export const routerVideos = Router()

routerVideos.get("/videos", (_req,_res) => {
      videoDB.getVideos().then((v)=>{
        _res.json(v);
      })
    
})


//subir video
routerVideos.post("/videos", (_req, _res)=>{ 
    let videoASubir: video = new video(Number(_req.body.id), _req.body.titulo, Number(_req.body.duracion), _req.body.miniatura, _req.body.vistas, _req.body.usuario)
    videoDB.subirVideo(videoASubir).then((v)=>{
      _res.json(v);
    })
})

// eliminar video
routerVideos.delete("/videos/:id", (_req,_res) => {
    videoDB.quitarVideo(Number(_req.params.id)).then((v)=>{
      _res.json(v);
    })
})

//modificar video
routerVideos.put("/videos/:id", (_req, _res) =>{
    const videoAModificar = new video(Number(_req.params.id), _req.body.titulo, Number(_req.body.duracion), _req.body.miniatura, _req.body.listaVistas, _req.body.usuario)
    videoDB.modificarVideo(videoAModificar).then((v)=>{
      _res.json(v);
    })
    })