import { model, Schema } from "mongoose";
import { ExpenseDocumentInterface } from "../types/expense.types";

const expenseSchema = new Schema<ExpenseDocumentInterface>({
  type: {
    type: [String],
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
  date: { type: Date, required: true },
});

export default model<ExpenseDocumentInterface, ExpenseDocumentInterface>(
  "expense",
  expenseSchema
);
