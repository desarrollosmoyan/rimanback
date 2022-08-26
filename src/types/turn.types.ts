import { UserDocumentInterface } from "./user.types";
import { Model } from "mongoose";
export interface TurnSchemaInterface {
  startDate: Date;
  endDate: Date;
  user: UserDocumentInterface;
}
export interface TurnDocumentInterface extends TurnSchemaInterface, Document {}

export interface TurnModelInterface extends Model<TurnDocumentInterface> {}
