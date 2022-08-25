import { Model, Schema } from "mongoose";
import { RouteSchemaInterface } from "./route.types";
export interface UserSchemaInterface {
  email: string;
  password: string;
  route: RouteSchemaInterface;
  expenses: number;
}

export interface UserDocumentInterface extends UserSchemaInterface, Document {}

export interface UserModelInterface extends Model<UserDocumentInterface> {
  comparePassword: (
    password: string,
    receivedPassword: string
  ) => Promise<boolean>;
}
