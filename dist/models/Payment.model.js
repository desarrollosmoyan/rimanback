"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const paymentSchema = new mongoose_1.Schema({
    paymentMethod: { type: String, required: true },
    amount: { type: Number, required: true },
});
