import { Router } from "express";
import {
  createPayment,
  getAllPayments,
} from "../controllers/payment.controller";
const paymentRouter = Router();

paymentRouter.post("/:id", createPayment);
paymentRouter.get("/:id", getAllPayments);
export default paymentRouter;
