"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Route_model_1 = require("./Route.model");
const userSchema = new mongoose_1.Schema({
    password: { type: String, required: true },
    email: { type: String, required: true },
    route: Route_model_1.routeSchema,
});
userSchema.statics.comparePassword = (password, receivedPassword) => {
    return password === receivedPassword ? true : false;
};
exports.default = (0, mongoose_1.model)("user", userSchema);
