"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.townSchema = void 0;
const mongoose_1 = require("mongoose");
const Client_model_1 = require("./Client.model");
exports.townSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    clients: { type: [Client_model_1.clientSchema], index: true, default: [] },
});
exports.default = (0, mongoose_1.model)("town", exports.townSchema);
