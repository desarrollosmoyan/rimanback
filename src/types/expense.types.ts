import { Model, Schema } from "mongoose";
export interface ExpenseSchemaInterface {
  type: [string, string, string, string];
  date: Date;
}

export interface ExpenseDocumentInterface
  extends ExpenseSchemaInterface,
    Document {}

export interface ExpenseModelInterface
  extends Model<ExpenseDocumentInterface> {}
