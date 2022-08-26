import { Model } from "mongoose";

export interface RouteSchemaInterface {
  name: string;
  towns: [];
}
export interface RouteDocumentInterface
  extends RouteSchemaInterface,
    Document {}

export interface RouteModelInterface extends Model<RouteDocumentInterface> {}
