import { vista } from "../vista";
import { Router } from "express";
import { videos } from "..";
import { video } from "../video";

export const routerVistas = Router()

const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017/Vistas";
const client = new MongoClient(url)

//añadir vista

async function subirVista(vistaASubir: vista) {
  try {
    const database = client.db("Vistas");
    const videos = database.collection("video");
    const query = JSON.parse('{"$push":{"listaVistas":' + JSON.stringify(vistaASubir) +'}}')
    videos.findOneAndUpdate({id: vistaASubir.idVideo}, query);
    }
    finally {
  }
}

routerVistas.post("/vistas", (_req, _res)=>{ 
  let vistaASubir = new vista(Number(_req.body.idVista), Number(_req.body.idVideo), Number(_req.body.duracion), _req.body.ubicacion, _req.body.fecha);
  subirVista(vistaASubir).then((v)=>{
      _res.json(v);
    })
})

//quitar vista

export async function quitarVista(idAborrar: Number){
  try {
    let vistaABorrar = new vista(-1, -1, -1, "", "");
    const database = client.db('Vistas');
    const videos = database.collection('video');
    await videos.find().forEach(function(document: any){
      for(let i=0; i<document.listaVistas.length; i++){
        if(document.listaVistas[i].idVista == idAborrar){
          vistaABorrar = document.listaVistas[i];
          console.log(vistaABorrar);
        }
        const query = JSON.parse('{"$pull":{"listaVistas": {"idVista": '+ JSON.stringify(idAborrar) +'}}}')
        videos.findOneAndUpdate({id: vistaABorrar.idVideo}, query);
    }
  })

  } finally {
  }

}

routerVistas.delete("/vistas/:idVista", (_req,_res) => {
    quitarVista(Number(_req.params.idVista)).then((v)=>{
      _res.json(v);
    })
})

//modificar vista LO SUBE DOS VECES?

export async function modificarVista(vistaModificada: vista){
  try{
    const database = client.db('Vistas');
    const videos = database.collection('video');
    let idVideoOriginal=-1
    await videos.find().forEach(function(document: any){
      for(let i=0; i<document.listaVistas.length; i++){
        if(document.listaVistas[i].idVista == vistaModificada.idVista){
          idVideoOriginal = document.listaVistas[i].idVideo;
        }
      }
      if(idVideoOriginal == vistaModificada.idVideo){
        const query = JSON.parse('{"$set":{"listaVistas": '+ JSON.stringify([vistaModificada]) +'}}')
        videos.findOneAndUpdate({id: vistaModificada.idVideo}, query);
      }
      else if(idVideoOriginal != vistaModificada.idVideo && idVideoOriginal != -1){
        const queryQuitar = JSON.parse('{"$pull":{"listaVistas": {"idVista": '+ JSON.stringify(vistaModificada.idVista) +'}}}')
        videos.findOneAndUpdate({id: idVideoOriginal}, queryQuitar);
        const query = JSON.parse('{"$push":{"listaVistas":' + JSON.stringify(vistaModificada) +'}}')
        videos.findOneAndUpdate({id: vistaModificada.idVideo}, query);
      }
    })

  } finally {
  }
}

routerVistas.put("/vistas/:id", (_req, _res) =>{
  let vistaACambiar = new vista(Number(_req.params.id), Number(_req.body.idVideo), Number(_req.body.duracion), _req.body.ubicacion, _req.body.fecha)  
  modificarVista(vistaACambiar).then((v)=>{
    _res.json(vistaACambiar)
  })
})