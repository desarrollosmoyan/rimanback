import { Schema } from "mongoose";
import { OrderDocumentInterface } from "../types/order.types";

export const orderSchema = new Schema<OrderDocumentInterface>({
  order_id: { type: Number, required: true, unique: true },
  quantity: { type: Number, required: true },
  valuePerOne: { type: Number, required: true },
  total: { type: Number, required: true },
  date: { type: Date, required: true },
});
