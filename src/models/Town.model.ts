import { model, Schema, Types } from "mongoose";
import { TownDocumentInterface, TownModelInterface } from "../types/town.types";
import { clientSchema } from "./Client.model";

export const townSchema = new Schema<TownDocumentInterface>({
  name: { type: String, required: true },
  clients: [{ type: Types.ObjectId, ref: "client", default: [] }],
  route_id: { type: Types.ObjectId, ref: "route", required: true },
});

export default model<TownDocumentInterface, TownModelInterface>(
  "town",
  townSchema
);
