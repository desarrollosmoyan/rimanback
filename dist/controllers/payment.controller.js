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
const createPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if ((0, utils_1.isEmpty)(req.body)) {
            return res.json(400).send({ message: "Body is empty" });
        }
        const currentOrder = yield Order_model_1.default.findById(id);
        if (!currentOrder) {
            return res.status(404).send({ message: "Can't find order" });
        }
        const newPayment = new Payment_model_1.default(req.body);
        currentOrder.payments = [...currentOrder.payments, newPayment];
        yield currentOrder.save();
    }
    catch (error) {
        res.status(404).send({ message: "error" });
    }
});
exports.createPayment = createPayment;
const getAllPayments = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.getAllPayments = getAllPayments;