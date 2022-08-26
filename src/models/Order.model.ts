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

orderSchema.pre("save", function (next) {
  const doc = this;
  OrderModel.findByIdAndUpdate(
    { _id: "entityId" },
    { $inc: { order_id: 1 } },
    (error, orderId) => {
      if (error) {
        return next(error);
      }
      if (doc.order_id && orderId) {
        doc.order_id = orderId.order_id;
      }
    }
  );
});
export default OrderModel;
