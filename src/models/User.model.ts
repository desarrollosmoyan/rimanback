import { Schema, model, Types } from "mongoose";
import { UserDocumentInterface, UserModelInterface } from "../types/user.types";
import { routeSchema } from "./Route.model";

export const userSchema = new Schema<UserDocumentInterface>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  route: { type: Types.ObjectId, ref: "route" },
  currentTurn: { type: Types.ObjectId, ref: "turn" },
});
userSchema.statics.comparePassword = (
  password: string,
  receivedPassword: string
) => {
  return password === receivedPassword ? true : false;
};
export default model<UserDocumentInterface, UserModelInterface>(
  "user",
  userSchema
);
