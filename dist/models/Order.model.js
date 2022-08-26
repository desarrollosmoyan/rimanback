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
    return __awaiter(this, void 0, void 0, function* () {
        const doc = this;
        const lastId = (yield OrderModel.find({})).length;
        if (lastId == 0) {
            doc.order_id = 0;
            return next();
        }
        doc.order_id = lastId + 1;
        next();
    });
});
exports.default = OrderModel;
