import { Schema, model } from "mongoose";
import { UserDocumentInterface, UserModelInterface } from "../types/user.types";
import { routeSchema } from "./Route.model";

export const userSchema = new Schema<UserDocumentInterface>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  route: routeSchema,
  expenses: { type: Number, required: true },
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
