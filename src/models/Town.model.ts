import { Schema } from "mongoose";
import { TownDocumentInterface } from "../types/town.types";
import { clientSchema } from "./Client.model";

export const townSchema = new Schema<TownDocumentInterface>({
  name: { type: String, required: true },
  clients: [clientSchema],
});
