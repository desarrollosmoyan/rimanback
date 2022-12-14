import { Request, Response } from 'express';
import { isEmpty } from '../utils';
import PaymentModel from '../models/Payment.model';
import OrderModel from '../models/Order.model';
import TurnModel from '../models/Turn.model';
import { OrderSchemaInterface } from '../types/order.types';
export const createPayment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (isEmpty(req.body)) {
      return res.json(400).send({ message: 'Por favor, rellene los campos' });
    }
    const currentOrder = await OrderModel.findById(id);
    if (!currentOrder)
      return res.status(404).send({ message: "Can't find order" });
    const newPayment = new PaymentModel(req.body);
    const currentTurn = await TurnModel.findById(currentOrder.turn_id);
    const previousTotal = currentTurn!.orders.find(
      (order) => order._id.toString() === currentOrder._id.toString()
    )!.total;
    if (req.body.amount > previousTotal)
      return res
        .status(400)
        .json({ message: 'No puedes pagar más de lo que se debe' });
    currentOrder.payments = [...currentOrder.payments, newPayment];
    currentOrder.total = previousTotal - newPayment.amount;
    if (!currentTurn) {
      return res.status(404).json({ message: 'Turn not found' });
    }

    currentTurn.orders = [
      ...currentTurn.orders
        .filter((order: OrderSchemaInterface) => {
          if (order.total === 0) return false;
          if (order._id.toString() === currentOrder._id.toString()) {
            order.total = previousTotal - newPayment.amount;
            //          order.quantity = 0;
          }
          //order.payments = [];
          return true;
        })
        .map((order) => {
          if (order._id.toString() === currentOrder._id.toString()) {
            order.payments = [...order.payments, newPayment];

            return order;
          }
          return order;
        }),
    ];
    await currentTurn.save();
    await currentOrder.save();
    res.status(200).send({
      message: 'Pago creado exitosamente',
      payment: {
        newPayment,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: 'error' });
  }
};

export const getAllPayments = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({ message: 'Ingresa un ID vÃ¡lido' });
    }

    const order = await OrderModel.findById(id);
    if (!order) {
      return res.status(400).send({ message: 'No se encuentra el pedido' });
    }
    const listOfPayments = order.payments;
    return res.status(200).send({ payments: listOfPayments });
  } catch (err) {
    res.status(400).send({ message: 'Error' });
  }
};
