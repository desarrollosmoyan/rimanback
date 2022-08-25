"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const expensesSchema = new mongoose_1.Schema({
    type: { type: [String], enum: ["Almuerzo", "Desayuno"] },
});
exports.default = (0, mongoose_1.model)();
