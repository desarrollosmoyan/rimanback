"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Order_model_1 = require("./Order.model");
const Expense_model_1 = require("./Expense.model");
const turnSchema = new mongoose_1.Schema({
    turn_id: { type: Number },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    orders: [Order_model_1.orderSchema],
    user: { type: mongoose_1.Types.ObjectId, required: true, ref: "user" },
    expenses: [Expense_model_1.expenseSchema],
    hasEnded: { type: Boolean, default: false, required: true },
});
const TurnModel = (0, mongoose_1.model)("turn", turnSchema);
exports.default = TurnModel;
