export class vista{
    idVisita: number;
    idVideo: number;
    duracion: number; 
    ubicacion: string;
    fecha: string;

    constructor(id: number, idVideo: number, duracion: number, ubicacion: string, fecha: string){
        this.idVisita = id;
        this.idVideo = idVideo;
        this.duracion = duracion;
        this.ubicacion = ubicacion;
        this.fecha = fecha;
    }
}