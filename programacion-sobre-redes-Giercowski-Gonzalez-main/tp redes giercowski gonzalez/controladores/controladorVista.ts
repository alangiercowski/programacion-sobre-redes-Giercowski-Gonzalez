import { vista } from "../vista";
import { Router } from "express";
import { videos } from "..";
import { video } from "../video";

export const routerVistas = Router()

const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017/Vistas";
const client = new MongoClient(url)

async function subirVista(vistaASubir: vista) {
  try {
    const database = client.db("Vistas");
    const videos = database.collection("video");
    //var videoAux: video = new video(-1, "", 0, "", [], "")
    
    /*await videos.find().forEach(function(document: any){
      if(vistaASubir.idVideo == document.id){
        videoAux = new video(document.idVista, document.titulo, document.duracion, document.minitura, document.listaVistas, document.usuario)
        videoAux.listaVistas.push(vistaASubir)
      }
    })
    const documentVideo = {
      id: videoAux.id,
      titulo: videoAux.titulo,
      duracion: videoAux.duracion,
      miniatura: videoAux.miniatura,
      listaVistas: videoAux.listaVistas,
      usuario: videoAux.usuario
    }*/console.log("sellego2")
    const query = JSON.parse('{"$push":{"listaVistas":' + JSON.stringify(vistaASubir) +'}}')
    console.log("sellego")
    videos.findOneAndReplace({id: vistaASubir.idVideo}, query);
    
    }
    finally {
  }
}

//añadir vista
routerVistas.post("/vistas", (_req, _res)=>{ 
  let vistaASubir = new vista(Number(_req.body.id), Number(_req.body.idVideo), Number(_req.body.duracion), _req.body.ubicacion, _req.body.fecha);
  subirVista(vistaASubir).then((v)=>{
      _res.json(v);
    })
})



//quitar vista

routerVistas.delete("/vistas/:idVista", (_req,_res) => {
  for(let i = 0; i < videos.length; i++){
    for(let j = 0; j < videos[i].listaVistas.length; j++){
      if(videos[i].listaVistas[j].idVista == Number(_req.params.idVista)){
        videos[i].listaVistas.splice(j, 1)
      }
    }
  }
  _res.status(204).send()
})

//modificar vista 
routerVistas.put("/vistas/:id", (_req, _res) =>{
  let vistaACambiar = new vista(Number(_req.params.id), Number(_req.body.idVideo), Number(_req.body.duracion), _req.body.ubicacion, _req.body.fecha)  
  for(let i = 0; i < videos.length; i++){
      for(let j = 0; j<videos[i].listaVistas.length; j++){
        if (videos[i].listaVistas[j].idVista == Number(_req.params.id)){
          videos[i].listaVistas[j] = vistaACambiar
        }
      }
    }
    _res.json(vistaACambiar)
  })