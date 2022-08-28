"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route_controller_1 = require("../controllers/route.controller");
const routeRouter = (0, express_1.Router)();
routeRouter.post("/:id", route_controller_1.createRoute);
routeRouter.put("/:id", route_controller_1.updateRoute);
exports.default = routeRouter;
