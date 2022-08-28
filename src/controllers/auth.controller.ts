import { Request, Response } from "express";
import UserModel from "../models/User.model";
export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const newUser = new UserModel({
      email,
      password,
    });
    console.log(newUser);
    await newUser.save();
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
      return res.json(401).send({
        message: "User not found",
      });
    }
    const hasPasswordMatched = UserModel.comparePassword(
      password,
      userFound.password
    );

    if (!hasPasswordMatched) {
      return res.status(401).json({ message: "Invalid password" });
    }
    return res.status(200).send({ user: userFound });
  } catch (error: any) {
    return res.status(400).json({ message: error });
  }
};
