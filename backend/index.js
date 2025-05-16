//importo archivo  app.js
import app from "./app.js";
import "./database.js";
import dotenv from "dotenv";

dotenv.config();

import  {config} from "./src/config.js"

//Creo una funcion
//que se encargue de ejecutar el servidor
async function main(){
    //const port = 4000;
    app.listen(config.server.port);
    console.log("Server on port" + config.server.port);
}

//ejecutamos todo
main();
    
