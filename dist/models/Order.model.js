"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderSchema = void 0;
const mongoose_1 = require("mongoose");
const Client_model_1 = require("./Client.model");
const Payment_model_1 = require("./Payment.model");
exports.orderSchema = new mongoose_1.Schema({
    quantity: { type: Number, required: true },
    valuePerOne: { type: Number, required: true },
    total: { type: Number, required: true },
    date: { type: Date, required: true },
    payments: { type: [Payment_model_1.paymentSchema], default: [] },
    client: Client_model_1.clientSchema,
    turn_id: { type: mongoose_1.Types.ObjectId },
});
const OrderModel = (0, mongoose_1.model)("order", exports.orderSchema);
exports.default = OrderModel;
