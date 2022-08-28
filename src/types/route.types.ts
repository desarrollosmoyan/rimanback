import { Model, Types } from "mongoose";
import { TownDocumentInterface } from "./town.types";

export interface RouteSchemaInterface {
  name: string;
  towns: Types.ObjectId[] | undefined;
  user_id: Types.ObjectId | undefined;
}
export interface RouteDocumentInterface
  extends RouteSchemaInterface,
    Document {}

export interface RouteModelInterface extends Model<RouteDocumentInterface> {}
