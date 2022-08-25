import { Request, Response } from "express";
import ClientModel from "../models/Client.model";
import TownModel from "../models/Town.model";
import { isEmpty } from "../utils";

export const createTown = async (req: Request, res: Response) => {
  try {
    const townData = req.body;
    if (isEmpty(townData)) {
      return res.status(401).send({ message: "Your request is empty" });
    }
    const newTown = new TownModel(townData);
    res.status(200).send(newTown);
  } catch (error) {
    res.status(400).send({ message: "Can't create a town" });
  }
};

export const createClientByTown = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, cellphone, nit, bill, email, orders } = req.body;
    if (isEmpty(req.body)) {
      return res.status(401).send({ message: "Your request is empty" });
    }
    const currentTown = await TownModel.findById(id);
    const newClient = new ClientModel({
      name,
      cellphone,
      nit,
      bill,
      email,
      orders,
    });
    if (currentTown) {
      currentTown.clients = [...currentTown.clients, newClient];
    }
  } catch (error) {
    res.status(400).send({ message: "Can't create a client in this town" });
  }
};
