import { Request, Response } from "express";
import TurnModel from "../models/Turn.model";
import { isEmpty } from "../utils";
import UserModel from "../models/User.model";

export const endTurn = async (req: Request, res: Response) => {
  const { user, orders } = req.body;
  try {
    const userFounded = UserModel.findById(user);
    if (!userFounded) {
      return res.status(404).send({ message: "user not found" });
    }
    console.log(req.body);
    const newTurn = new TurnModel({
      ...req.body,
      turn_id: 0,
      startDate: Date.now(),
    });
    await newTurn.save();
    res.status(200).send({
      message: "User created successfuly",
      turn: {
        newTurn,
      },
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).send({ message: "error" });
  }
};
