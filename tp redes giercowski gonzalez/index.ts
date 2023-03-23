import  express  from "express";
import { video } from "./video";
import { ObjectId } from "mongodb";
import { vista } from "./vista";
import { usuario } from "./usuario";

const app: express.Application = express();

app.get('/', (req, res) => {
    res.render('index')
})

app.set('view engine', 'ejs')

let videos:Array<video> = new Array<video>;
let vistas:Array<vista> = new Array<vista>;

let vistaTemp:vista = new vista(0, "1:00", "Argentina, CABA", "2015-01-13");
vistas.push(vistaTemp);

let videoTemp:video = new video(0, "1", "00:00", "imagen Base sesenta y cuatro", vistas, "usuarioAlpha");
videos.push(videoTemp);

app.get("/videoss", (_req,_res) => {
    _res.json(videos);
  })

  app.get("/vistas", (_req,_res) => {
    _res.json(vistas);
  })

// subir video
app.post("/videos", (_req, _res)=>{ 
    let videoTemp:video = new video(2, "me cago en la cama de mi perro termina sexual(broma masiva)", "01:01", "imagen Base sesenta y cuatro",vistas, "usuarioBeta");
    videos.push(videoTemp); 
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

  //modificar titulo
app.patch("/videos/:id/:nombre", (_req, _res) =>{
  const p = videos.find(item => {
    return item.id == Number(_req.params.id)
  })
  if (p){
    p.setTitulo = _req.body.titulo
  }
  _res.json(p); 
  })

app.listen(1814,()=>{
    console.log("Messsi nashe")
})
