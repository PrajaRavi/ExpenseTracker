import { ExpenseModel } from "../Models/Expense.model.js";

export const PostExpense=async(req,resp,next)=>{
    try {
      let { Icon, IncomeSource, Amount, date,UserId } = req.body;
      let data=await ExpenseModel.insertOne({Icon,expensesource:IncomeSource,Amount,date,UserId})
      console.log(data);
      return resp.send({success:true,msg:"Successfull"})
      
    } catch (error) {
      return resp.send({ success: false, msg: error.message });
    }
  
}

export const GetAllExpenseDate=async (req,resp,next)=>{
  try {
      let data=await ExpenseModel.find({UserId:req.params.UserId});
      return resp.send({success:true,msg:data})
    } catch (error) {
      return resp.send({ success: false, msg: error.message });
    }
}
export const DeleteExpense=async (req,resp,next)=>{
  let data=await ExpenseModel.deleteOne({_id:req.params.id});
  console.log(data);
  return resp.send({success:true,msg:"deleted"})
}