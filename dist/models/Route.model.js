"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeSchema = void 0;
const mongoose_1 = require("mongoose");
exports.routeSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    towns: [{ type: mongoose_1.Types.ObjectId, required: true, ref: "town" }],
    user_id: { type: mongoose_1.Types.ObjectId, ref: "user" },
});
exports.default = (0, mongoose_1.model)("route", exports.routeSchema);
