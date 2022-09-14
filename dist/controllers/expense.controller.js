"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExpense = void 0;
const Expense_model_1 = __importDefault(require("../models/Expense.model"));
const Turn_model_1 = __importDefault(require("../models/Turn.model"));
const utils_1 = require("../utils");
const createExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if ((0, utils_1.isEmpty)(req.body)) {
            return res.status(400).send({ message: "Por favor, rellene los campos" });
        }
        const currentTurn = yield Turn_model_1.default.findById(id);
        if (!currentTurn) {
            return res.status(404).send({ message: "Turno no encontrado" });
        }
        const newExpense = new Expense_model_1.default(req.body);
        currentTurn.expenses = [...currentTurn.expenses, newExpense];
        yield currentTurn.save();
        res.status(200).send({ message: "Gasto creado con éxito" });
    }
    catch (error) {
        res.status(400).send(error);
    }
});
exports.createExpense = createExpense;
