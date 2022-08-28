import { Model, Mongoose, Schema, Types } from "mongoose";
import { RouteSchemaInterface } from "./route.types";
export interface UserSchemaInterface {
  email: string;
  password: string;
  route: Types.ObjectId | undefined;
  currentTurn: Types.ObjectId | undefined;
}

export interface UserDocumentInterface extends UserSchemaInterface, Document {}

export interface UserModelInterface extends Model<UserDocumentInterface> {
  comparePassword: (
    password: string,
    receivedPassword: string
  ) => Promise<boolean>;
}
