import { Model, Schema } from "mongoose";
import { OrderDocumentInterface } from "./order.types";
export interface ClientSchemaInterface {
  name: string;
  cellphone: string;
  nit: string;
  email: string;
  bill: string;
  orders: OrderDocumentInterface[] | null;
  //createdBy: Schema.Types.ObjectId;
}

export interface ClientDocumentInterface
  extends ClientSchemaInterface,
    Document {}

export interface ClientModelInterface extends Model<ClientDocumentInterface> {}
