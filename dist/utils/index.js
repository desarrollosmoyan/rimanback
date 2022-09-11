"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUncompletedTurns = exports.isEmpty = void 0;
const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
};
exports.isEmpty = isEmpty;
const addUncompletedTurns = (prevTurn, newTurn) => __awaiter(void 0, void 0, void 0, function* () {
    //console.log({ prevTurn: prevTurn.orders });
    if (prevTurn.orders) {
        const unpayedOrders = prevTurn.orders.filter((order) => {
            const totalPayed = order.payments.reduce((p, c) => {
                return p + c.amount;
            }, 0);
            if (order.total - totalPayed !== 0) {
                order.total = order.total - totalPayed;
                order.payments = [];
                order.quantity = 0;
                console.log(order);
                return true;
            }
            return false;
        });
        newTurn.orders = [...unpayedOrders];
        console.log(unpayedOrders);
    }
});
exports.addUncompletedTurns = addUncompletedTurns;
