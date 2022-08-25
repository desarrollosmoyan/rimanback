import { Schema, model } from "mongoose";
import {
  ClientDocumentInterface,
  ClientModelInterface,
} from "../types/client.types";
import { orderSchema } from "./Order.model";
import { userSchema } from "./User.model";

export const clientSchema: any = new Schema<ClientDocumentInterface>({
  name: { type: String, required: true },
  cellphone: { type: String, required: true },
  nit: { type: String, required: true, unique: true },
  bill: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
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
