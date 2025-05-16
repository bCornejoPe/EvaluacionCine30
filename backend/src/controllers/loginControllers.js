
import ClientsModel from "../models/Clients.js";
import EmployeesModel from "../models/Employees.js";
import bcryptjs from "bcryptjs"; 
import jsonwebtoken from "jsonwebtoken"; 
import { config } from "../config.js";


const loginController = {};

loginController.login = async (req, res) => {

  const { email, password } = req.body;

  try {


    let userFound; 
    let userType;


    if (
      email === config.ADMIN.emailAdmin &&
      password === config.ADMIN.password
    ) {
      userType = "admin";
      userFound = { _id: "admin" };
    } else {
      userFound = await EmployeesModel.findOne({ email });
      userType = "employee";
      if (!userFound) {
        userFound = await ClientsModel.findOne({ email });
        userType = "customer";
      }
    }

    
    if (!userFound) {
      return res.json({ message: "User not found" });
    }

  
    if (userType !== "admin") {
      const isMatch = await bcryptjs.compare(password, userFound.password);
      if (!isMatch) {
        return res.json({ message: "Invalid password" });
      }
    }

   
    jsonwebtoken.sign(
    
      { id: userFound._id, userType },
  
      config.JWT.secret,

      { expiresIn: config.JWT.expiresIn },
 
      (error, token) => {
        if (error) console.log("error" + error);
        res.cookie("authToken", token);
        res.json({ message: "Login successful" });
      }
    );
  } catch (error) {
    console.log("error" + error);
  }
};

export default loginController;