import { Date, Model, Types } from "mongoose";
import { ClientSchemaInterface } from "./client.types";
import {
  PaymentDocumentInterface,
  PaymentSchemaInterface,
} from "./payment.types";

export interface OrderSchemaInterface {
  order_id: number;
  quantity: number;
  valuePerOne: number;
  total: number;
  date: Date;
  payments: PaymentSchemaInterface[];
  client: ClientSchemaInterface;
}

export interface OrderDocumentInterface
  extends OrderSchemaInterface,
    Document {}

export interface OrderModelInterface extends Model<OrderDocumentInterface> {}
