"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.townSchema = void 0;
const mongoose_1 = require("mongoose");
exports.townSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    clients: [{ type: mongoose_1.Types.ObjectId, ref: "client", default: [] }],
    route_id: { type: mongoose_1.Types.ObjectId, ref: "route", required: true },
});
exports.default = (0, mongoose_1.model)("town", exports.townSchema);
