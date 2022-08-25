import { Schema } from "mongoose";
import { PaymentDocumentInterface } from "../types/payment.types";

const paymentSchema = new Schema<PaymentDocumentInterface>({});
