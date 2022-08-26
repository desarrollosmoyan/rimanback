import { Schema, model } from "mongoose";
import {
  ClientDocumentInterface,
  ClientModelInterface,
} from "../types/client.types";
import { orderSchema } from "./Order.model";

export const clientSchema = new Schema<ClientDocumentInterface>({
  name: { type: String, required: true },
  cellphone: { type: String, required: true },
  nit: { type: String, required: true },
  bill: { type: String, required: true },
  email: {
    type: String,
  },
  orders: [orderSchema],
  /*createdBy: {
    type: Schema.Types.ObjectId,
    required: true,
  },*/
});

export default model<ClientDocumentInterface, ClientModelInterface>(
  "client",
  clientSchema
);
