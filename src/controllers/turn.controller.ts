import { Request, Response } from "express";
import TurnModel from "../models/Turn.model";
import { addUncompletedTurns, isEmpty } from "../utils";
import UserModel from "../models/User.model";
import { ObjectId } from "mongoose";

export const endTurn = async (req: Request, res: Response) => {
  const { user, orders } = req.body;
  try {
    const userFounded = await UserModel.findById(user);
    if (!userFounded) {
      return res.status(404).send({ message: "user not found" });
    }
    const turnList = await TurnModel.find({ user: user }).sort({
      endDate: "asc",
    });
    const prevTurn = turnList[0];
    const newTurn = new TurnModel({
      ...req.body,
      startDate: Date.now(),
    });
    if (userFounded.currentTurn) {
      userFounded.currentTurn = newTurn._id;
    }
    if (prevTurn) {
      prevTurn.hasEnded = true;
      prevTurn.endDate = new Date(Date.now());
      await addUncompletedTurns(prevTurn, newTurn);
      await prevTurn.save();
    }
    await newTurn.save();
    await userFounded.save();
    res.status(200).send({
      message: "Turn created successfuly",
      turn: {
        newTurn,
      },
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).send({ message: "error", error: error });
  }
};
