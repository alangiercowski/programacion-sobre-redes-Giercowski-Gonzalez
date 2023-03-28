export class vista{
    idVisita: number;
    idVideo: number;
    duracion: string; //horaActual-horaAbreVideo
    ubicacion: string; // ver con el profe, obtener coords?
    fecha: string;

    constructor(id: number, idVideo: number, duracion: string, ubicacion: string, fecha: string){
        this.idVisita = id;
        this.idVideo = idVideo;
        this.duracion = duracion;
        this.ubicacion = ubicacion;
        this.fecha = fecha;
    }
}