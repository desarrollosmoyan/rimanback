import { Request, Response } from "express";
import ExpenseModel from "../models/Expense.model";
import TurnModel from "../models/Turn.model";
import { isEmpty } from "../utils";
export const createExpense = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (isEmpty(req.body)) {
      return res.status(400).send({ message: "Por favor, rellene los campos" });
    }
    const currentTurn = await TurnModel.findById(id);
    if (!currentTurn) {
      return res.status(404).send({ message: "Turno no encontrado" });
    }
    const newExpense = new ExpenseModel(req.body);
    currentTurn.expenses = [...currentTurn.expenses, newExpense];
    await currentTurn.save();
    res.status(200).send({ message: "Gasto creado con éxito" });
  } catch (error) {
    res.status(400).send(error);
  }
};
export const updateExpense = async (req: Request, res: Response) => {
  try {
    const { turnID, expenseID } = req.params;
    if (isEmpty(req.body)) {
      return res.status(400).send({ message: "Por favor, rellene los campos" });
    }
    const currentTurn = await TurnModel.findById(turnID);
    if (!currentTurn) {
      return res.status(404).send({ message: "Turno no encontrado" });
    }
    const expense = currentTurn.expenses.find(
      (expense: any) => expense._id == expenseID
    );
    if (!expense) {
      return res.status(404).send({ message: "Gasto no encontrado" });
    }
    const newExpense = new ExpenseModel(req.body);
    currentTurn.expenses = [...currentTurn.expenses, newExpense];
    await currentTurn.save();
    res.status(200).send({ message: "Gasto creado con éxito" });
  } catch (error) {
    res.status(400).send(error);
  }
};
export const getExpense = async (req: Request, res: Response) => {
  try {
    const { turnID, expenseID } = req.params;
    if (isEmpty(req.body)) {
      return res.status(400).send({ message: "Por favor, rellene los campos" });
    }
    const currentTurn = await TurnModel.findById(turnID);
    if (!currentTurn) {
      return res.status(404).send({ message: "Turno no encontrado" });
    }
    const expense = currentTurn.expenses.find(
      (expense: any) => expense._id == expenseID
    );
    if (!expense) {
      return res.status(404).send({ message: "Gasto no encontrado" });
    }
    res.status(200).send(expense);
  } catch (error) {
    res.status(400).send(error);
  }
};
