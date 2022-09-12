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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUncompletedTurns = exports.isEmpty = void 0;
const Order_model_1 = __importDefault(require("../models/Order.model"));
const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
};
exports.isEmpty = isEmpty;
const addUncompletedTurns = (prevTurn, newTurn) => __awaiter(void 0, void 0, void 0, function* () {
    //console.log({ prevTurn: prevTurn.orders });
    if (prevTurn.orders) {
        const unpayedOrders = prevTurn.orders.filter((order) => __awaiter(void 0, void 0, void 0, function* () {
            const totalPayed = order.payments.reduce((p, c) => {
                return p + c.amount;
            }, 0);
            if (order.total - totalPayed !== 0) {
                order.total = order.total - totalPayed;
                order.quantity = 0;
                order.payments = [];
                order.turn_id = newTurn._id;
                Order_model_1.default.findById(order._id, {
                    turn_id: order.turn_id,
                }, (err, model) => {
                    if (model) {
                        model.save();
                    }
                });
                return true;
            }
            return false;
        }));
        newTurn.orders = [...unpayedOrders];
    }
});
exports.addUncompletedTurns = addUncompletedTurns;
