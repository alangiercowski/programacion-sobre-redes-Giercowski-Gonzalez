import { Collection, Db } from "mongodb";
import { usuario } from "../../usuario";

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
   
  
}
      
