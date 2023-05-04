import { Collection, Db } from "mongodb";
import { usuario } from "../../usuario";
const { createHash } = require('crypto');

export class controladorUsuarioDB{
    url: String;
    database: Db;
    collection: Collection;

    constructor(url: String, database: Db, collection: Collection){
        this.url = url;
        this.database = database;
        this.collection = collection;
    }

    public async subirUsuario(usuario: usuario){
        this.collection.insertOne(JSON.parse(JSON.stringify(usuario)));
    }
    public async login(usuario: String, contraseña: String){
        const usuarioTemp = await this.collection.findOne({nombreUsuario: usuario, contraseña: hash(contraseña)});
        if(usuarioTemp?.contraseña == hash(contraseña)){
            return true
        }
    }
}    
function hash(string: String) {
    return createHash('sha256').update(string).digest('hex');
}

