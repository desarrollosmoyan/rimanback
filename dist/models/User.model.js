"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
const Route_model_1 = require("./Route.model");
exports.userSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    route: { type: Route_model_1.routeSchema, required: true },
    //expenses: { type: Number },
});
exports.userSchema.statics.comparePassword = (password, receivedPassword) => {
    return password === receivedPassword ? true : false;
};
exports.default = (0, mongoose_1.model)("user", exports.userSchema);
