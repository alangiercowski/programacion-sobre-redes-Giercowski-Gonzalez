import { video } from "../video";
import { Router } from "express";
import { videos } from "..";
import { vista } from "../vista";

const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017/Vistas";
const client = new MongoClient(url)


export async function getVideos(){
  var listaDeVideos: Array<video> = new Array
  try {
    const database = client.db('Vistas');
    const videos = database.collection('video');
    await videos.find().forEach(function(document: any){
      var listaDeVistas: Array<vista> = new Array
      for(let i=0; i<document.listaVistas.length; i++){
        let vistaRePuta = new vista(Number(document.listaVistas[i].idVista), Number(document.listaVistas[i].idVideo), Number(document.listaVistas[i].duracion), document.listaVistas[i].ubicacion, document.listaVistas[i].fecha)
        listaDeVistas.push(vistaRePuta)
      }
      let videoAux: video = new video(Number(document.id), document.titulo, Number(document.duracion), document.miniatura, listaDeVistas, document.usuario)
      listaDeVideos.push(videoAux)
    })
    return listaDeVideos
  } finally {
  }

}

export const routerVideos = Router()

routerVideos.get("/videos", (_req,_res) => {
      getVideos().then((v)=>{
        _res.json(v);
      })
    
})



// subir video
async function subirVideo(videoASubir: video) {
  try {
    const database = client.db("Vistas");
    const videos = database.collection("video");
    const document = {
      id: videoASubir.id,
      titulo: videoASubir.titulo,
      duracion: videoASubir.duracion,
      miniatura: videoASubir.miniatura,
      listaVistas: videoASubir.listaVistas,
      usuario: videoASubir.usuario
    }
    const result = await videos.insertOne(document);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } finally {
  }
}
routerVideos.post("/videos", (_req, _res)=>{ 
    let videoASubir: video = new video(Number(_req.body.id), _req.body.titulo, Number(_req.body.duracion), _req.body.miniatura, _req.body.vistas, _req.body.usuario)
    subirVideo(videoASubir).then((v)=>{
      _res.json(v);
    })
})

// eliminar video
export async function quitarVideo(idAborrar: Number){
  try {
    const database = client.db('Vistas');
    const videos = database.collection('video');
    await videos.find().forEach(function(){
      const query = { id: idAborrar };
      videos.findOneAndDelete(query);
    })

  } finally {
  }

}

routerVideos.delete("/videos/:id", (_req,_res) => {
    quitarVideo(Number(_req.params.id)).then((v)=>{
      _res.json(v);
    })
})

//modificar video
async function modificarVideo(videoASubir: video) {
  try {
    const database = client.db("Vistas");
    const videos = database.collection("video");
    const document = {
      id: videoASubir.id,
      titulo: videoASubir.titulo,
      duracion: videoASubir.duracion,
      miniatura: videoASubir.miniatura,
      listaVistas: videoASubir.listaVistas,
      usuario: videoASubir.usuario
    }
 
    const result = await videos.find().forEach(function(){
      
      videos.findOneAndReplace({"id": videoASubir.id}, document);
    })
  } finally {

  }
}

routerVideos.put("/videos/:id", (_req, _res) =>{
    const videoAModificar = new video(Number(_req.params.id), _req.body.titulo, Number(_req.body.duracion), _req.body.miniatura, _req.body.listaVistas, _req.body.usuario)
    modificarVideo(videoAModificar).then((v)=>{
      _res.json(v);
    })
    })