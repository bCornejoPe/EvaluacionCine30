
import {Schema, model } from "mongoose";

const productsSchema = new Schema ({
tittle: {
    type: String,
    require: true
},
description:{
    type: String,
    require: true    
},
director: {
    type: String,
    require: true
},

gender: {
    type: String,
    require: true

},

year: {
    type: Number,
    require: true
},
duration: {
    type: Number,
    require: true
},
image: {
    type: String,
    require: true
},


},{
    timestamps: true,
    strick: false
}

);
export default model ("Movies", productsSchema)