import { Collection, Db } from "mongodb";
import { video } from "../../video";
import { vista } from "../../vista";

export class controladorVistaDB{
    url: String;
    database: Db;
    collection: Collection;

    constructor(url: String, database: Db, collection: Collection){
        this.url = url;
        this.database = database;
        this.collection = collection;
    }
    public async subirVista(vistaASubir: vista) {
          const query = JSON.parse('{"$push":{"listaVistas":' + JSON.stringify(vistaASubir) +'}}')
          this.collection.findOneAndUpdate({id: vistaASubir.idVideo}, query);
      }
      public async quitarVista(idAborrar: Number){
          let vistaABorrar = new vista(-1, -1, -1, "", "");
          await this.collection.find().forEach((document: any) =>{
            for(let i=0; i<document.listaVistas.length; i++){
              if(document.listaVistas[i].idVista == idAborrar){
                vistaABorrar = document.listaVistas[i];
                console.log(vistaABorrar);
              }
              const query = JSON.parse('{"$pull":{"listaVistas": {"idVista": '+ JSON.stringify(idAborrar) +'}}}')
              this.collection.findOneAndUpdate({id: vistaABorrar.idVideo}, query);
          }
        })  
      }
      
public async modificarVista(vistaModificada: vista){
      let idVideoOriginal=-1
      await this.collection.find().forEach((document: any) =>{
        for(let i=0; i<document.listaVistas.length; i++){
          if(document.listaVistas[i].idVista == vistaModificada.idVista){
            idVideoOriginal = document.listaVistas[i].idVideo;
          }
        }
        if(idVideoOriginal == vistaModificada.idVideo){
          const query = JSON.parse('{"$set":{"listaVistas": '+ JSON.stringify([vistaModificada]) +'}}')
          this.collection.findOneAndUpdate({id: vistaModificada.idVideo}, query);
        }
        else if(idVideoOriginal != vistaModificada.idVideo && idVideoOriginal != -1){
          const queryQuitar = JSON.parse('{"$pull":{"listaVistas": {"idVista": '+ JSON.stringify(vistaModificada.idVista) +'}}}')
          this.collection.findOneAndUpdate({id: idVideoOriginal}, queryQuitar);
          const query = JSON.parse('{"$push":{"listaVistas":' + JSON.stringify(vistaModificada) +'}}')
          this.collection.findOneAndUpdate({id: vistaModificada.idVideo}, query);
        }
      })
  }
}