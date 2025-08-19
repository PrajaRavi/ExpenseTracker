import React, { useEffect, useRef, useState } from 'react'
import { FaCross } from 'react-icons/fa'
import {RxCross1} from 'react-icons/rx'
import { GrGallery } from "react-icons/gr";
import EmojiPicker from 'emoji-picker-react';
import { FaHandHoldingUsd } from "react-icons/fa";
import { RiDashboardHorizontalLine } from "react-icons/ri";
import { RiLogoutCircleRLine } from "react-icons/ri";
import axios from 'axios';
import { useContext } from 'react';
import { AppContext } from './Store';
import { toast } from 'react-toastify';

export default function PopUp({setactivepop,setuserincome,userincome}) {
    const {expensepop,GetUserIncomeData,GetUserExpenseData}=useContext(AppContext)
  
  let [IconBox,setIconBox]=useState(false)
  let [Icon,setIcon]=useState()
  let [IncomeSource,setIncomeSource]=useState()
  let [Amount,setamount]=useState()
  let [date,setdate]=useState()
  function HanldeIconPick(){
   setIconBox(!IconBox)

  }
  let icon=useRef()
  function HandleEmojiClick(e){
    // alert('Hello')
    // alert(typeof(e.emoji))//string
    icon.current.innerHTML=e.emoji
    setIconBox(false)
    setIcon(e.emoji)
    // console.log(e.emoji)

  }
  
  async function HandleSubmit(e){
    GetUserIncomeData();
GetUserExpenseData();
    e.preventDefault()
    let UserId=JSON.parse(localStorage.getItem("ExpeneUserData"))._id;
    if(expensepop==false &&Icon!=undefined&&Amount!=undefined&&IncomeSource!=undefined&&date!=undefined){

      let userdata=JSON.parse(localStorage.getItem(`ExpeneUserData`))
      let {data}=await axios.post(`http://localhost:5000/Income/Income`,{
      Icon,IncomeSource,Amount,date,UserId
    })
    let Data=await axios.post(`http://localhost:5000/SetAllTransaction/${userdata.email}`,{
      Icon,IncomeSource,Amount,date,AmountType:'Income'
    })
    // console.log(data)
    if(data.success){
      toast.success(data.msg)
      setactivepop(false)
      return
    }
    else {
      toast.error(data.msg)
    }
   return 
  }
  else if(expensepop==true&&Icon!=undefined&&Amount!=undefined&&IncomeSource!=undefined&&date!=undefined){
    // alert('calling expense')
    let UserId=JSON.parse(localStorage.getItem("ExpeneUserData"))._id;

    let userdata=JSON.parse(localStorage.getItem(`ExpeneUserData`))
      let {data}=await axios.post(`http://localhost:5000/expense/expense`,{
      Icon,IncomeSource,Amount,date,UserId
    })
      let Data=await axios.post(`http://localhost:5000/SetAllTransaction/${userdata.email}`,{
      Icon,IncomeSource,Amount,date,AmountType:'Expense'
    })
    console.log(data)
    if(data.msg){
      toast.success(data.msg)
      setactivepop(false)
      return
    }
    else {
      toast.error(data.msg)
    }
  }
    // console.log(`${Icon} and ${IncomeSource} and ${Amount} and ${date}`)

  }
   
  useEffect(()=>{  
    
  },[])
  return (
    <div className='fixed top-0 w-[100%] h-[100vh] bg-[rgba(0,0,0,0.4)] z-50 flex items-center justify-center '>
      <div className='md:w-[40%] w-[80%] h-[60%]  rounded-md bg-white'>
          <div className='w-[100%] px-2 py-1 flex items-center justify-between row'>
        
                           {expensepop==false ?<h1 className='font-semibold'>Add Income</h1>: <h1 className='font-semibold'>Add Expense</h1>}
                            <button onClick={()=>setactivepop(false)} className='text-xl font-bold cursor-pointer z-30'><RxCross1/></button>
                            </div>
                              <form action="" onSubmit={HandleSubmit}>
                            <div className="detail w-[100%] my-3 mx-2 flex flex-col gap-8">
                              <div className="first w-[100%] flex items-start gap-3">
                                <h1 ref={icon} className='font-bold text-2xl ' title='Pick icon' onClick={()=>{
                                  setIconBox(true)
                                }}><GrGallery/></h1><span className='font-bold'>Pick Icon</span>
                                {IconBox?<EmojiPicker onEmojiClick={HandleEmojiClick} className='absolute' theme='dark' defaultSkinTone='neutral'/>:null}
                                
                              </div>
                              <div className="second w-[100%] flex flex-col gap-1">
                               {expensepop==false? <span className='font-semibold '>Income Source</span>: <span className='font-semibold '>Expense Source</span>}
                                <input type="text" autoComplete='off' autoCorrect='off' autoFocus='off' onChange={(e)=>setIncomeSource(e.target.value)} name="income" className='w-[80%] bg-blue-100 py-2 px-3 text-sm font-semibold outline-none border-none rounded-md ' placeholder='Freelance, Music etc' id="" />
                              </div>
                              <div className="second w-[100%] flex flex-col gap-1">
                                <span className='font-semibold '>Amount</span>
                                <input type="number" autoComplete='off' autoCorrect='off' autoFocus='off'  name="income" onChange={(e)=>setamount(e.target.value)} className='w-[80%] bg-blue-100 py-2 px-3 text-sm font-semibold outline-none border-none rounded-md ' placeholder='20,000' id="" />
                              </div>
                              <div className="second w-[100%] flex flex-col gap-1">
                                <span className='font-semibold '>Date</span>
                                <input type="date" name="income" pattern='' onChange={(e)=>setdate(e.target.value)} className='w-[80%] bg-blue-100 py-2 px-3 text-sm font-semibold outline-none border-none rounded-md ' placeholder='20,000' id="" />
                              </div>
                              <div className='w-[90%] flex items-end justify-end'>

                             {expensepop==false? <button className=' right-0 bg-blue-600 text-white px-4 py-2 rounded-xl  hover:scale-[1.04] cursor-pointer hover:strip1 transition-all duration-300'>Add Income</button>: <button className=' right-0 bg-blue-600 text-white px-4 py-2 rounded-xl  hover:scale-[1.04] cursor-pointer hover:strip1 transition-all duration-300'>Add Expense</button>}
                              </div>
                            </div>
                              </form>
      </div>
    </div>
  )
}
