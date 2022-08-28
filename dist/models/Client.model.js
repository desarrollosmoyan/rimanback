"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientSchema = void 0;
const mongoose_1 = require("mongoose");
exports.clientSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    cellphone: { type: String, required: true },
    nit: { type: String, required: true, default: "0" },
    bill: { type: String, required: true },
    email: {
        type: String,
    },
    orders: [{ type: mongoose_1.Types.ObjectId, require: true, default: [] }],
    town_id: { type: mongoose_1.Types.ObjectId, ref: "town", required: true },
    //
});
exports.default = (0, mongoose_1.model)("client", exports.clientSchema);
