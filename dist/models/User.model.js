"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
const Route_model_1 = require("./Route.model");
exports.userSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    route: Route_model_1.routeSchema,
    expenses: { type: Number, required: true },
});
exports.userSchema.statics.comparePassword = (password, receivedPassword) => {
    return password === receivedPassword ? true : false;
};
exports.default = (0, mongoose_1.model)("user", exports.userSchema);
