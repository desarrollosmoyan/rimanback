import { Router } from "express";
import { createOrder, deleteOneOrder, getAllOrders, updateOneOrder } from "../controllers/orders.controller";
export const orderRouter = Router();

orderRouter.post("/:id", createOrder);
orderRouter.get("/:id", getAllOrders);

orderRouter.put("/:id",updateOneOrder)
orderRouter.delete("/:id",deleteOneOrder)