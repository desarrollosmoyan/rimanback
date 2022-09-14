import {
  OrderDocumentInterface,
  OrderSchemaInterface,
} from '../types/order.types';
import { TurnDocumentInterface } from '../types/turn.types';
import TurnModel from '../models/Turn.model';
import { ObjectId } from 'mongoose';
import { UserSchemaInterface } from '../types/user.types';
import OrderModel from '../models/Order.model';
export const isEmpty = (obj: any) => {
  return Object.keys(obj).length === 0;
};

export const addUncompletedTurns = async (prevTurn: any, newTurn: any) => {
  //console.log({ prevTurn: prevTurn.orders });
  console.log('entrd');
  if (prevTurn.orders) {
    const unpayedOrders = prevTurn.orders.filter(
      (order: OrderSchemaInterface) => {
        if (order.total !== 0) {
          order.total = order.total;
          order.quantity = 0;
          order.payments = [];
          order.turn_id = newTurn._id;
          return true;
        }
        return false;
      }
    );
    await Promise.all(
      unpayedOrders.map(async (order: OrderDocumentInterface) => {
        await OrderModel.findByIdAndUpdate(order._id, { turn_id: newTurn._id });
      })
    );
    newTurn.orders = [...unpayedOrders];
  }
};
