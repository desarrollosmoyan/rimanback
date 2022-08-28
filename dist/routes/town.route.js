"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const town_controller_1 = require("../controllers/town.controller");
const townRouter = (0, express_1.Router)();
townRouter.post("/:id", town_controller_1.createTown);
exports.default = townRouter;
