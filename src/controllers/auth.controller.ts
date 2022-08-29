import { Request, Response } from "express";
import UserModel from "../models/User.model";
import TownModel from "../models/Town.model";
import TurnModel from "../models/Turn.model";
import { Error } from "mongoose";
export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
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
    console.log(error);
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
    console.log(error);
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
    console.log(error);
    res.status(400).send({ message: "Error", error: error.message });
  }
};
