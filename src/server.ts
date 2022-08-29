require("dotenv").config();
import express, { Request, Response } from "express";
import cors from "cors";
import connectDB from "./utils/connectDB";
import routers from "./routes/index";
import authRouter from "./routes/auth.route";
import clientRouter from "./routes/client.route";
import { orderRouter } from "./routes/order.route";
import routeRouter from "./routes/route.route";
import townRouter from "./routes/town.route";
import turnRouter from "./routes/turn.route";
import paymentRouter from "./routes/payment.route";
import expenseRouter from "./routes/expense.route";
const server = express();
const port = process.env.PORT || 5000;

connectDB();
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use("/auth", authRouter);
server.use("/client", clientRouter);
server.use("/order", orderRouter);
server.use("/route", routeRouter);
server.use("/town", townRouter);
server.use("/turn", turnRouter);
server.use("/expense", expenseRouter);
server.use("/payment", paymentRouter);

server.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
