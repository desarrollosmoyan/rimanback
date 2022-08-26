"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const expenseSchema = new mongoose_1.Schema({
    type: {
        type: [String],
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
    date: { type: Date, required: true },
});
exports.default = (0, mongoose_1.model)("expense", expenseSchema);
