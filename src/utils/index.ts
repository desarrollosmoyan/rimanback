import { OrderSchemaInterface } from "../types/order.types";
import { TurnDocumentInterface } from "../types/turn.types";
import TurnModel from "../models/Turn.model";
import { ObjectId } from "mongoose";
import { UserSchemaInterface } from "../types/user.types";
export const isEmpty = (obj: any) => {
  return Object.keys(obj).length === 0;
};

export const addUncompletedTurns = async (prevTurn: any, newTurn: any) => {
  console.log({ prevTurn: prevTurn.orders });
  if (prevTurn.orders) {
    const unpayedOrders = prevTurn.orders.filter(
      (order: OrderSchemaInterface) => {
        const totalPayed = order.payments.reduce((p: any, c: any) => {
          return p + c.amount;
        }, 0);
        if (order.total - totalPayed !== 0) {
          order.total = order.total - totalPayed;
          order.payments = [];
          return true;
        }
        return false;
      }
    );
    newTurn.orders = [...unpayedOrders];
  }
};
