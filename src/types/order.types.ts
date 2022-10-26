import { Date, Model, Types } from "mongoose";
import { ClientSchemaInterface } from "./client.types";
import {
  PaymentDocumentInterface,
  PaymentSchemaInterface,
} from "./payment.types";

export interface OrderSchemaInterface {
  _id: Types.ObjectId;
  quantity: number;
  valuePerOne: number;
  total: number;
  date: Date;
  payments: PaymentSchemaInterface[];
  client: ClientSchemaInterface;
  turn_id: Types.ObjectId | undefined;
}

export interface OrderDocumentInterface
  extends OrderSchemaInterface,
    Document {}

export interface OrderModelInterface extends Model<OrderDocumentInterface> {}
