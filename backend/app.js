import cookieParser from "cookie-parser";
import express from "express";
import movies from "./src/router/movies.js";
import clients from "./src/router/clients.js";
import employee from "./src/router/employees.js";
import registeremployee from "./src/router/registerEmployee.js";
import recoveryPassword from "./src/router/recoveryPassword.js";    
import registerClients from "./src/router/registerClients.js";
import logout from "./src/router/logout.js"
import login from "./src/router/login.js"


const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/logout", logout)
app.use("/api/login", login)
app.use("/api/movies",movies)
app.use("/api/clients",clients)
app.use("/api/employees",employee)
app.use("/api/registeremployee",registeremployee)
app.use("/api/recoveryPassword", recoveryPassword);
app.use("/api/registerClients", registerClients)

export default app;
