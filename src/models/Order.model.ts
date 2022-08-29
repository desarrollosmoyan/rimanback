import { model, Schema, Types } from "mongoose";
import {
  OrderDocumentInterface,
  OrderModelInterface,
} from "../types/order.types";
import { clientSchema } from "./Client.model";
import { paymentSchema } from "./Payment.model";

export const orderSchema = new Schema<OrderDocumentInterface>({
  order_id: {
    type: Number,
    required: true,
    default: 0,
  },
  quantity: { type: Number, required: true }, // Pimpinas
  valuePerOne: { type: Number, required: true }, // valor cada una
  total: { type: Number, required: true }, // total
  date: { type: Date, required: true }, // fecha
  payments: { type: [paymentSchema], default: [] }, // payments => bonos
  client: clientSchema, // cliente que realizó el pedido
  turn_id: { type: Types.ObjectId },
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
