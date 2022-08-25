"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const express_1 = require("express");
const orders_controller_1 = require("../controllers/orders.controller");
exports.orderRouter = (0, express_1.Router)();
exports.orderRouter.post("/:id", orders_controller_1.createOrder);
exports.orderRouter.get("/:id", orders_controller_1.getAllOrders);
