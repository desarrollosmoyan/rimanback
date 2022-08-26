"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderSchema = void 0;
const mongoose_1 = require("mongoose");
exports.orderSchema = new mongoose_1.Schema({
    order_id: {
        type: Number,
        required: true,
        index: true,
        unique: true,
        default: 0,
    },
    quantity: { type: Number, required: true },
    valuePerOne: { type: Number, required: true },
    total: { type: Number, required: true },
    date: { type: Date, required: true },
});
const OrderModel = (0, mongoose_1.model)("order", exports.orderSchema);
exports.orderSchema.pre("save", function (next) {
    const doc = this;
    OrderModel.findByIdAndUpdate({ _id: "entityId" }, { $inc: { order_id: 1 } }, (error, orderId) => {
        if (error) {
            return next(error);
        }
        if (doc.order_id && orderId) {
            doc.order_id = orderId.order_id;
        }
    });
});
exports.default = OrderModel;
