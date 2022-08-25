import { model, Schema } from "mongoose";
import {
  OrderDocumentInterface,
  OrderModelInterface,
} from "../types/order.types";

export const orderSchema = new Schema<OrderDocumentInterface>({
  order_id: { type: Number, required: true, unique: true },
  quantity: { type: Number, required: true },
  valuePerOne: { type: Number, required: true },
  total: { type: Number, required: true },
  date: { type: Date, required: true },
});

export default model<OrderDocumentInterface, OrderModelInterface>(
  "order",
  orderSchema
);
