import { model, Schema } from "mongoose";
import {
  ExpenseDocumentInterface,
  ExpenseModelInterface,
} from "../types/expense.types";

export const expenseSchema = new Schema<ExpenseDocumentInterface>({
  type: {
    type: [String],
    default: ["otro"],
    enum: [
      "almuerzo",
      "desayuno",
      "comidas",
      "A.C.P.M",
      "peajes",
      "hotel-y-parqueadero",
      "gastos-varios",
      "scouth",
      "vinipel",
      "refrigerante",
      "otro",
    ],
  },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
});

export default model<ExpenseDocumentInterface, ExpenseModelInterface>(
  "expense",
  expenseSchema
);
