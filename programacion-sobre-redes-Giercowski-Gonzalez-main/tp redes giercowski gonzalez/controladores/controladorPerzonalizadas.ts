import { vista } from "../vista";
import { video } from "../video";
import { Router } from "express";
import { videos } from "..";

export const routerPersonalizados = Router()

//mostrar videos con cierta cantidad de vistas o más





routerPersonalizados.get("/videos/verVideosXVistas/:cantMinima", (_req,_res) => {
    let videosXvisitas:Array<video> = new Array<video>
    for (let i = 0; i < videos.length; i++) {
      if(videos[i].listaVistas.length >= Number(_req.params.cantMinima)){
          videosXvisitas.push(videos[i])
      }
    }
  _res.json(videosXvisitas);
})

//mostrar vistas de los videos

routerPersonalizados.get("/videos/verVistasVideos", (_req, _res) => {
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

  for(let i=0; i<videos.length; i++){
    let itemLista:vistasDeVideos = new vistasDeVideos(videos[i].titulo, videos[i].listaVistas.length)
    listaItems.push(itemLista)
  }
  _res.json(listaItems);
})

// mostrar videos con mas vistas
routerPersonalizados.get("/videos/verVideoMasLargo", (_req, _res) => {
  let masLargo: video = new video(-1, "", 0, "", [], "")
  let lista: Array<video> = new Array<video>
  for(let i = 0; i < videos.length; i ++){
    if(videos[i].duracion > masLargo.duracion){
      lista = [];
      lista.push(videos[i])
      masLargo = videos[i]
    }
    else if(videos[i].duracion == masLargo.duracion){
      lista.push(videos[i])
    }
  }
  _res.json(lista);
})