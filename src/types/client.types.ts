import { Model, Schema, Types } from "mongoose";
import { OrderDocumentInterface } from "./order.types";
export interface ClientSchemaInterface {
  name: string;
  cellphone: string;
  nit: string;
  email: string;
  bill: boolean;
  orders: Types.ObjectId[] | undefined;
  town_id: Types.ObjectId | undefined;
  //createdBy: Schema.Types.ObjectId;
}

export interface ClientDocumentInterface
  extends ClientSchemaInterface,
    Document {}

export interface ClientModelInterface extends Model<ClientDocumentInterface> {}
