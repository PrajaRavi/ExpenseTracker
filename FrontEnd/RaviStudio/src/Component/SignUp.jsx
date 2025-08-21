import React, { useState } from 'react'
import '../App.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { TbArrowFork } from "react-icons/tb";
import gaphImage from '../assets/ravi.webp'

export default function SignUp() {
  const navigate=useNavigate()
  let [error,seterror]=useState('')
  let [UserName,setUserName]=useState('')
  let [email,setemail]=useState('')
  let [password,setpassword]=useState('')
  let [contact,setcontact]=useState('')
  async function HandleSubmit(e){
    e.preventDefault()
    if(!UserName){
      seterror('*UserName is required ')
      return
    }
    else if(UserName.length<=5){
      seterror('*UserName is too short ')
      return

    }
    else if(!email){
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
    else if(!contact){
      seterror('*Contact is required ')
      return

    }
    else if(contact.length<10 ||contact.length>10){
      seterror('*Enter a valid contact ')
      return

    }
    else if(contact.length==10){
      seterror('')

    }
    let {data}=await axios.post(`https://etracker-ba4e.onrender.com/user/register`,{
      UserName,email,contact,password
    })
    console.log(data)
    if(data.success==false){
      return toast.error(data.msg)
      
    }
    else{
      toast.success(data.msg)
      setUserName('')
      setemail('')
      setpassword('')
      setcontact('')
      setTimeout(()=>{

        navigate('/login')
      },1000)
      
    }


  }
  return (
    <div className='main w-[100%] min-h-[100vh] flex md:flex-row flex-col items-center justify-center lg:gap-[100px] gap-[20px] '>
    <div className="left  lg:w-[40%] md:w-[60%] w-[90%] h-[100vh] bg-purple-30">
   <h1 className='font-bold text-xl mx-2 my-2'>Expense Tracker</h1>
   <div className='w-[100%] relative top-[120px] mx-3'>
    <h1 className='font-bold text-3xl md:w-[80%] w-[94%] text-center bg-blue-600 py-5 rounded-md text-white my-4 signup'>Sign Up</h1>

   <form action="" onSubmit={HandleSubmit} className='flex flex-col gap-4'>
     <div className='flex flex-col items-start justify-center gap-2'>
      <h1 className='font-bold'>UserName</h1>
      <input type="text" placeholder='Ravi Prajapti' value={UserName} onChange={(e)=>setUserName(e.target.value)} className='bg-blue-100 px-2 py-1  md:w-[80%] w-[94%] rounded-md outline-none border-none'  autoCapitalize='off' autoComplete='off'  />
     </div>
     <div className='flex flex-col items-start justify-center gap-2'>
      <h1 className='font-bold'>Email Address</h1>
      <input type="email" placeholder='abc@gmail.com' value={email} onChange={(e)=>setemail(e.target.value)} className='bg-blue-100 px-2 py-1  md:w-[80%] w-[94%] rounded-md outline-none border-none'  autoCapitalize='off' autoComplete='off'  />
     </div>
     <div className='flex flex-col items-start justify-center gap-2'>
      <h1 className='font-bold'>Password</h1>
      <input type="password" onChange={(e)=>setpassword(e.target.value)} value={password} className='bg-blue-100 px-2 py-1  md:w-[80%] w-[94%] rounded-md outline-none border-none'  autoCapitalize='off' autoComplete='off'  />
     </div>
     <div className='flex flex-col items-start justify-center gap-2'>
      <h1 className='font-bold'>Contact</h1>
      <input type="number" placeholder='123 123 1234' value={contact} onChange={(e)=>setcontact(e.target.value)} className='bg-blue-100 px-2 py-1  md:w-[80%] w-[94%] rounded-md outline-none border-none'  autoCapitalize='off'  autoComplete='off'  />
     </div>
     <span className='error-msg font-bold text-red-500 '>{error}</span>
     <button className=' md:w-[80%] w-[94%] text-center font-semibold py-2 rounded-md hover:tracking-widest transition-all duration-200 hover:cursor-pointer hover:scale-[1.01] bg-blue-600 text-white signup'>Sign Up</button>
     <h1 className='font-bold'>Already have an Account? <span className='underline'><Link to={'/login'}>Log In</Link></span></h1>
   </form>
   </div>
    </div>
    <div className="right  bg-blue-100  relative overflow-hidden lg:w-[40%] md:w-[60%] w-[90%] h-[100vh]">
      <div className='md:w-[80%] w-[97%] bg-white rounded-2xl h-[100px] top-[100px] md:ml-[40px] ml-[10px] flex items-center justify-center gap-3 strip z-20 absolute '>
        <div className="icon w-[50px] h-[50px] flex font-bold text-3xl items-center justify-center rounded-full border-2 border-black">
            <TbArrowFork/>
        </div>
        <div className='flex flex-col items-start justify-start gap-1'>
          <h1 className='font-bold text-xl'>Track your income and Expense</h1>
          <h1>34,000</h1>
          {/* 34,000 */}
        </div>

      </div>
      <div className='w-[100%] h-[100%]'>

<img src={gaphImage} alt="logo" className='w-[80%] rounded-2xl right-[40px] h-[40%] absolute z-30 bottom-[10px]' />
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
