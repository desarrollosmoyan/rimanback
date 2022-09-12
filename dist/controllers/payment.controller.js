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
exports.getAllPayments = exports.createPayment = void 0;
const utils_1 = require("../utils");
const Payment_model_1 = __importDefault(require("../models/Payment.model"));
const Order_model_1 = __importDefault(require("../models/Order.model"));
const Turn_model_1 = __importDefault(require("../models/Turn.model"));
const createPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if ((0, utils_1.isEmpty)(req.body)) {
            return res.json(400).send({ message: "Por favor, rellene los campos" });
        }
        const currentOrder = yield Order_model_1.default.findById(id);
        if (!currentOrder) {
            return res.status(404).send({ message: "Can't find order" });
        }
        const newPayment = new Payment_model_1.default(req.body);
        currentOrder.payments = [...currentOrder.payments, newPayment];
        const currentTurn = yield Turn_model_1.default.findById(currentOrder.turn_id);
        console.log(currentTurn);
        if (!currentTurn) {
            return res.status(404).json({ message: "Turn not found" });
        }
        currentTurn.orders = [
            ...currentTurn.orders.map((order) => {
                console.log(order._id.toString() === currentOrder._id.toString());
                return order._id.toString() === currentOrder._id.toString()
                    ? currentOrder
                    : order;
            }),
        ];
        console.log(currentTurn.orders);
        yield currentTurn.save();
        yield currentOrder.save();
        res.status(200).send({
            message: "Pago creado exitosamente",
            payment: {
                newPayment,
            },
        });
    }
    catch (error) {
        res.status(404).send({ message: "error" });
    }
});
exports.createPayment = createPayment;
const getAllPayments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).send({ message: "Ingresa un ID vÃ¡lido" });
        }
        const order = yield Order_model_1.default.findById(id);
        if (!order) {
            return res.status(400).send({ message: "No se encuentra el pedido" });
        }
        const listOfPayments = order.payments;
        return res.status(200).send({ payments: listOfPayments });
    }
    catch (err) {
        res.status(400).send({ message: "Error" });
    }
});
exports.getAllPayments = getAllPayments;
