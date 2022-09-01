import { Request, Response } from "express";
import ClientModel from "../models/Client.model";
import OrderModel from "../models/Order.model";
import { isEmpty } from "../utils";
import PaymentModel from "../models/Payment.model";
import UserModel from "../models/User.model";
import TurnModel from "../models/Turn.model";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const orderData = req.body;
    if (isEmpty(orderData) || !id) {
      return res.status(401).send({ message: "Rellene los campos" });
    }
    const currentClient = await ClientModel.findById(id);

    if (!currentClient) {
      return res.status(401).send({ message: "Client no encontrado" });
    }

    const date = Date.now();

    const newOrder = new OrderModel({
      ...orderData,
      date: date,
      total: orderData.quantity * orderData.valuePerOne,
    });
    if (orderData.payment) {
      const newPayment = new PaymentModel(orderData.payment);
      newOrder.payments = [newPayment];
    }
    await newOrder.save();
    if (currentClient.orders) {
      currentClient.orders = [...currentClient.orders, newOrder._id];
      await currentClient.save();

      const populatedClient: any = await currentClient.populate({
        path: "town_id",
        populate: {
          path: "route_id",
          populate: {
            path: "user_id",
          },
        },
      });
      if (populatedClient) {
        const userId: any = populatedClient!.town_id!.route_id!.user_id!
          .id as any;
        const currentTurn = await TurnModel.findOne({ user_id: userId });
        if (!currentTurn) {
          return res.status(404).send({ message: "Not Found Turn!" });
        }
        currentTurn.orders = [...currentTurn.orders, newOrder];
        await currentTurn.save();
      }

      return res
        .status(200)
        .send({ message: "Pedido creado exitosamente", order: newOrder });
    }
  } catch (error) {
    res.status(400).send({ message: "Error" });
  }
};

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const client = await ClientModel.findById(id);
    if (!client) {
      return res.status(401).send({ message: "Cliente no encontrado" });
    }
    const clientOrders = await client.populate({
      path: "orders",
    });
    res.status(200).send({ orders: clientOrders.orders });
  } catch (error) {
    res.status(400).send({ message: "error" });
  }
};
