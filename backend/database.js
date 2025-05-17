import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();

import  {config} from "./src/config.js"

//1 Configuro URI o direccion de la base de datos
const URI = "mongodb+srv://BCornejo:h3n0pukcF@cluster2a.j9uds.mongodb.net/";

//2 Conecto la base de datos
mongoose.connect(config.db.URI);




const connection = mongoose.connection;


connection.once("open", () =>{
    console.log ("DB is connected");
});

connection.once("disconnect", () =>{
    console.log ("DB is disconnect");
});


connection.once("error", (error) =>{
    console.log ("error fun"+error);
});