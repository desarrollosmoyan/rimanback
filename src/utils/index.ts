import { OrderSchemaInterface } from "../types/order.types";
import { TurnDocumentInterface } from "../types/turn.types";
import TurnModel from "../models/Turn.model";
import { ObjectId } from "mongoose";
export const isEmpty = (obj: any) => {
  return Object.keys(obj).length === 0;
};

export const addUncompletedTurns = async (
  prevTurn: TurnDocumentInterface,
  newTurn: TurnDocumentInterface
) => {
  if (prevTurn.orders && prevTurn.hasEnded) {
    const unpayedOrders = prevTurn.orders.filter(
      (order: OrderSchemaInterface) => {
        const totalPayed = order.payments.reduce((p: any, c: any) => {
          console.log({ p, c: c.amount });
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
