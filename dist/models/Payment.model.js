"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentSchema = void 0;
const mongoose_1 = require("mongoose");
exports.paymentSchema = new mongoose_1.Schema({
    paymentMethod: { type: String, required: true },
    amount: { type: Number, required: true },
});
exports.default = (0, mongoose_1.model)("payment", exports.paymentSchema);
