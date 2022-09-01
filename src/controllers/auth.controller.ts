import { Request, Response } from "express";
import UserModel from "../models/User.model";
import TownModel from "../models/Town.model";
import TurnModel from "../models/Turn.model";
import { UserDocumentInterface } from "../types/user.types";
import { TownSchemaInterface } from "../types/town.types";
import { ClientSchemaInterface } from "../types/client.types";
import ClientModel from "../models/Client.model";
import OrderModel from "../models/Order.model";
export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const newUser = new UserModel({
      email,
      password,
    });
    const newTurn = new TurnModel({
      startDate: Date.now(),
      user: newUser._id,
    });
    newUser.currentTurn = newTurn._id;
    await newUser.save();
    await newTurn.save();
    return res.status(200).send({
      message: "User created successfuly",
      user: {
        newUser,
      },
    });
  } catch (error: any) {
    return res.status(400).json({ message: "Can't create user" });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const userFound = await UserModel.findOne({ email });
    if (!userFound) {
      return res.status(404).send({
        message: "Usuario no encontrado",
      });
    }
    const hasPasswordMatched = UserModel.comparePassword(
      password,
      userFound.password
    );

    if (!hasPasswordMatched) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }
    await userFound.populate({
      path: "route",
      populate: {
        path: "towns",
        model: "town",
        populate: {
          path: "clients",
          model: "client",
          populate: {
            path: "orders",
            model: "order",
          },
        },
      },
    });
    await userFound.populate({
      path: "currentTurn",
      populate: {
        path: "orders",
      },
    });
    return res.status(200).send({ user: userFound });
  } catch (error: any) {
    return res.status(400).json({ message: error });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(400).send({ message: "Usuario no encontrado" });
    }
    await user.populate({
      path: "route",
      populate: {
        path: "towns",
        model: "town",
        populate: {
          path: "clients",
          model: "client",
          populate: {
            path: "orders",
            model: "order",
          },
        },
      },
    });
    await user.populate({
      path: "currentTurn",
      populate: {
        path: "orders",
      },
    });
    res.status(200).send({
      message: "Usuario encontrado con éxito",
      user: {
        user,
      },
    });
  } catch (error: any) {
    res.status(400).send({ message: "Error", error: error.message });
  }
};

export const patchUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;

    if (!userData) {
      return res.status(404).send({ message: "User not found" });
    }
    const routeId = userData.route._id;
    const turnId = userData.currentTurn._id;

    await userData.route.towns.map(async (town: any) => {
      let clientsIds = await Promise.all(
        town.clients.map(async (client: any) => {
          const clientExists = await ClientModel.findById(client._id);
          if (clientExists) return client._id;
          const ordersIds = await client.orders.map(async (order: any) => {
            const orderExists = await OrderModel.findById(order._id);
            if (orderExists) return order._id;
            const newOrder = new OrderModel(order);
            await newOrder.save();
            return newOrder._id;
          });
          const newClient = new ClientModel({ ...client, orders: ordersIds });
          await newClient.save();
          return newClient._id;
        })
      );
      town.clients = clientsIds;
      await TownModel.findByIdAndUpdate(town._id, { clients: clientsIds });
    });
    const userUpdated = await UserModel.findByIdAndUpdate(userData._id, {
      route_id: routeId,
      currentTurn: turnId,
    });
    res.status(200).send({ message: "Updated successfuly", user: userUpdated });
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};
