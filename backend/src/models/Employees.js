import {Schema, model } from "mongoose";

const employeesSchema = new Schema ({
name: {
    type: String,
    require: true
},
email: {
    type: String,
    require: true
},
password: {
    type: String,
    require: true
},
telephone: {
    type: String,
    require: true
},
address:{
    type: String,
    require: true
},
position:{
    type: String,
    require: true
},
hireDate:{
    type: String,
    require: true
},
salary:{
    type: String,
    require: true
},
DUI:{
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
export default model ("Employees", employeesSchema)