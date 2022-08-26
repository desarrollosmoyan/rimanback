import { Request, Response } from "express";
import RouteModel from "../models/Route.model";
import UserModel from "../models/User.model";
import { isEmpty } from "../utils";

export const createRoute = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const routeData = req.body;
    if (isEmpty(routeData)) {
      return res.status(200).send({ message: "Route created successfuly" });
    }
    const currentUser = await UserModel.findById(id);
    if (!currentUser) {
      return res.status(200).send({ message: "Can't found user" });
    }
    const newRoute = new RouteModel(routeData);
    if (!currentUser.route) {
      await newRoute.save();
      currentUser.route = newRoute;
      return res.status(200).send({
        message: "Route created successfuly",
        route: {
          ...newRoute,
        },
      });
    }
    return res
      .status(400)
      .send({ message: "The current user has another route" });
  } catch (error) {
    res.status(400).send({ message: "Error" });
  }
};
