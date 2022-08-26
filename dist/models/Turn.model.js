"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const User_model_1 = require("./User.model");
const turnSchema = new mongoose_1.Schema({
    endDate: { type: Date, required: true },
    startDate: { type: Date, required: true },
    user: User_model_1.userSchema,
});
exports.default = (0, mongoose_1.model)("turn", turnSchema);
