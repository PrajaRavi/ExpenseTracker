import React, { useEffect, useState } from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import SignUp from './Component/SignUp'
import Login from './Component/Login'
import Home from './Component/Home'
import Expense from './Component/Expense'
import { AppContext } from './Component/Store'
import Income from './Component/Income'
import axios from 'axios'
import * as XLSX from 'xlsx';
let ExpenseMap=new Map();
let IncomeMap=new Map();
export default function App() {
    let [userincome,setuserincome]=useState([])
    let [userexpense,setuserexpense]=useState([])
    let [expensepop,setexpensepop]=useState(false)
    let [data,setdata]=useState([])
    let [ExpensePieChart,setExpensePieChart]=useState([])
    let [IncomePieChart,setIncomePieChart]=useState([])
    let [expensedata,setexpensedata]=useState([]);
     
    
async function GetUserIncomeData(){
  let UserId=JSON.parse(localStorage.getItem("ExpeneUserData"))._id
  let {data}=await axios.get(`https://etracker-ba4e.onrender.com/Income/GetAllIncomeData/${UserId}`)
  let newarr=data.msg.filter((item)=>{
    return item.Time>Date.now()
  })

    data.msg.map((item,index)=>{
    if(IncomeMap.has(item.date)){
      console.log("if");
      console.log(parseInt(IncomeMap.get(item.date)),parseInt(item.Amount))

      let data=(parseInt(IncomeMap.get(item.date))+parseInt(item.Amount));
      IncomeMap.set(item.date,data)
    }
    else{
      console.log("else");

      IncomeMap.set(item.date,parseInt(item.Amount))
    }
  })
  // console.log(ExpenseMap)
  let myarr=[]
  let count=0;
  IncomeMap.forEach((value,key)=>{
// console.log(value);
   myarr[count]={
    name:key,
    uv:parseInt(value)

   }
   count+=1;
  })
  

setuserincome(data.msg)
setdata(
  myarr
)
// console.log(data)

let newarr1=data.msg.filter((item,index)=>{
  // console.log("chala",index)
if(index<10){

  return item
}
})
// console.log(newarr)
setIncomePieChart(newarr1.map((item,index)=>{
    return {
      
      name:(item.date),
      uv:parseInt(item.Amount),
      
      
    }
  

}))

// console.log(data.msg)
}
async function GetUserExpenseData(){
  let UserId=JSON.parse(localStorage.getItem("ExpeneUserData"))._id

  let {data}=await axios.get(`https://etracker-ba4e.onrender.com/expense/GetAllExpenseData/${UserId}`)
  let newarr=data.msg.filter((item)=>{
    return item.Time>Date.now()
  })
  
  data.msg.map((item,index)=>{
    if(ExpenseMap.has(item.date)){
      console.log("if");
      console.log(parseInt(ExpenseMap.get(item.date)),parseInt(item.Amount))

      let data=(parseInt(ExpenseMap.get(item.date))+parseInt(item.Amount));
      ExpenseMap.set(item.date,data)
    }
    else{
      console.log("else");

      ExpenseMap.set(item.date,parseInt(item.Amount))
    }
  })
  console.log(ExpenseMap)
  let myarr=[]
  let count=0;
  ExpenseMap.forEach((value,key)=>{
// console.log(value);
   myarr[count]={
    name:key,
    uv:parseInt(value)

   }
   count+=1;
  })
  
setuserexpense(data.msg)
// console.log(myarr);
setexpensedata(
  myarr
)

let newarr1=data.msg.filter((item,index)=>{
  // console.log("chala",index)
if(index<10){

  return item
}
})

setExpensePieChart(newarr1.map((item)=>{
  return {
    name:(item.date),
    uv:parseInt(item.Amount),

  }

}))

// console.log(data.msg);




}


useEffect(()=>{
GetUserIncomeData();
GetUserExpenseData();
},[])
  return (
  <>
  <AppContext.Provider value={{userincome,setuserincome,expensepop,setexpensepop,userexpense,setuserexpense,data,setdata,GetUserIncomeData,GetUserExpenseData,expensedata}}>

<BrowserRouter>
<Routes>
  <Route element={<SignUp/>} path={'/'}/>
  <Route element={<Login/>} path={'/login'}/>
  <Route element={<Home userincome={userincome} setuserincome={setuserincome} userexpense={userexpense} setuserexpense={setuserexpense} ExpensePieChart={ExpensePieChart} IncomePieChart={IncomePieChart}/>} path={'/home'}/>
  <Route element={<Expense />} path={'/expense'}/>
  <Route element={<Income />} path={'/income'}/>
</Routes>
</BrowserRouter>
  </AppContext.Provider>

  </>
  )
}
