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
const mongoose_1 = require("mongoose");
const Order_model_1 = require("./Order.model");
const Expense_model_1 = require("./Expense.model");
const turnSchema = new mongoose_1.Schema({
    turn_id: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    orders: [Order_model_1.orderSchema],
    user: { type: mongoose_1.Types.ObjectId, required: true, ref: "user" },
    expenses: [Expense_model_1.expenseSchema],
});
turnSchema.pre("save", function (next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const doc = this;
        const modelList = yield TurnModel.find({ user: (_a = this.user) === null || _a === void 0 ? void 0 : _a._id }).sort({
            endDate: "desc",
        });
        const previousTurn = modelList[0];
        doc.turn_id = previousTurn.turn_id + 1;
        console.log(doc.turn_id);
        if (previousTurn.orders) {
            const unpayedOrders = previousTurn.orders.filter((order) => {
                const totalPayed = order.payments.reduce((p, c) => {
                    console.log({ p, c: c.amount });
                    return p + c.amount;
                }, 0);
                console.log(totalPayed);
                if (order.total - totalPayed !== 0) {
                    order.total = order.total - totalPayed;
                    order.payments = [];
                    return true;
                }
                return false;
            });
            previousTurn.endDate = new Date(Date.now());
            previousTurn.save();
            doc.orders = [...unpayedOrders];
            doc.startDate = new Date(Date.now());
            next();
        }
    });
});
const TurnModel = (0, mongoose_1.model)("turn", turnSchema);
exports.default = TurnModel;
