import { Model, ObjectId, Schema } from "mongoose";
export interface ExpenseSchemaInterface {
  type: [string, string, string, string];
  date: Date;
  amount: number;
  _id: ObjectId;
}

export interface ExpenseDocumentInterface
  extends ExpenseSchemaInterface,
    Document {}

export interface ExpenseModelInterface
  extends Model<ExpenseDocumentInterface> {}
