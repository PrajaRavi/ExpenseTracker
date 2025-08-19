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

    IncomeSource: {
      type: String,
    },
    Amount: {
      type: String,
    },
    AmountType:{
  type:String,
  default:"income",
},

    Time:{
   type:Number,
  default: Date.now() + 24 * 60 * 60 * 1000,
   

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

export const IncomeModel = mongoose.model("incomes", MyShcema);
