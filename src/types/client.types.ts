import { Model, Schema } from "mongoose";
export interface ClientSchemaInterface {
  name: string;
  cellphone: string;
  nit: string;
  email: string;
  bill: string;
  orders: [] | null;
  //createdBy: Schema.Types.ObjectId;
}

export interface ClientDocumentInterface
  extends ClientSchemaInterface,
    Document {}

export interface ClientModelInterface extends Model<ClientDocumentInterface> {}
