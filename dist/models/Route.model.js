"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeSchema = void 0;
const mongoose_1 = require("mongoose");
const Town_model_1 = require("./Town.model");
exports.routeSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    towns: [Town_model_1.townSchema],
});
