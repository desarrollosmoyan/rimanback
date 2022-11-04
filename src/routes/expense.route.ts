import { Router } from "express";
import { createExpense, getExpense } from "../controllers/expense.controller";
const expenseRouter = Router();

expenseRouter.post("/:id", createExpense);
expenseRouter.get("/:turnID/:expenseID", getExpense);

export default expenseRouter;
