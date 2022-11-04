"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const expense_controller_1 = require("../controllers/expense.controller");
const expenseRouter = (0, express_1.Router)();
expenseRouter.post("/:id", expense_controller_1.createExpense);
expenseRouter.put("/:turnID/:expenseID", expense_controller_1.updateExpense);
exports.default = expenseRouter;
