import { Schema, model } from "mongoose";
import { UserDocumentInterface, UserModelInterface } from "../types/user.types";
import { routeSchema } from "./Route.model";

const userSchema = new Schema<UserDocumentInterface>({
  password: { type: String, required: true },
  email: { type: String, required: true },
  route: routeSchema,
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
