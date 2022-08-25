"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const expenseSchema = new mongoose_1.Schema({
    type: {
        type: [String],
        enum: [
            "Almuerzo",
            "Desayuno",
            "Comidas",
            "A.C.P.M",
            "Peajes",
            "Hotel y Parqueadero",
            "Gastos Varios",
            "Scouth",
            "Vinipel",
            "Refrigerante",
            "Otro",
        ],
    },
    date: { type: Date, required: true },
});
exports.default = (0, mongoose_1.model)("expense", expenseSchema);
