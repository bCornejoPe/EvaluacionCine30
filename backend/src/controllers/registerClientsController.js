
import jsonwebtoken from "jsonwebtoken"; 
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";
import crypto from "crypto"; 

import clientsModel from "../models/Clients.js";
import { config } from "../config.js";
import { register } from "module";


const registerClientController = {};

registerClientController.registerClient = async (req, res) => {

  const {
    name,
    email,
    password,
    telephone,
    dui,
    isVerified,
  } = req.body;

  try {

    const existClient = await clientsModel.findOne({ email });
    if (existClient) {
      return res.json({ message: "Client already exists" });
    }

 
    const passwordHash = await bcryptjs.hash(password, 10);


    const newClient = new clientsModel({
      name,
      email,
      password: passwordHash,
      telephone,
      dui: dui || null,
      isVerified: isVerified || false,
    });

    await newClient.save();

 
    const verficationCode = crypto.randomBytes(3).toString("hex");
    const expiresAt = Date.now() + 2 * 60 * 60 * 1000;


    const tokenCode = jsonwebtoken.sign(
      {
   
        email,
        verficationCode,
        expiresAt,
      },

      config.JWT.secret,
      { expiresIn: config.JWT.expiresIn }
     
    );

    res.cookie("verificationToken", tokenCode, {
      maxAge: 2 * 60 * 60 * 1000, 
    });

  
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.email.user,
        pass: config.email.pass,
      },
    });


    const mailOptions = {
      from: config.email.user,
      to: email,
      subject: "Verificacion de correo",
      text: `Para verificar que eres dueño de la cuenta, utiliza este codigo ${verficationCode}\n Este codigo expira en dos horas\n`,
    };


    transporter.sendMail(mailOptions, (error, info) => {
      if (error) console.log("error" + error);
      res.json({ message: "Email sent" });
    });

    res.json({ message: "Client registered, Please verify your email" });
  } catch (error) {
    res.json({ message: "error" + error });
  }
};

registerClientController.verifyCodeEmail = async (req, res) => {
  const { verficationCode } = req.body;
  const token = req.cookies.verificationToken;

  if (!token) {
    return res.json({ message: "Please register your account first" });
  }

  try {
    const decoded = jsonwebtoken.verify(token, config.JWT.secret);
    const { email, verficationCode: storedCode } = decoded;

     if (verficationCode !== storedCode) {
      return res.json({ message: "Invalid verification code" });
    }

    const client = await clientsModel.findOne({ email });
    if (!client) {
      return res.json({ message: "Client not found" });
    }

    client.isVerified = true;
    await client.save();

    res.clearCookie("verificationToken");

    res.json({ message: "Email verified successfully" });
  } catch (error) {
    res.json({ message: "error" + error });
  }
};

export default registerClientController;