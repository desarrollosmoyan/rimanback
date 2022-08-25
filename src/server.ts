require("dotenv").config();
import express, { Request, Response } from "express";
import connectDB from "./utils/connectDB";
import routers from "./routes/index";
import authRouter from "./routes/auth.route";
import clientRouter from "./routes/client.route";
const server = express();
const port = process.env.PORT || 5000;

connectDB();
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use("/auth", authRouter);
server.use("/client", clientRouter);

server.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
