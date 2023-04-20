import { vista } from "../vista";
import { video } from "../video";
import { Router } from "express";
import { videos } from "..";

export const routerPersonalizados = Router()

const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017/Vistas";
const client = new MongoClient(url)

//mostrar videos con cierta cantidad de vistas o más

export async function getVideosConXVistas(cantMinima: number){
  var listaDeVideos: Array<video> = new Array
  try {
    const database = client.db('Vistas');
    const videos = database.collection('video');
    await videos.find().forEach(function(document: any){
      console.log(document.listaVistas.length)
      if(document.listaVistas.length>=cantMinima){
        let videoAux: video = new video(Number(document.id), document.titulo, Number(document.duracion), document.miniatura, document.listaVistas, document.usuario)
        listaDeVideos.push(videoAux)
      }
    })
    return listaDeVideos
  } finally {
  }

}

routerPersonalizados.get("/videos/verVideosXVistas/:cantMinima", (_req,_res) => {
    getVideosConXVistas(Number(_req.params.cantMinima)).then((v)=>{
      _res.json(v);
    })
  
})

//mostrar vistas de los videos

export async function verVistasVideos(){
  class vistasDeVideos{
    titulo:string;
    cantidadVisitas: Number

    constructor(tit:string, cant:number)
    {
      this.titulo=tit;
      this.cantidadVisitas=cant
    }
  }
  let listaItems:Array<vistasDeVideos> = new Array<vistasDeVideos>
  try {
    const database = client.db('Vistas');
    const videos = database.collection('video');
    await videos.find().forEach(function(document: any){
      let itemLista:vistasDeVideos = new vistasDeVideos(document.titulo, document.listaVistas.length)
      listaItems.push(itemLista)
    })
    return listaItems
  } finally {
  }

}

routerPersonalizados.get("/videos/verVistasVideos", (_req, _res) => {
  verVistasVideos().then((v)=>{
    _res.json(v);
  })
})

// mostrar videos de mayor longitud
export async function verVideoMasLargo(){
  let masLargo: video = new video(-1, "", 0, "", [], "")
  let listaMasLargos: Array<video> = new Array<video>
  try {
    const database = client.db('Vistas');
    const videos = database.collection('video');
    await videos.find().forEach(function(document: any){
      if(document.duracion > masLargo.duracion){
        listaMasLargos = [];
        listaMasLargos.push(new video(Number(document.id), document.titulo, Number(document.duracion), document.miniatura, document.listaVistas, document.usuario))
        masLargo = listaMasLargos[0]
      }
      else if(document.duracion == masLargo.duracion){
        listaMasLargos.push(new video(Number(document.id), document.titulo, Number(document.duracion), document.miniatura, document.listaVistas, document.usuario))
      }
    })
    return listaMasLargos
  } finally {
  }

}

routerPersonalizados.get("/videos/verVideoMasLargo", (_req, _res) => {
  verVideoMasLargo().then((v)=>{
    _res.json(v);
  })
})