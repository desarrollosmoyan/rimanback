"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderSchema = void 0;
const mongoose_1 = require("mongoose");
exports.orderSchema = new mongoose_1.Schema({
    order_id: { type: Number, required: true, unique: true },
    quantity: { type: Number, required: true },
    valuePerOne: { type: Number, required: true },
    total: { type: Number, required: true },
    date: { type: Date, required: true },
});
