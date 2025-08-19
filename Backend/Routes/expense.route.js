import { Router } from "express";
import { GetAllExpenseDate, PostExpense,DeleteExpense } from "../Controllers/expense.controller.js";
export const expenseroute = Router();
expenseroute.post("/expense",PostExpense)
expenseroute.get("/GetAllExpenseData/:UserId",GetAllExpenseDate)
expenseroute.delete("/DeleteExpense/:id",DeleteExpense)