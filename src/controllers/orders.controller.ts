import { Request, Response } from "express";
import ClientModel from "../models/Client.model";
import OrderModel from "../models/Order.model";
import { isEmpty } from "../utils";

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
    });
    await newOrder.save();
    if (currentClient.orders) {
      currentClient.orders = [...currentClient.orders, newOrder._id];
      await currentClient.save();
      return res
        .status(200)
        .send({ message: "Pedido creado exitosamente", order: newOrder });
    }
  } catch (error) {
    res.status(400).send({ message: "Error" });
    console.log(error);
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
