import { Response, Request } from "express";
import ClientModel from "../models/Client.model";
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
    res.status(400).send(error);
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
