import { Model } from "mongoose";
import { TownDocumentInterface } from "./town.types";

export interface RouteSchemaInterface {
  name: string;
  towns: TownDocumentInterface[];
}
export interface RouteDocumentInterface
  extends RouteSchemaInterface,
    Document {}

export interface RouteModelInterface extends Model<RouteDocumentInterface> {}
