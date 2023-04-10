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

app.use(express.json())

app.set('view engine', 'ejs')

export let videos:Array<video> = new Array<video>;

import { routerVistas } from "./controladores/controladorVista";
import { routerVideos } from "./controladores/controladorVideo";

app.use(routerVistas)
app.use(routerVideos)

app.listen(1815,()=>{
  console.log("Messsi nashe")
})




//métodos personalizados

//mostrar videos con cierta cantidad de vistas o más

app.get("/videos/verVideosXVistas/:cantMinima", (_req,_res) => {
    let videosXvisitas:Array<video> = new Array<video>
    for (let i = 0; i < videos.length; i++) {
      if(videos[i].listaVistas.length >= Number(_req.params.cantMinima)){
          videosXvisitas.push(videos[i])
      }
    }
  _res.json(videosXvisitas);
})

//mostrar vistas de los videos

app.get("/videos/verVistasVideos", (_req, _res) => {
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
app.get("/videos/verVideoMasLargo", (_req, _res) => {
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