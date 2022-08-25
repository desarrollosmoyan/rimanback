import { Schema, model } from "mongoose";
import { ClientDocumentInterface } from "../types/client.types";
import { orderSchema } from "./Order.model";

export const clientSchema = new Schema<ClientDocumentInterface>({
  name: { type: String, required: true },
  cellphone: { type: String, required: true },
  nit: { type: String, required: true },
  bill: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  orders: [orderSchema],
});

export default model("client", clientSchema);
