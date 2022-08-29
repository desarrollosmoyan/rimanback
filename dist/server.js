"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const connectDB_1 = __importDefault(require("./utils/connectDB"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const client_route_1 = __importDefault(require("./routes/client.route"));
const order_route_1 = require("./routes/order.route");
const route_route_1 = __importDefault(require("./routes/route.route"));
const town_route_1 = __importDefault(require("./routes/town.route"));
const turn_route_1 = __importDefault(require("./routes/turn.route"));
const payment_route_1 = __importDefault(require("./routes/payment.route"));
const expense_route_1 = __importDefault(require("./routes/expense.route"));
const server = (0, express_1.default)();
const port = process.env.PORT || 5000;
(0, connectDB_1.default)();
server.use();
server.use(express_1.default.json());
server.use(express_1.default.urlencoded({ extended: false }));
server.use("/auth", auth_route_1.default);
server.use("/client", client_route_1.default);
server.use("/order", order_route_1.orderRouter);
server.use("/route", route_route_1.default);
server.use("/town", town_route_1.default);
server.use("/turn", turn_route_1.default);
server.use("/expense", expense_route_1.default);
server.use("/payment", payment_route_1.default);
server.listen(port, () => {
    console.log(`Server listening on ${port}`);
});
