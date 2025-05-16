import moviesModel from "../models/Movies.js"

import {v2 as cloudinary} from "cloudinary"
import {config} from "../config.js"


cloudinary.config({

    cloud_name: config.cloudinary.cloudinary_name,
    api_key: config.cloudinary.cloudinary_api_key,
    api_secret: config.cloudinary.cloudinary_api_secret
});

const moviesController ={};

moviesController.getAllMovies = async (req, res) => {
    const movies = await moviesModel.find();
    res.json(movies)
    
};

moviesController.insertMovies = async (req,res) => {
    const {tittle, description,director,gender,year,duration} = req.body;
       let imageURL = "";

if(req.file){
    const result = await cloudinary.uploader.upload(
        req.file.path,{
            folder: "public",
            allowed_formats: ["png", "jpg", "jpeg"]
        }
    )
        imageURL = result.secure_url
}

const newMovies = new moviesModel({tittle, description,director,gender,year,duration, image: imageURL});
 await newMovies.save();

res.json({message: "Movies saved"})
}
moviesController.deleteMovies = async (req, res) => {
    await moviesModel.findByIdAndDelete(req.params.id)
    res.json({message: "Movie deleted"});
};

moviesController.updateMovies = async (req, res) => {
    //solicito los valores
 const {name, description, price, stock} = req.body;
 await moviesModel.findByIdAndUpdate(req.params.id,{tittle, description,director,gender,year,duration}, {new: true});
 let imageURL = "";

if(req.file){
    const result = await cloudinary.uploader.upload(
        req.file.path,{
            folder: "public",
            allowed_formats: ["png", "jpg", "jpeg"]
        }
    )
        imageURL = result.secure_url
}
 res.json({message: "Movie update"});

};
export default moviesController;