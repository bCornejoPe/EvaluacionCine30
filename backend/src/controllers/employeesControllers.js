//Array de metodos (C R U D)
const employeeController = {};
import employeeModel from "../models/Employees.js";

// SELECT
employeeController.getemployee = async (req, res) => {
  const employee = await employeeModel.find();
  res.json(employee);
};



// DELETE
employeeController.deleteemployee = async (req, res) => {
const deletedemployee = await employeeModel.findByIdAndDelete(req.params.id);
  if (!deletedemployee) {
    return res.status(404).json({ message: "employee dont find" });
  }
  res.json({ message: "employee deleted" });
};

// UPDATE
employeeController.updateemployee = async (req, res) => {
  // Solicito todos los valores
  const { name, 
    email,
    password,
    telephone,
    address,
    position,
    hireDate,
    salary,
    dui,
    isVerified,
    issnumber,  } = req.body;

  await employeeModel.findByIdAndUpdate(
    req.params.id,
    {
        name, 
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
    },
    { new: true }
  );
 
  res.json({ message: "employee update" });
};

export default employeeController;