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
exports.deleteOneOrder = exports.updateOneOrder = exports.getAllOrders = exports.createOrder = void 0;
const Client_model_1 = __importDefault(require("../models/Client.model"));
const Order_model_1 = __importDefault(require("../models/Order.model"));
const utils_1 = require("../utils");
const Payment_model_1 = __importDefault(require("../models/Payment.model"));
const Turn_model_1 = __importDefault(require("../models/Turn.model"));
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
        let payment;
        if (orderData.payment) {
            payment = new Payment_model_1.default(orderData.payment);
        }
        const total = payment
            ? orderData.quantity * orderData.valuePerOne - payment.amount
            : orderData.quantity * orderData.valuePerOne;
        const newOrder = new Order_model_1.default(Object.assign(Object.assign({}, orderData), { date: date, total: orderData.quantity * orderData.valuePerOne, client: currentClient, payments: payment ? [payment] : [] }));
        yield newOrder.save();
        if (currentClient.orders) {
            currentClient.orders = [...currentClient.orders, newOrder._id];
            yield currentClient.save();
            const populatedClient = yield currentClient.populate({
                path: "town_id",
                populate: {
                    path: "route_id",
                    populate: {
                        path: "user_id",
                    },
                },
            });
            if (populatedClient) {
                const currentTurn = yield Turn_model_1.default.findById(orderData.turn_id);
                if (!currentTurn) {
                    return res.status(404).send({ message: "Not Found Turn!" });
                }
                console.log({ currentTurn: currentTurn });
                currentTurn.orders = [...currentTurn.orders, newOrder];
                yield currentTurn.save();
            }
            return res
                .status(200)
                .send({ message: "Pedido creado exitosamente", order: newOrder });
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).send({ message: "Error" });
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
const updateOneOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderId = req.params.id;
        const newOrderInfo = req.body;
        if ((0, utils_1.isEmpty)(newOrderInfo)) {
            return res.status(400).json({ message: "Request body is empty" });
        }
        const orderUpdated = yield Order_model_1.default.findByIdAndUpdate(orderId, newOrderInfo);
        if (!orderUpdated) {
            return res.status(404).json({ message: "Order not founded" });
        }
        const currentTurn = yield Turn_model_1.default.findById(orderUpdated.turn_id);
        if (!currentTurn) {
            return res.status(404).json({ message: "Turn not found" });
        }
        const filteredOrders = currentTurn.orders.filter((order) => {
            if (order._id === orderUpdated._id) {
                return false;
            }
            return true;
        });
        currentTurn.orders = [...filteredOrders, orderUpdated];
        yield currentTurn.save();
        res.status(200).json({
            message: "Orden modificada exitosamente",
            order: {
                orderUpdated,
            },
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message, error: error });
    }
});
exports.updateOneOrder = updateOneOrder;
const deleteOneOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ message: "Id it isnt here" });
        }
        const deletedDocument = yield Order_model_1.default.findByIdAndDelete(id);
        if (!deletedDocument) {
            return res.status(404).json({ message: "Order not found" });
        }
        const currentTurn = yield Turn_model_1.default.findById(deletedDocument.turn_id);
        if (!currentTurn) {
            return res.status(404).json({ message: "Turn not found" });
        }
        const ordersCleaned = currentTurn.orders.filter((order) => {
            if (order._id === deletedDocument._id) {
                return false;
            }
            return true;
        });
        currentTurn.orders = [...ordersCleaned];
        yield currentTurn.save();
        res.status(200).json({ message: "Pedido eliminado correctamente" });
    }
    catch (error) {
        res.status(200).json({ message: error.message, error: error });
    }
});
exports.deleteOneOrder = deleteOneOrder;
