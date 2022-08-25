import { model, Schema } from "mongoose";
import { TownDocumentInterface, TownModelInterface } from "../types/town.types";
import { clientSchema } from "./Client.model";

export const townSchema = new Schema<TownDocumentInterface>({
  name: { type: String, required: true },
  clients: [clientSchema],
});

export default model<TownDocumentInterface, TownModelInterface>(
  "town",
  townSchema
);
