import { Router } from "express";
import { createExpense } from "../controllers/expense.controller";
const expenseRouter = Router();

expenseRouter.post("/:id", createExpense);

export default expenseRouter;
