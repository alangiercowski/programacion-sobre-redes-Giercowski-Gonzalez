import { video } from "./video";

export class usuario{
    nombre: string;
    videos: video[];

    constructor (nombre: string, videos:video[]){
        this.nombre = nombre;
        this.videos = videos;
    }
}