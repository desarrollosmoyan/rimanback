import { model, Schema, Types } from "mongoose";
import { OrderSchemaInterface } from "../types/order.types";
import { TurnDocumentInterface, TurnModelInterface } from "../types/turn.types";
import { orderSchema } from "./Order.model";
import { expenseSchema } from "./Expense.model";
import { paymentSchema } from "./Payment.model";
import { PaymentSchemaInterface } from "../types/payment.types";

const turnSchema = new Schema<TurnDocumentInterface>({
  turn_id: { type: Number },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  orders: [orderSchema],
  user: { type: Types.ObjectId, required: true, ref: "user" },
  expenses: [expenseSchema],
  hasEnded: { type: Boolean, default: false, required: true },
});

const TurnModel = model<TurnDocumentInterface, TurnModelInterface>(
  "turn",
  turnSchema
);
export default TurnModel;
