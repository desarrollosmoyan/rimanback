import { Router } from "express";
import {
  createExpense,
  getExpense,
  updateExpense,
} from "../controllers/expense.controller";
const expenseRouter = Router();

expenseRouter.post("/:id", createExpense);
expenseRouter.put("/:turnID/:expenseID", updateExpense);

export default expenseRouter;
