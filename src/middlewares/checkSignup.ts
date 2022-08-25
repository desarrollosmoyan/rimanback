import { Request, Response, NextFunction } from "express";
import UserModel from "../models/User.model";

export const checkExistingUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = await UserModel.findOne({ email: req.body.email });
    if (email) {
      return res.status(400).json({ message: "This email already exists" });
    }
    next();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
