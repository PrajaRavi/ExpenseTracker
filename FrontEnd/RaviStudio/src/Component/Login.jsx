import React, { useState } from 'react'
import '../App.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
export default function Login() {
  const navigate=useNavigate()
  let [error,seterror]=useState('')
  let [UserName,setUserName]=useState('')
  let [email,setemail]=useState('')
  let [password,setpassword]=useState('')
  let [contact,setcontact]=useState('')
  async function HandleSubmit(e){
    e.preventDefault()
   
     if(!email){
      seterror('*Email is  required')
      return

    }
    else if(!email.includes('@')||!email.includes('gmail.com')){
      seterror('*Enter a valid email')
      return

    }
    else if(!password){
      seterror('*Password is required ')
      return

    }
    else if(password.length<=6){
      seterror('*Password must have at least 6 char')
      return
    }
   
    else if(contact.length==10){
      seterror('')

    }
    let {data}=await axios.post(`http://localhost:5000/user/login`,{
      email,password
    })
    if(data.msg=='first create an account'){
      toast.warn(data.msg)
      navigate('/')
      return
      
    }
    else if(data.msg=='Invalid credentials'){
      toast.error(data.msg)
      return
    }
    else if(data.msg=='successfully login'){
      toast.success(data.msg)
      localStorage.setItem('ExpeneUserData',JSON.stringify(data.User))
      setTimeout(()=>{

        navigate('/home')
      },1000)
    }
    else{
      toast.info(data.msg)
    }

  }
  return (
    <div className='main w-[100%] min-h-[100vh] flex md:flex-row flex-col items-center justify-center lg:gap-[100px] gap-[20px] '>
    <div className="left  lg:w-[40%] md:w-[60%] w-[90%] h-[100vh] bg-purple-30">
   <h1 className='font-bold text-xl mx-2 my-2'>Expense Tracker</h1>
   <div className='w-[100%] relative top-[120px] mx-3'>
    <h1 className='font-bold text-3xl md:w-[80%] w-[94%] text-center bg-blue-600 py-5 rounded-md text-white my-4 signup'>Log In</h1>

   <form action="" onSubmit={HandleSubmit} className='flex flex-col gap-4'>
    
     <div className='flex flex-col items-start justify-center gap-2'>
      <h1 className='font-bold'>Email Address</h1>
      <input type="email" placeholder='abc@gmail.com' value={email} onChange={(e)=>setemail(e.target.value)} className='bg-blue-100 px-2 py-1  md:w-[80%] w-[94%] rounded-md outline-none border-none'  autoCapitalize='off' autoComplete='off'  />
     </div>
     <div className='flex flex-col items-start justify-center gap-2'>
      <h1 className='font-bold'>Password</h1>
      <input type="password" onChange={(e)=>setpassword(e.target.value)} value={password} className='bg-blue-100 px-2 py-1  md:w-[80%] w-[94%] rounded-md outline-none border-none'  autoCapitalize='off' autoComplete='off'  />
     </div>
    
     <span className='error-msg font-bold text-red-500 '>{error}</span>
     <button className=' md:w-[80%] w-[94%] text-center font-semibold py-2 rounded-md hover:tracking-widest transition-all duration-200 hover:cursor-pointer hover:scale-[1.01] bg-blue-600 text-white signup'>Log In</button>
     <h1 className='font-bold'>Create an Account? <span className='underline'><Link to={'/'}>Sign Up</Link></span></h1>
   </form>
   </div>
    </div>
    <div className="right  bg-blue-100  relative overflow-hidden lg:w-[40%] md:w-[60%] w-[90%] h-[100vh]">
      <div className='md:w-[80%] w-[97%] bg-white rounded-2xl h-[100px] top-[100px] md:ml-[40px] ml-[10px] flex items-center justify-center gap-3 strip z-20 absolute '>
        <div className="icon w-[50px] h-[50px] rounded-full border-2 border-black">

        </div>
        <div className='flex flex-col items-start justify-start gap-1'>
          <h1 className='font-bold text-xl'>Track your income and Expense</h1>
          <h1>34,000</h1>
          {/* 34,000 */}
        </div>

      </div>
      <div className='w-[200px] h-[200px] bg-blue-600 signup1 rounded-[34px] absolute left-[-20px]  top-[-20px]'>

      </div>
      <div className='w-[150px] h-[150px] bg-blue-600 signup1 rounded-[34px] absolute left-[-20px]  bottom-[-20px]'>

</div>
<div className='w-[200px] h-[200px] bg-transparent border-[20px] signupborder border-purple-400 rounded-[34px] absolute right-[0px]  bottom-[50%]'>

</div>

    </div>
   
  </div>
  )
}
