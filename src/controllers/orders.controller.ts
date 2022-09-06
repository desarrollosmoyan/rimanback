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
        console.log(userId);
        const currentTurn = await TurnModel.findOne({
          user: userId,
          hasEnded: false,
        });
        if (!currentTurn) {
          return res.status(404).send({ message: "Not Found Turn!" });
        }
        console.log(currentTurn);
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

export const updateOneOrder = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.id;
    const newOrderInfo = req.body;
    if (isEmpty(newOrderInfo)) {
      return res.status(400).json({ message: "Request body is empty" });
    }
    const orderUpdated = await OrderModel.findByIdAndUpdate(
      orderId,
      newOrderInfo
    );
    if (!orderUpdated) {
      return res.status(404).json({ message: "Order not founded" });
    }
    res.status(200).json({
      message: "Orden modificada exitosamente",
      order: {
        orderUpdated,
      },
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message, error: error });
  }
};

export const deleteOneOrder = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Id it isnt here" });
    }
    const deletedDocument = await OrderModel.findByIdAndDelete(id);
    if (!deletedDocument) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Pedido eliminado correctamente" });
  } catch (error: any) {
    res.status(200).json({ message: error.message, error: error });
  }
};
