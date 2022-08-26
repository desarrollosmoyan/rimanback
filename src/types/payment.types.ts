import { Model } from "mongoose";
export interface PaymentSchemaInterface {
  paymentMethod:
    | "efectivo"
    | "nequi-personal"
    | "nequi-empresa"
    | "bancolombia-personal"
    | "bancolombia-empresa";
  amount: number;
}

export interface PaymentDocumentInterface
  extends PaymentSchemaInterface,
    Document {}

export interface PaymentModelInterface
  extends Model<PaymentDocumentInterface> {}
