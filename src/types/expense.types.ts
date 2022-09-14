import { Model, Schema } from "mongoose";
export interface ExpenseSchemaInterface {
  type: [string, string, string, string];
  date: Date;
  amount: number;
}

export interface ExpenseDocumentInterface
  extends ExpenseSchemaInterface,
    Document {}

export interface ExpenseModelInterface
  extends Model<ExpenseDocumentInterface> {}
