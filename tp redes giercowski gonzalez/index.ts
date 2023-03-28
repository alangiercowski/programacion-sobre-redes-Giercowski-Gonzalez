import  express  from "express";
import { video } from "./video";
import { ObjectId } from "mongodb";
import { vista } from "./vista";


const app: express.Application = express();

app.get('/', (req, res) => {
    res.render('index')
})

app.set('view engine', 'ejs')

let videos:Array<video> = new Array<video>;
let vistas:Array<vista> = new Array<vista>;

vistas.push(new vista(1, 0, "1:00", "Argentina, CABA", "2015-01-13"))


let videoTemp:video = new video(0, "1", "00:00", "imagen Base sesenta y cuatro", new Array<vista>, "usuarioAlpha");
videos.push(videoTemp);

app.get("/verVideos", (_req,_res) => {
    _res.json(videos);
  })

// subir video
app.post("/subirVideo", (_req, _res)=>{ 
    let videoASubir:video = new video(2, "me cago en la cama de mi perro termina sexual(broma masiva)", "01:01", "imagen Base sesenta y cuatro",new Array<vista>, "usuarioBeta");
    videos.push(videoASubir); 
    _res.json(videos);   
})

// eliminar video
app.delete("/eliminarVideo/:id", (_req,_res) => {
    const p = videos.find(item => {
        return item.id == Number(_req.params.id)
    })
    if (p){
      delete videos[videos.indexOf(p)]
    }
    _res.status(204).send()
  })

  //modificar titulo
app.patch("/modifTitulo/:id/:titulo", (_req, _res) =>{
  const p = videos.find(item => {
    return item.id == Number(_req.params.id)
  })
  if (p){
    p.titulo = _req.params.titulo
  }
  _res.json(p); 
  })

//añadir vista                    PREGUNTAR POR QUE SE TRABA
app.post("/addVista", (_req, _res) => {
  
    let vistaTemp3:vista = new vista(1, 2, "1:00", "Argentina, CABA", "2015-01-13");
    let vistaTemp4:vista = new vista(2, 2, "1:00", "Argentina, CABA", "2015-01-13");
    let v = 0
    for(let i = 0; i < videos.length;i++){
      if(videos[i].id == vistaTemp3.idVideo){
        v = i
      }
    }
    
    videos[v].listaVistas.push(vistaTemp3)

    videos[v].listaVistas.push(vistaTemp4)
  })

app.listen(1814,()=>{
    console.log("Messsi nashe")
})

//quitar vista

app.delete("/eliminarVista/:idVisita", (_req,_res) => {
  const vistaABorrar = vistas.find(item => {
      return item.idVisita == Number(_req.params.idVisita)
  })

  for(let i = 0; i < videos.length; i++){
    if(videos[i].id == vistaABorrar?.idVideo){
      for(let j = 0; j < videos[i].listaVistas.length; j++){
        if(videos[i].listaVistas[j].idVisita == vistaABorrar.idVisita){
          videos[i].listaVistas.splice(j, 1)
        }
      }
    }
  }
  _res.status(204).send()
})

//modificar vista 