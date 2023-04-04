export class vista{
    idVista: number;
    idVideo: number;
    duracion: number; 
    ubicacion: string;
    fecha: string;

    constructor(id: number, idVideo: number, duracion: number, ubicacion: string, fecha: string){
        this.idVista = id;
        this.idVideo = idVideo;
        this.duracion = duracion;
        this.ubicacion = ubicacion;
        this.fecha = fecha;
    }
}