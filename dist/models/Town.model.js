"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.townSchema = void 0;
const mongoose_1 = require("mongoose");
const Client_model_1 = require("./Client.model");
exports.townSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    clients: [Client_model_1.clientSchema],
});
exports.default = (0, mongoose_1.model)("town", exports.townSchema);
