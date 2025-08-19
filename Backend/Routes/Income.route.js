import { Router } from "express";
import { DeleteIncome, GetAllIncome, PostIncome } from "../Controllers/Income.controlller.js";
export const IncomeRoute = Router();
IncomeRoute.post("/Income",PostIncome);
IncomeRoute.get("/GetAllIncomeData/:UserId",GetAllIncome);
IncomeRoute.delete("/DeleteIncome/:id",DeleteIncome)


