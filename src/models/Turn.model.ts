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
});

turnSchema.pre("save", async function (next) {
  const doc = this;
  const modelList = await TurnModel.find({ user: this.user?._id }).sort({
    endDate: "desc",
  });
  if (modelList.length == 0) {
    doc.turn_id = 0;
    next();
  }
  const previousTurn = modelList[0];
  doc.turn_id = previousTurn.turn_id + 1;
  if (previousTurn.orders) {
    const unpayedOrders = previousTurn.orders.filter(
      (order: OrderSchemaInterface) => {
        const totalPayed = order.payments.reduce((p: any, c: any) => {
          console.log({ p, c: c.amount });
          return p + c.amount;
        }, 0);
        console.log(totalPayed);
        if (order.total - totalPayed !== 0) {
          order.total = order.total - totalPayed;
          order.payments = [];
          return true;
        }
        return false;
      }
    );
    previousTurn.endDate = new Date(Date.now());
    previousTurn.save();
    doc.orders = [...unpayedOrders];
    doc.startDate = new Date(Date.now());
    next();
  }
});
const TurnModel = model<TurnDocumentInterface, TurnModelInterface>(
  "turn",
  turnSchema
);
export default TurnModel;
