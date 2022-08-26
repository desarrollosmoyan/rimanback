import { model, Schema } from "mongoose";
import {
  OrderDocumentInterface,
  OrderModelInterface,
} from "../types/order.types";

export const orderSchema = new Schema<OrderDocumentInterface>({
  order_id: {
    type: Number,
    required: true,
    index: true,
    unique: true,
    default: 0,
  },
  quantity: { type: Number, required: true },
  valuePerOne: { type: Number, required: true },
  total: { type: Number, required: true },
  date: { type: Date, required: true },
});

const OrderModel = model<OrderDocumentInterface, OrderModelInterface>(
  "order",
  orderSchema
);

orderSchema.pre("save", async function (next) {
  const doc = this;
  const lastId = (await OrderModel.find({})).length;
  if (lastId == 0) {
    doc.order_id = 0;
    return next();
  }
  doc.order_id = lastId + 1;
  next();
});
export default OrderModel;
