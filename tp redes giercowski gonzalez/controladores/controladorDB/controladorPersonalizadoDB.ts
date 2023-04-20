import { Collection, Db } from "mongodb";
import { video } from "../../video";
import { vista } from "../../vista";

export class controladorPersonalizadoDB{
    url: String;
    database: Db;
    collection: Collection;

    constructor(url: String, database: Db, collection: Collection){
        this.url = url;
        this.database = database;
        this.collection = collection;
    }

    public async getVideosConXVistas(cantMinima: number){
        var listaDeVideos: Array<video> = new Array

          await this.collection.find().forEach(function(document: any){
            console.log(document.listaVistas.length)
            if(document.listaVistas.length>=cantMinima){
              let videoAux: video = new video(Number(document.id), document.titulo, Number(document.duracion), document.miniatura, document.listaVistas, document.usuario)
              listaDeVideos.push(videoAux)
            }
          })
          return listaDeVideos
      }
      
public async verVistasVideos(this: any){
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
      await this.collection.find().forEach(function(document: any){
        let itemLista:vistasDeVideos = new vistasDeVideos(document.titulo, document.listaVistas.length)
        listaItems.push(itemLista)
      })
      return listaItems
  }

  public async verVideoMasLargo(){
    let masLargo: video = new video(-1, "", 0, "", [], "")
    let listaMasLargos: Array<video> = new Array<video>
    
      await this.collection.find().forEach(function(document: any){
        if(document.duracion > masLargo.duracion){
          listaMasLargos = [];
          listaMasLargos.push(new video(Number(document.id), document.titulo, Number(document.duracion), document.miniatura, document.listaVistas, document.usuario))
          masLargo = listaMasLargos[0]
        }
        else if(document.duracion == masLargo.duracion){
          listaMasLargos.push(new video(Number(document.id), document.titulo, Number(document.duracion), document.miniatura, document.listaVistas, document.usuario))
        }
      })
      return listaMasLargos
  }

}