import * as XLSX from "xlsx";
import React, { useContext, useEffect, useState } from 'react'
import { FaDownload, FaPlus, FaRupeeSign } from 'react-icons/fa'
import {  MdDeleteForever} from 'react-icons/md'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Legend, Line } from 'recharts';
import { AppContext } from './Store';
import {  FaArrowTrendUp, FaMagnifyingGlass } from 'react-icons/fa6';
import axios from 'axios';

export default function Income({setactivepop,userincome,}) {
      const {expensepop,setexpensepop,setuserincome,data,setdata,GetUserIncomeData}=useContext(AppContext)
      let [DataForXlSheet,setDataForXlSheet]=useState([])
      let [TotalIncomeOfADay,setTotalIncomeOfADay]=useState([])
            let [SearchExpenseData,setSearchExpenseData]=useState([])
      
  // const [chartData1, setChartData1] = useState({
  //   labels:userincome.map((item)=>{
  //     return item.date
  //   }),//this should be an array of strings
  //   datasets: [
  //     {
  //       label: "Your Finantial Overview",
  //       data:userincome.map((item)=>{
  //         return item.Amount
  //       }),//this should be an array of numbers
  //       backgroundColor: [
  //         "#f80b5e",
         
  //         "#f80b5e",
  //         "#f80b5e",
  //         "#f80b5e",
  //         "#f80b5e",
         
  //         "#f80b5e",
  //         "#f80b5e",
  //         "#f80b5e"
  //       ],
  //       borderColor: "black",
  //       borderWidth: 2
  //     }
  //   ]
  // });
  async function HandleIncomeDelete(id){
    let {data}=await axios.delete(`http://localhost:5000/Income/DeleteIncome/${id}`);
  if(data.success){
    GetUserIncomeData();
    return toast.success("deleted");
  }
  }
  function HandleSearch(inputvalue){
  console.log(inputvalue)
  let newarr=userincome.filter((item,index)=>{
    return (item.IncomeSource).includes(inputvalue)||(item.date).includes(inputvalue)
  })
setSearchExpenseData(newarr);
}

function HandleDownload(){
let data=userincome.filter((item,index)=>{
  DataForXlSheet.push({IncomeSource:String(item.IncomeSource),Amount:String(item.Amount),date:String(item.date)})
  
})


// DataForXlSheet.push(data)
console.log(DataForXlSheet)
const worksheet = XLSX.utils.json_to_sheet(DataForXlSheet);

// Create a workbook
const workbook = XLSX.utils.book_new();

// Add the worksheet to the workbook
XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

// Generate the XLSX file
const xlsx = XLSX.write(workbook, {type: "array", bookType: "xlsx"});

// Create a link to download the file
const link = document.createElement("a");
link.href = URL.createObjectURL(new Blob([xlsx], {type: "application/octet-stream"}));
link.download = "data.xlsx";

// Click the link to download the file
link.click();
}
  return (
    <div className='container w-[100%] h-[100%]  overflow-y-scroll overflow-x-hidden  gap-5'>
      <div className="first  border-amber-300 w-[100%] h-[60%]">
  <div className='w-[100%] px-2 py-1 flex items-center justify-between'>

                    <h1 className='font-semibold text-xl'>Income Overview</h1>
                    <button onClick={()=>{
                      setactivepop(true)
                      setexpensepop(false)
                    }} className='bg-blue-100 flex items-center justify-center gap-2 px-3 rounded-md'><FaPlus/>Add Income</button>
                    </div>
<div className=' w-[100%] h-[90%] z-10'>
  
<ResponsiveContainer width="100%" height="100%">
       <AreaChart
        width={500}
        height={400}
        data={data}
        className='z-1'
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>
  
                
</div>
      </div>
      <div className="second  border-amber-300 w-[100%] h-[60%] my-5">
      <div className='w-[100%] px-2 py-1 flex items-center justify-between'>

<h1 className='font-semibold sm:text-xl text-xs'>Income Sources</h1>
<div className="search flex w-[60%] items-center sm:gap-5 gap-1 px-1 border-2 rounded-md sm:px-3 sm:py-1 justify-center">
<FaMagnifyingGlass/>
<input onChange={(e)=>{
  HandleSearch(e.target.value)
}} type="search" name="search" id="search" placeholder='Search by name or date...' className='border-none w-[100%] outline-none' />
</div>

<button onClick={HandleDownload} className='bg-blue-100 flex ml-5 sm:ml-0 items-center justify-center text-sm sm:text-xl gap-2 px-3 rounded-md'><FaDownload/>Download</button>
</div>
<div className='w-[100%] strip1     grid grid-cols-2 '>

 {SearchExpenseData.length==0?
                          userincome.map((item,index)=>{
                            return  <div key={index} className="list-card bg-white hover:bg-blue-50 transition-All duration-300 w-[400px] mx-auto px-3 rounded-md h-[50px] flex items-center justify-between my-2 cursor-pointer">
                            <div className='flex items-center justify-center gap-2'>
      
                            <div className="icon w-[30px] h-[30px] flex items-center justify-center text-3xl rounded-full ">
                             {item.Icon}
                            </div>
                            <div className="detail flex flex-col">
                              <span className='font-semibold'>{item.IncomeSource}</span>
                              <span className='font-semibold text-sm'>{item.date}</span>
                            </div>
                            </div>
                      <div className="buttons flex items-center justify-center gap-2">
                      
                                                   <button className="right bg-green-100 text-sm flex font-semibold text-green-900 items-center justify-center gap-1 w-[80px] py-1 rounded-md">
                                                     <FaRupeeSign className='text-xs'/>{item.Amount}<FaArrowTrendUp  className='text-green-900'/>
                                                     
                                                   </button>
                                                     <MdDeleteForever onClick={()=>{
                                                      HandleIncomeDelete(item._id)
                                                     }} className='text-red-700 font-bold text-2xl'/>
                                                   </div>
                          </div>
                          }):SearchExpenseData.map((item,index)=>{
                            return  <div key={index} className="list-card bg-white hover:bg-blue-50 transition-All duration-300 w-[400px] mx-auto px-3 rounded-md h-[50px] flex items-center justify-between my-2 cursor-pointer">
                            <div className='flex items-center justify-center gap-2'>
      
                            <div className="icon w-[30px] h-[30px] flex items-center justify-center text-3xl rounded-full ">
                             {item.Icon}
                            </div>
                            <div className="detail flex flex-col">
                              <span className='font-semibold'>{item.IncomeSource}</span>
                              <span className='font-semibold text-sm'>{item.date}</span>
                            </div>
                            </div>
                      <div className="buttons flex items-center justify-center gap-2">
                      
                                                   <button className="right bg-green-100 text-sm flex font-semibold text-green-900 items-center justify-center gap-1 w-[80px] py-1 rounded-md">
                                                     <FaRupeeSign className='text-xs'/>{item.Amount}<FaArrowTrendUp  className='text-green-900'/>
                                                     
                                                   </button>
                                                     <MdDeleteForever onClick={()=>{
                                                      HandleIncomeDelete(item._id)
                                                     }} className='text-red-700 font-bold text-2xl'/>
                                                    </div>
                          </div>
                          })
                        }
</div>
      </div>
      {/* <h1>Hello I am Income page</h1> */}
    </div>
  )
}
