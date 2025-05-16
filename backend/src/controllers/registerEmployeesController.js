
import employeeModel from "../models/employee.js";
import bcryptjs from "bcryptjs"; 
import jsonwebtoken from "jsonwebtoken"; 
import { config } from "../config.js";
import registeremployeeController from "./employeesControllers.js";


const registeremployeeController = {};

registeremployeeController.register = async(req, res)=> {
   
    const {name, 
        email,
        password,
        telephone,
        address,
        position,
        hireDate,
        salary,
        dui,
        isVerified,
        issnumber,
    } = req.body;

    try {
     
        const existEmployee = await employeeModel.findOne({email})
        if(existEmployee) {
            return res.json({message: "Employee already exist"})
        } 

       
        const passwordHash = await bcryptjs.hash(password, 10)

        const newEmployee = new employeeModel({name, 
        lastName, 
        birthday,
        email,
        address,
        password: passwordHash,
        hireDate,
        telephone,
        dui,
        isVerified,
        issnumber,
        })

        await newEmployee.save();

     
        jsonwebtoken.sign(
            
            {id: newEmployee._id},
            
            config.JWT.secret,
           
            {expiresIn: config.JWT.expiresIn},
           
            (error, token) =>{
                if(error) console.log("error"+error)
                
                res.cookie("authToken", token)
                res.json({message: "Employee saved"})
            }
        )

    } catch (error) {
        console.log("error"+error)
        res.json({message: "Error saving employee"})
    }
} 

export default registerEmployeeController;