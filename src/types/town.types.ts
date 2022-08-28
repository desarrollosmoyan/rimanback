import { Model, Types } from "mongoose";
import { ClientDocumentInterface } from "./client.types";

export interface TownSchemaInterface {
  name: string;
  clients: Types.ObjectId[];
  route_id: Types.ObjectId | undefined;
}

export interface TownDocumentInterface extends TownSchemaInterface, Document {}

export interface TownModelInterface extends Model<TownDocumentInterface> {}
