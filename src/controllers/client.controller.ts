import { Response, Request } from "express";
import ClientModel from "../models/Client.model";
import TownModel from "../models/Town.model";
import { isEmpty } from "../utils";

export const getAllClients = async (req: Request, res: Response) => {
  try {
    const clientList = await ClientModel.find({});
    return res.status(200).send({ results: clientList });
  } catch (error: any) {
    return res.status(400).send({ message: error });
  }
};

export const createNewClient = async (req: Request, res: Response) => {
  try {
    if (isEmpty(req.body)) {
      return res.status(401).send({ message: "body is empty" });
    }
    const { email, orders, name, nit, cellphone, bill } = req.body;
    const saveClient = new ClientModel({
      name,
      email,
      orders,
      nit,
      cellphone,
      bill,
    });
    await saveClient.save();
    res
      .status(200)
      .json({ message: "Client created successfuly", client: saveClient });
  } catch (error: any) {
    res.status(400).send({ message: "Seem like some information exist yet" });
  }
};
export const createNewClientByTown = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (isEmpty(req.body)) {
      return res.status(400).send({ message: "Por favor, rellena los campos" });
    }
    const clientData = req.body;
    const currentTown = await TownModel.findById(id);
    if (!currentTown) {
      return res.status(404).send({ message: "Current town doesnt exist" });
    }
    const saveClient = new ClientModel({
      ...clientData,
      town_id: currentTown._id,
    });
    currentTown.clients = [...currentTown.clients, saveClient._id];
    await saveClient.save();
    await currentTown.save();
    console.log("xd");
    res
      .status(200)
      .json({ message: "Cliente creado exitosamente", client: saveClient });
  } catch (error: any) {
    res.status(400).send({
      message: "Seem like some information exist yet",
      error: error.message,
    }); // ->
  }
};

export const updateClient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const newClientInfo = req.body;
    if (isEmpty(newClientInfo)) {
      return res.status(401).send({ message: "At least 1 property to update" });
    }
    const client = await ClientModel.findByIdAndUpdate(id, newClientInfo);
    res
      .status(200)
      .send({ message: "Client updated sucessfuly", client: client });
  } catch (error: any) {
    res.status(400).send({ message: error });
  }
};
