import {Schema, model } from "mongoose";

const clientSchema = new Schema ({
name: {
    type: String,
    require: true
},
    

email: {
    type: String,
    require: true,
    

},
password: {
    type: String,
    require: true
},

telephone: {
    type: String,
    require: true
},
password: {
    type: String,
    require: true
},
dui:{
    type: String,
    require: true
},
isVerified: {
    type: Boolean
}


},{
    timestamps: true,
    strick: false
}

);
export default model ("clients", clientSchema)