import { Request, Response } from "express";
import { isEmpty } from "../utils";
import PaymentModel from "../models/Payment.model";
import OrderModel from "../models/Order.model";
export const createPayment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (isEmpty(req.body)) {
      return res.json(400).send({ message: "Body is empty" });
    }
    const currentOrder = await OrderModel.findById(id);
    if (!currentOrder) {
      return res.status(404).send({ message: "Can't find order" });
    }
    const newPayment = new PaymentModel(req.body);
    currentOrder.payments = [...currentOrder.payments, newPayment];
    await currentOrder.save();
  } catch (error) {
    res.status(404).send({ message: "error" });
  }
};

export const getAllPayments = async (req: Request, res: Response) => {};
