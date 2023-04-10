import { vista } from "../vista";
import { Router } from "express";
import { videos } from "..";

export const routerVistas = Router()

//añadir vista
routerVistas.post("/vistas", (_req, _res) => {
    let vistaASubir = new vista(Number(_req.body.id), Number(_req.body.idVideo), Number(_req.body.duracion), _req.body.ubicacion, _req.body.fecha);
    let v = 0
    for(let i = 0; i < videos.length;i++){
      if(videos[i].id == vistaASubir.idVideo){
        v = i
      }
    }
    videos[v].listaVistas.push(vistaASubir)
    _res.json(vistaASubir)
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