import mongoose from "mongoose";
const url = 'mongodb://0.0.0.0:27017/Ravi';
mongoose.connect(url).then(()=>{
  console.log('Database connected successfully')
})
const SignUpSchema=new mongoose.Schema({
  username:{
    type:String,

  },
  email:{
    type:String,
    unique:true,
  
  },
  password:{
    type:String,
    
  },
  contact:{
    type:Number,
    unique:true
  },



},{timestamps:true})
export const SignUpModal=mongoose.model('users',SignUpSchema)
