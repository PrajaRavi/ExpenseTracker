import { SignUpModal } from "../Models/SignUp_Modal.js"

export const register=async(req,resp,next)=>{
  let {username,email,password,contact}=req.body
  try {
    let UserAlereadyExistOrNot=await SignUpModal.findOne({username,email,password,contact})

    if(UserAlereadyExistOrNot){
      return resp.send({success:false,msg:"user alreadye exist"})
    }
    let newuser=await SignUpModal.insertOne({username,email,password,contact})
    console.log(newuser);
    return resp.send({success:true,msg:"User Created successfullly"})
  } catch (error) {
    return resp.send({sucess:false,msg:error.message})
    
  }

}
export const login=async(req,resp,next)=>{
  let {email,password}=req.body
    try {
      let User=await SignUpModal.findOne({email})
      if(!User){
        return resp.send({sucess:false,msg:'first create an account'})
      }
      else{
        let IsPassMatch=password==User.password
        if(IsPassMatch==false){
        return resp.send({sucess:false,msg:'Invalid credentials'})
  
  
        }
        else{
        return resp.send({sucess:true,msg:'successfully login',User})
  
        }
      }
      
    } catch (error) {
      return resp.send({sucess:false,msg:error.message})
      
    }
}
