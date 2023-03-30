import { vista } from "./vista";

export class video{
    id: number;
    titulo: string;
    duracion: Number; //en segundos
    miniatura: string;
    listaVistas: Array<vista>;
    usuario: string;

    constructor(id: number, titulo: string, duracion: Number, miniatura: string, listaVista: Array<vista>, usuario: string){
        this.id = id;
        this.duracion = duracion;
        this.miniatura = miniatura;
        this.titulo = titulo;
        this.listaVistas = listaVista
        this.usuario = usuario
    }
    
   public getTitulo(){
    return this.titulo;
   }

   public setTitulo(tituloNuevo: string){
        this.titulo = tituloNuevo;
   }
}