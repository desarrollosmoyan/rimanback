import { Response, Request } from "express";
import ClientModel from "../models/Client.model";
import TownModel from "../models/Town.model";
import { isEmpty } from "../utils";
import mongoose, { ObjectId } from "mongoose";

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
  console.log({ client: req.body });
  try {
    const { id } = req.params;
    const newClientInfo = req.body;
    if (isEmpty(newClientInfo)) {
      return res.status(401).send({ message: "At least 1 property to update" });
    }
    let client = await ClientModel.findById(id);
    if (!client) throw new Error("Client Not Found");
    if (client?.town_id!.toString() !== req.body.town_id) {
      console.log("entrd hererr");
      const oldTown = await TownModel.findById(client.town_id)!;
      const newTown = await TownModel.findById(req.body.town_id)!;
      if (!oldTown || !newTown) throw new Error("Town Not Found");

      oldTown!.clients = oldTown!.clients.filter((townClient) => {
        console.log({ townClient: townClient._id, client: client!._id });

        return townClient._id.toString() !== client!._id.toString();
      });

      newTown.clients = [client._id, ...newTown!.clients];

      await oldTown.save();
      await newTown.save();
      console.log({ changedOldTown: oldTown });
    }

    const test = await ClientModel.findByIdAndUpdate(client._id, {
      ...req.body,
      town_id: new mongoose.Types.ObjectId(req.body.town_id),
    });

    res
      .status(200)
      .send({ message: "Client updated sucessfully", client: client });
  } catch (error: any) {
    res.status(400).send({ message: error });
  }
};

export const deleteClient = async (req: Request, res: Response) => {
  try {
    const clientID = req.params.id;
    const client = await ClientModel.findById(clientID);
    if (!client)
      return res.status(400).json({ message: "No se encontró este cliente" });
    const clientTown = await TownModel.findById(client.town_id);
    if (!clientTown)
      return res
        .status(400)
        .json({ message: "No se encontró el pueblo de este cliente" });
    const clientsFiltered = clientTown.clients.filter(
      (client) => client.toString() !== clientID
    );
    clientTown.clients = clientsFiltered;
    await clientTown.save();
    await ClientModel.findByIdAndDelete(clientID);
    res.status(200).json({ message: "Cliente eliminado con éxito" });
  } catch (error) {
    res.status(400).send({ message: error });
  }
};
