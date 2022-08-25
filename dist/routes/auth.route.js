"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const checkSignup_1 = require("../middlewares/checkSignup");
const authRouter = (0, express_1.Router)();
authRouter.post("/signup", [checkSignup_1.checkExistingUser], auth_controller_1.signup);
authRouter.post("/signin", auth_controller_1.signin);
exports.default = authRouter;
