import { Schema, model, Types } from "mongoose";
import {
  ClientDocumentInterface,
  ClientModelInterface,
} from "../types/client.types";

export const clientSchema = new Schema<ClientDocumentInterface>({
  name: { type: String, required: true },
  cellphone: { type: String, required: true, default: "0" },
  nit: { type: String, required: true, default: "0" },
  bill: { type: Boolean, required: true, default: false },
  email: {
    type: String,
  },
  orders: [{ type: Types.ObjectId, require: true, ref: "order", default: [] }],
  town_id: { type: Types.ObjectId, ref: "town", required: true },
  //
});

export default model<ClientDocumentInterface, ClientModelInterface>(
  "client",
  clientSchema
);
