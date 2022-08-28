import { Request, Response } from "express";
import RouteModel from "../models/Route.model";
import UserModel from "../models/User.model";
import { isEmpty } from "../utils";

export const createRoute = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const routeData = req.body;
    if (isEmpty(routeData)) {
      return res.status(401).send({ message: "Can't create route" });
    }
    const currentUser = await UserModel.findById(id);
    console.log(currentUser);
    if (!currentUser) {
      return res.status(200).send({ message: "Can't found user" });
    }
    const newRoute = new RouteModel(routeData);
    if (!currentUser.route) {
      newRoute.user_id = currentUser._id;
      await newRoute.save();
      currentUser.route = newRoute._id;
      await currentUser.save();
      return res.status(200).send({
        message: "Route created successfuly",
        route: {
          newRoute,
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

export const updateRoute = async (req: Request, res: Response) => {
  const { id } = req.params;
  const newInfo = req.body;
  const modifiedRoute = await RouteModel.findByIdAndUpdate(id, newInfo);
  res.send(modifiedRoute);
};
