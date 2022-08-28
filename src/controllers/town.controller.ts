import { Request, Response } from "express";
import ClientModel from "../models/Client.model";
import TownModel from "../models/Town.model";
import { isEmpty } from "../utils";
import RouteModel from "../models/Route.model";

export const createTown = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const arrTowns = req.body;
    console.log(arrTowns);
    if (isEmpty(arrTowns)) {
      return res.status(401).send({ message: "Your request is empty" });
    }
    const currentRoute = await RouteModel.findById(id);
    if (!currentRoute) {
      return res.status(400).send({ message: "Route not found" });
    }
    const arrOfModels = arrTowns.map((town: any) => {
      return new TownModel({ ...town, route_id: id });
    });
    const l = arrOfModels.map((model: any) => {
      return model.save();
    });
    await Promise.all(l)
      .then((model: any) => console.log("Promesa concluida"))
      .catch((err) => console.log(err));
    if (currentRoute.towns) {
      currentRoute.towns = [...currentRoute.towns, ...arrOfModels];
      await currentRoute.save();
    }
    res.status(200).send(arrOfModels);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Can't create a town" });
  }
};
