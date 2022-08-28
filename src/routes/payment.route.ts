import { Router } from "express";
import { createPayment } from "../controllers/payment.controller";
const paymentRouter = Router();

paymentRouter.post("/:id", createPayment);
