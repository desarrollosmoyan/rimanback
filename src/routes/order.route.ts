import { Router } from "express";
import { createOrder, getAllOrders } from "../controllers/orders.controller";
export const orderRouter = Router();

orderRouter.post("/:id", createOrder);
orderRouter.get("/:id", getAllOrders);
