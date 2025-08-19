import mongoose from "mongoose";
// Icon,IncomeSource,Amount,date
const MyShcema = new mongoose.Schema(
  {
    UserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    Icon: {
      type: String,
    },
AmountType:{
  type:String,
  default:"expense",
},
  Time:{
   type:Number,
  default: Date.now() + 24 * 60 * 60 * 1000,
   

    },
    
    expensesource: {
      type: String,
    },
    Amount: {
      type: String,
    },
    date: {
      type: String,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

export const ExpenseModel = mongoose.model("expenses", MyShcema);
