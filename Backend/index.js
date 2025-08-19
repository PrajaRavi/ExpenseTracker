import express from "express";
import cors from "cors";
import { SignUpModal } from "./Models/SignUp_Modal.js";
// import { Model } from 'mongoose'
import { UserRoute } from "./Routes/user.route.js";
import { IncomeRoute } from "./Routes/Income.route.js";
import { expenseroute } from "./Routes/expense.route.js";
import { IncomeModel } from "./Models/Income.model.js";
import { ExpenseModel } from "./Models/Expense.model.js";
// import { sign } from 'jsonwebtoken'

const app = express();
app.use(express.json());

//Registering all the route

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:4200"],
  })
);

app.use("/user", UserRoute);
app.use("/Income", IncomeRoute);
app.use("/expense", expenseroute);

// Api for get all the transaction
app.get("/GetAllTheTransaction",async (req,resp)=>{
  let data1=await IncomeModel.find();
  let data2=await ExpenseModel.find();
  let newdata=[...data1,...data2];
  return resp.send({success:true,msg:newdata})
})

app.get("/GetAllExpenseData/:email", async (req, resp) => {
  try {
    let Data = await SignUpModal.findOne({ email: req.params.email });
    if (!Data) {
      return resp.send({ success: false, msg: "Data Not found" });
    } else {
      return resp.send({
        success: true,
        msg: "Data found",
        Expense: Data.Expense,
      });
    }
  } catch (error) {
    return resp.send({ success: false, msg: error.message });
  }
});
app.get("/GetAllTransaction/:email", async (req, resp) => {
  try {
    let Data = await SignUpModal.findOne({ email: req.params.email });
    if (!Data) {
      return resp.send({ sucess: false, msg: "Data not found" });
    } else {
      // let newarr=[...Data.Income,...Data.Expense]
      return resp.send({ success: true, msg: Data.AllTransaction });
    }
  } catch (error) {
    return resp.send({ sucess: false, msg: error.message });
  }
});
app.post("/SetAllTransaction/:email", async (req, resp) => {
  let { Icon, IncomeSource, Amount, date, AmountType } = req.body;
  try {
    let Data = await SignUpModal.findOneAndUpdate(
      { email: req.params.email },
      {
        $push: {
          AllTransaction: {
            Icon,
            IncomeSource,
            Amount,
            date,
            AmountType,
            Time: Date.now() + 24 * 60 * 60 * 1000,
          },
        },
      }
    );
    return resp.send({ success: true, msg: Data });
  } catch (error) {
    return resp.send({ success: false, msg: error.message });
  }
});
app.listen(5000, () => {
  console.log("server running at port of 5000");
});
