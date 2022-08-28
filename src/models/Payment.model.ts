import { Schema, model } from "mongoose";
import {
  PaymentDocumentInterface,
  PaymentModelInterface,
} from "../types/payment.types";

export const paymentSchema = new Schema<PaymentDocumentInterface>({
  paymentMethod: { type: String, required: true },
  amount: { type: Number, required: true },
});

export default model<PaymentDocumentInterface, PaymentModelInterface>(
  "payment",
  paymentSchema
);
