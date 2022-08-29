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
exports.getAllOrders = exports.createOrder = void 0;
const Client_model_1 = __importDefault(require("../models/Client.model"));
const Order_model_1 = __importDefault(require("../models/Order.model"));
const utils_1 = require("../utils");
const Payment_model_1 = __importDefault(require("../models/Payment.model"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const orderData = req.body;
        if ((0, utils_1.isEmpty)(orderData) || !id) {
            return res.status(401).send({ message: "Rellene los campos" });
        }
        const currentClient = yield Client_model_1.default.findById(id);
        if (!currentClient) {
            return res.status(401).send({ message: "Client no encontrado" });
        }
        const date = Date.now();
        const newOrder = new Order_model_1.default(Object.assign(Object.assign({}, orderData), { date: date }));
        if (orderData.payment) {
            const newPayment = new Payment_model_1.default(orderData.payment);
            newOrder.payments = [newPayment];
        }
        yield newOrder.save();
        if (currentClient.orders) {
            currentClient.orders = [...currentClient.orders, newOrder._id];
            yield currentClient.save();
            return res
                .status(200)
                .send({ message: "Pedido creado exitosamente", order: newOrder });
        }
    }
    catch (error) {
        res.status(400).send({ message: "Error" });
        console.log(error);
    }
});
exports.createOrder = createOrder;
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const client = yield Client_model_1.default.findById(id);
        if (!client) {
            return res.status(401).send({ message: "Cliente no encontrado" });
        }
        const clientOrders = yield client.populate({
            path: "orders",
        });
        res.status(200).send({ orders: clientOrders.orders });
    }
    catch (error) {
        res.status(400).send({ message: "error" });
    }
});
exports.getAllOrders = getAllOrders;
