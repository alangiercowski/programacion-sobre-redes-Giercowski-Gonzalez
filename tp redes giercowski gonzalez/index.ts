import  express  from "express";
import { video } from "./video";
import { vista } from "./vista";
import swaggerUi from 'swagger-ui-express'
import * as swaggerDocument from './swagger.json'

const app: express.Application = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
    res.render('index')
    
})

app.set('view engine', 'ejs')

let videos:Array<video> = new Array<video>;

let videoTemp:video = new video(0, "1", 54, "imagen Base sesenta y cuatro", new Array<vista>, "usuarioAlpha");
videos.push(videoTemp);

app.get("/videos", (_req,_res) => {
    _res.json(videos);
  })

// subir video
app.post("/videos/:id/:titulo/:duracion/:miniatura/:usuario", (_req, _res)=>{ 
    let videoASubir: video = new video(Number(_req.params.id), _req.params.titulo, Number(_req.params.duracion), _req.params.miniatura, [], _req.params.usuario)
    _res.json(videos);   
})

// eliminar video
app.delete("/videos/:id", (_req,_res) => {
    const p = videos.find(item => {
        return item.id == Number(_req.params.id)
    })
    if (p){
      delete videos[videos.indexOf(p)]
    }
    _res.status(204).send()
  })

  //modificar video
app.put("/videos/:id/:titulo/:duracion/:miniatura/:usuario", (_req, _res) =>{
  const p = videos.find(item => {
    return item.id == Number(_req.params.id)
  })
  if (p){
    p.titulo = _req.params.titulo
    p.duracion = Number(_req.params.duracion)
    p.miniatura = _req.params.miniatura
    p.usuario = _req.params.usuario
  }
  _res.json(p); 
  })

//añadir vista
app.post("/vistas/:id/:idVideo/:duracion/:ubicacion/:fecha", (_req, _res) => {
    let vistaASubir = new vista(Number(_req.params.id), Number(_req.params.idVideo), Number(_req.params.duracion), _req.params.ubicacion, _req.params.fecha);
    let v = 0
    for(let i = 0; i < videos.length;i++){
      if(videos[i].id == vistaASubir.idVideo){
        v = i
      }
    }
    
    videos[v].listaVistas.push(vistaASubir)
    _res.json(204).send()
  })

app.listen(1814,()=>{
    console.log("Messsi nashe")
})

//quitar vista

app.delete("/vistas/:idVisita", (_req,_res) => {
  for(let i = 0; i < videos.length; i++){
    for(let j = 0; j < videos[i].listaVistas.length; j++){
      if(videos[i].listaVistas[j].idVista == Number(_req.params.idVisita)){
        videos[i].listaVistas.splice(j, 1)
      }
    }
  }
  _res.status(204).send()
})

//modificar vista 
app.put("/vistas/:idVista/:id/:idVideo/:duracion/:ubicacion/:fecha", (_req, _res) =>{
  let vistaACambiar = new vista(Number(_req.params.id), Number(_req.params.idVideo), Number(_req.params.duracion), _req.params.ubicacion, _req.params.fecha)  
  for(let i = 0; i < videos.length; i++){
      for(let j = 0; j<videos[i].listaVistas.length; j++){
        if (videos[i].listaVistas[j].idVista == Number(_req.params.idVista)){
          videos[i].listaVistas[j] = vistaACambiar
        }
      }
    }
    _res.status(204).send()
  })


//métodos personalizados

//mostrar videos con cierta cantidad de vistas o más

app.get("/verVideosXVistas/:cantMinima", (_req,_res) => {
    let videosXvisitas:Array<video> = new Array<video>
    for (let i = 0; i < videos.length; i++) {//drakul20
      if(videos[i].listaVistas.length >= Number(_req.params.cantMinima)){
          videosXvisitas.push(videos[i])
      }
    }
  _res.json(videosXvisitas);
})

//mostrar vistas de los videos

app.get("/verVistasVideos", (_req, _res) => {
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
app.get("/verVideoMasLargo", (_req, _res) => {
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