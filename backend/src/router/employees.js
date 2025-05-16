import express from "express";
import employeeController from "../controllers/employeesControllers.js";

const router = express.Router();

router
  .route("/")
  .get(employeeController.getemployee)

router
  .route("/:id")
  .put(employeeController.updateemployee)
  .delete(employeeController.deleteemployee);

export default router;