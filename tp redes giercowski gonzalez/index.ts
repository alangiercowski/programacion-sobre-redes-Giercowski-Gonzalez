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
import { routerPersonalizados } from "./controladores/controladorPerzonalizadas";
import { routerUsuario } from "./controladores/controladorUsuario";

app.use(routerVistas)
app.use(routerVideos)
app.use(routerPersonalizados)
app.use(routerUsuario)

app.listen(1815,()=>{
  console.log("Messsi nashe")
})






