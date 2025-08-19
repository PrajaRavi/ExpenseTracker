import { IncomeModel } from "../Models/Income.model.js";

export const PostIncome = async (req, resp, next) => {
  let { Icon, IncomeSource, Amount, date, UserId } = req.body;
  try {
    let Income = await IncomeModel.insertOne({
      Icon,
      IncomeSource,
      Amount,
      date,
      UserId,
    });
    console.log(Income);
    return resp.send({ success: true, msg: "Successfull" });
  } catch (error) {
    return resp.send({ success: false, msg: error.message });
  }
};

export const GetAllIncome=async (req,resp,next)=>{
  try {
      let data=await IncomeModel.find({UserId:req.params.UserId});
      return resp.send({success:true,msg:data})
    } catch (error) {
      return resp.send({ success: false, msg: error.message });
    }
}
export const DeleteIncome=async (req,resp,next)=>{
  let data=await IncomeModel.deleteOne({_id:req.params.id});
  console.log(data);
  return resp.send({success:true,msg:"deleted"})
}