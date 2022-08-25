"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_controller_1 = require("../controllers/client.controller");
const clientRouter = (0, express_1.Router)();
clientRouter.get("/", client_controller_1.getAllClients);
clientRouter.post("/", client_controller_1.createNewClient);
clientRouter.put("/:id", client_controller_1.updateClient);
exports.default = clientRouter;
