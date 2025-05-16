import cookieParser from "cookie-parser";
import express from "express";
import moviesRoutes from "./src/router/movies.js";
import clientsRoutes from "./src/router/clients.js";
import employeeRoutes from "./src/router/employees.js";
import registeremployee from "./src/router/registerEmployee.js";
    

const app = express();
app.use(express.json());
app.use(cookieParser());


app.use("/api/movies",moviesRoutes)
app.use("/api/clients",clientsRoutes)
app.use("/api/employees",employeeRoutes)
app.use("/api/registeremployee",registeremployee)

export default app;
