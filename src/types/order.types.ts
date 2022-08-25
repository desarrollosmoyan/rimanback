import { Date } from "mongoose";

export interface OrderSchemaInterface {
  order_id: number;
  quantity: number;
  valuePerOne: number;
  total: number;
  date: Date;
}

export interface OrderDocumentInterface
  extends OrderSchemaInterface,
    Document {}
