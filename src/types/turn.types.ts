import { UserDocumentInterface } from "./user.types";
import { Model, Types } from "mongoose";
import { OrderSchemaInterface } from "./order.types";
import { ExpenseSchemaInterface } from "./expense.types";
export interface TurnSchemaInterface {
  turn_id: number;
  startDate: Date;
  endDate: Date;
  user: Types.ObjectId | undefined;
  orders: OrderSchemaInterface[];
  expenses: ExpenseSchemaInterface[];
  hasEnded: boolean;
}
export interface TurnDocumentInterface extends TurnSchemaInterface, Document {}

export interface TurnModelInterface extends Model<TurnDocumentInterface> {}
