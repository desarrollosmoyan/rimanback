"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payment_controller_1 = require("../controllers/payment.controller");
const paymentRouter = (0, express_1.Router)();
paymentRouter.post("/:id", payment_controller_1.createPayment);
paymentRouter.get("/:id", payment_controller_1.getAllPayments);
exports.default = paymentRouter;
