import { Request, Response } from "express";
import ClientModel from "../models/Client.model";
import OrderModel from "../models/Order.model";
import { isEmpty } from "../utils";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const orderData = req.body;
    if (isEmpty(orderData) || !id) {
      return res.status(401).send({ message: "Can't create a order" });
    }
    const currentClient = await ClientModel.findById(id);

    if (!currentClient) {
      return res.status(401).send({ message: "Client not found" });
    }
    const orderId = (await OrderModel.find({}).exec()).length + 1;
    const date = Date.now();

    const newOrder = new OrderModel({
      ...orderData,
      order_id: orderId,
      date: date,
    });
    await newOrder.save();
    if (currentClient.orders) {
      currentClient.orders = [...currentClient.orders, newOrder];
      await currentClient.save();
      return res
        .status(200)
        .send({ message: "Order created successfuly", order: newOrder });
    }
    currentClient.orders = [
      new OrderModel({ ...orderData, date: date, order_id: orderId }),
    ];
    await currentClient.save();
    res
      .status(200)
      .send({ message: "Order created successfuly", order: newOrder });
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
      return res.status(401).send({ message: "Client not found" });
    }
    res.status(200).send(client.orders);
  } catch (error) {
    res.status(400).send({ message: "error" });
  }
};
