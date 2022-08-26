"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientSchema = void 0;
const mongoose_1 = require("mongoose");
const Order_model_1 = require("./Order.model");
exports.clientSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    cellphone: { type: String, required: true },
    nit: { type: String, required: true },
    bill: { type: String, required: true },
    email: {
        type: String,
    },
    orders: [Order_model_1.orderSchema],
    /*createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
    },*/
});
exports.default = (0, mongoose_1.model)("client", exports.clientSchema);
