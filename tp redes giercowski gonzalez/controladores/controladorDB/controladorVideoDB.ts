import { Collection, Db } from "mongodb";
import { video } from "../../video";
import { vista } from "../../vista";

export class controladorVideoDB{
    url: String;
    database: Db;
    collection: Collection;

    constructor(url: String, database: Db, collection: Collection){
        this.url = url;
        this.database = database;
        this.collection = collection;
    }
    public async getVideos(){
        var listaDeVideos: Array<video> = new Array
          await this.collection.find().forEach(function(document: any){
            var listaDeVistas: Array<vista> = new Array
            for(let i=0; i<document.listaVistas.length; i++){
              let vistaRePuta = new vista(Number(document.listaVistas[i].idVista), Number(document.listaVistas[i].idVideo), Number(document.listaVistas[i].duracion), document.listaVistas[i].ubicacion, document.listaVistas[i].fecha)
              listaDeVistas.push(vistaRePuta)
            }
            let videoAux: video = new video(Number(document.id), document.titulo, Number(document.duracion), document.miniatura, listaDeVistas, document.usuario)
            listaDeVideos.push(videoAux)
          })
          return listaDeVideos
      }
      public async subirVideo(videoASubir: video) {

      
          const document = {
            id: videoASubir.id,
            titulo: videoASubir.titulo,
            duracion: videoASubir.duracion,
            miniatura: videoASubir.miniatura,
            listaVistas: videoASubir.listaVistas,
            usuario: videoASubir.usuario
          }
          const result = await this.collection.insertOne(document);
          console.log(`A document was inserted with the _id: ${result.insertedId}`);
       
      }
      public async quitarVideo(idAborrar: Number){
          await this.collection.find().forEach(() =>{
            const query = { id: idAborrar };
            this.collection.findOneAndDelete(query);
          })
        }
        public async modificarVideo(videoASubir: video) {
            
              const document = {
                id: videoASubir.id,
                titulo: videoASubir.titulo,
                duracion: videoASubir.duracion,
                miniatura: videoASubir.miniatura,
                listaVistas: videoASubir.listaVistas,
                usuario: videoASubir.usuario
              }
           
              const result = await this.collection.find().forEach(() =>{           
               this.collection.findOneAndReplace({"id": videoASubir.id}, document);
              })            
          }     
}
      
