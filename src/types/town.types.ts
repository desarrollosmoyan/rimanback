import { Model } from "mongoose";
import { ClientDocumentInterface } from "./client.types";

export interface TownSchemaInterface {
  name: string;
  clients: ClientDocumentInterface[];
}

export interface TownDocumentInterface extends TownSchemaInterface, Document {}

export interface TownModelInterface extends Model<TownDocumentInterface> {}
