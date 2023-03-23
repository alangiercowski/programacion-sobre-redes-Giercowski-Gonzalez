export class vista{
    idVideo: number;
    duracion: string;
    ubicacion: string;
    fecha: string;

    constructor(idVideo: number, duracion: string, ubicacion: string, fecha: string){
        this.idVideo = idVideo;
        this.duracion = duracion;
        this.ubicacion = ubicacion;
        this.fecha = fecha;
    }
}