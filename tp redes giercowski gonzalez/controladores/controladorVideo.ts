import { video } from "../video";
import { Router } from "express";
import { videos } from "..";

export const routerVideos = Router()

routerVideos.get("/videos", (_req,_res) => {
    _res.json(videos);
  })


// subir video
routerVideos.post("/videos", (_req, _res)=>{ 
    let videoASubir: video = new video(Number(_req.body.id), _req.body.titulo, Number(_req.body.duracion), _req.body.miniatura, _req.body.vistas, _req.body.usuario)
    videos.push(videoASubir)
    _res.send(204)
})

// eliminar video
routerVideos.delete("/videos/:id", (_req,_res) => {
    const p = videos.find(item => {
        return item.id == Number(_req.params.id)
    })
    if (p){
      videos.splice(videos.indexOf(p), 1)
    }
    _res.status(204).send()
  })

  //modificar video
routerVideos.put("/videos/:id", (_req, _res) =>{
    const p = videos.find(item => {
    return item.id == Number(_req.params.id)
    })
    if (p){
        p.titulo = _req.body.titulo
        p.duracion = Number(_req.body.duracion)
        p.miniatura = _req.body.miniatura
        p.usuario = _req.body.usuario
        p.listaVistas = _req.body.listaVistas
    }
    _res.json(p); 
    })