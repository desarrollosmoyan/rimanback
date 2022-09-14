"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expenseSchema = void 0;
const mongoose_1 = require("mongoose");
exports.expenseSchema = new mongoose_1.Schema({
    type: {
        type: [String],
        default: ["otro"],
        enum: [
            "almuerzo",
            "desayuno",
            "comidas",
            "A.C.P.M",
            "peajes",
            "hotel-y-parqueadero",
            "gastos-varios",
            "scouth",
            "vinipel",
            "refrigerante",
            "otro",
        ],
    },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
});
exports.default = (0, mongoose_1.model)("expense", exports.expenseSchema);
