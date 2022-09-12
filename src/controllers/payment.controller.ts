import { Request, Response } from "express";
import { isEmpty } from "../utils";
import PaymentModel from "../models/Payment.model";
import OrderModel from "../models/Order.model";
import TurnModel from "../models/Turn.model";
export const createPayment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (isEmpty(req.body)) {
      return res.json(400).send({ message: "Por favor, rellene los campos" });
    }
    const currentOrder = await OrderModel.findById(id);
    if (!currentOrder) {
      return res.status(404).send({ message: "Can't find order" });
    }
    const newPayment = new PaymentModel(req.body);
    currentOrder.payments = [...currentOrder.payments, newPayment];
    const currentTurn = await TurnModel.findById(currentOrder._id);
    if (!currentTurn) {
      return res.status(404).json({ message: "Turn not found" });
    }
    const orders = currentTurn.orders.filter((order) => {
      if (order._id === currentOrder._id) {
        return false;
      }
      return true;
    });
    currentTurn.orders = [...orders, currentOrder];
    currentTurn.save();
    await currentOrder.save();
    res.status(200).send({
      message: "Pago creado exitosamente",
      payment: {
        newPayment,
      },
    });
  } catch (error) {
    res.status(404).send({ message: "error" });
  }
};

export const getAllPayments = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({ message: "Ingresa un ID válido" });
    }

    const order = await OrderModel.findById(id);
    if (!order) {
      return res.status(400).send({ message: "No se encuentra el pedido" });
    }
    const listOfPayments = order.payments;
    return res.status(200).send({ payments: listOfPayments });
  } catch (err) {
    res.status(400).send({ message: "Error" });
  }
};
