export class usuario{
    id: Number;
    mail: String;
    nombreUsuario: String;
    contraseña: string;

constructor(id: Number, mail: String, nombreUsuario: String, contraseña: string){
    this.id = id;
    this.mail = mail;
    this.nombreUsuario = nombreUsuario;
    this.contraseña = contraseña;
}
}