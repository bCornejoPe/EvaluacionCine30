const clientsController = {};
import clientsModel from "../models/Clients.js";


clientsController.getClients = async (req, res) => {
  const clients = await clientsModel.find();
  res.json(clients);
};


clientsController.deleteClients = async (req, res) => {
const deleteClients = await clientsModel.findByIdAndDelete(req.params.id);
  if (!deleteClients) {
    return res.status(404).json({ message: "Clients dont find" });
  }
  res.json({ message: "clients deleted" });
};


clientsController.updateClients = async (req, res) => {

  const {  name,
    email,
    password,
    telephone,
    dui,
    isVerified, } = req.body;

  await clientsModel.findByIdAndUpdate(
    req.params.id,
    {
      name,
      email,
      password,
      telephone,
      dui,
      isVerified,
    },
    { new: true }
  );
 
  res.json({ message: "clients update" });
};

export default clientsController;