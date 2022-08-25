import { model, Schema } from "mongoose";
import { ExpenseDocumentInterface } from "../types/expense.types";

const expenseSchema = new Schema<ExpenseDocumentInterface>({
  type: {
    type: [String],
    enum: [
      "Almuerzo",
      "Desayuno",
      "Comidas",
      "A.C.P.M",
      "Peajes",
      "Hotel y Parqueadero",
      "Gastos Varios",
      "Scouth",
      "Vinipel",
      "Refrigerante",
      "Otro",
    ],
  },
  date: { type: Date, required: true },
});

export default model<ExpenseDocumentInterface, ExpenseDocumentInterface>(
  "expense",
  expenseSchema
);
