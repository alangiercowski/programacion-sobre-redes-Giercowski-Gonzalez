import { vista } from "./vista";

export class video{
    id: number;
    titulo: string;
    duracion: string;
    miniatura: string;
    listaVisitas: vista[]
    usuario: string;

    constructor(id: number, titulo: string, duracion: string, miniatura: string, listaVisita: vista[], usuario: string){
        this.id = id;
        this.duracion = duracion;
        this.miniatura = miniatura;
        this.titulo = titulo;
        this.listaVisitas = listaVisita
        this.usuario = usuario
    }
    
   public getTitulo(){
    return this.titulo;
   }

   public setTitulo(tituloNuevo: string){
        this.titulo = tituloNuevo;
   }
}