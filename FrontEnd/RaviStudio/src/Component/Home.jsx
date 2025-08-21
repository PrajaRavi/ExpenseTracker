import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaArrowRight, FaHamburger, FaMinus, FaPlus, FaProjectDiagram, FaRProject, FaSearch } from 'react-icons/fa'
import { useNavigation } from 'react-router-dom'
import Expense from './Expense'
import { useNavigate } from 'react-router-dom'
import { FaRupeeSign } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaHandHoldingUsd } from "react-icons/fa";

import { FaArrowTrendDown } from "react-icons/fa6";
import { TbArrowFork } from "react-icons/tb";
import logo from '../assets/logo.png'
import { RiLogoutCircleRLine } from "react-icons/ri";

import { RiDashboardHorizontalLine } from "react-icons/ri";

import {RxCross1} from 'react-icons/rx'
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js"
import Income from './Income'
import PopUp from './PopUp'
import { BarChart } from './BarChart'
import axios from 'axios'
import { AppContext } from './Store'
import { Doughnut } from 'react-chartjs-2'
import{ResponsiveContainer, PieChart, Pie, ComposedChart, XAxis, YAxis, Tooltip, Legend, Bar, Line, CartesianGrid} from "recharts"
Chart.register(CategoryScale);

export default function Home({IncomePieChart,ExpensePieChart}) {
  const Meradata = [
  {
    name: '2025-08-06',
    uv: 590,
    pv: 800,
    amt: 1400,
  },
  {
    name: '2025-08-12',
    uv: 868,
    pv: 967,
    amt: 1506,
  },
  {
    name: '2025-08-15',
    uv: 868,
    pv: 967,
    amt: 1506,
  },
  {
    name: '2025-08-17',
    uv: 868,
    pv: 967,
    amt: 1506,
  },
  {
    name: '2025-08-13',
    uv: 1397,
    pv: 1098,
    amt: 989,
  },
  {
    name: '2025-08-07',
    uv: 1480,
    pv: 1200,
    amt: 1228,
  },
  {
    name: '2025-08-08',
    uv: 1520,
    pv: 1108,
    amt: 1100,
  },
  {
    name: '2025-08-09',
    uv: 1400,
    pv: 680,
    amt: 1700,
  },
  {
    name: '2025-08-20',
    uv: 1400,
    pv: 680,
    amt: 1700,
  },
  {
    name: '2025-08-21',
    uv: 1400,
    pv: 680,
    amt: 1700,
  },
  
  
];

  const navigation=useNavigate();
  const {expensepop,setexpensepop,userincome,setuserincome,userexpense,setuserexpense}=useContext(AppContext)
  let [totalexpense,settotalexpense]=useState()
  let [recentTrans,setrecentTrans]=useState([])
  let [totalincome,settotalincome]=useState()
  let [recentIncome,setrecentIncome]=useState([])
  let [recentExpense,setrecentExpense]=useState([])
  const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const TotalExpenseData = {
  labels: ['Total Balance', 'Total Income', 'Total Expense'],
  datasets: [
    {
      data: [`${totalincome-totalexpense}`,`${totalincome}`,`${totalexpense}`],
      backgroundColor: ['#0f1aed', '#ff1c1c', '#aa0bf4'],
      hoverBackgroundColor: ['#0f1aed', '#ff1c1c', '#aa0bf4'],
    },
  ],
};
function GetTotalExpense(){
  let Data=userexpense.map((item)=>{
    return Number(item.Amount)
  })
  // setData(userexpense)
  // console.log(Data)
  let sum=0
  Data.map((item)=>{
    // console.log(item)
    sum+=item
  })
  // alert(sum)
}
const [chartData, setChartData] = useState({
  labels:recentExpense.map((data)=>{
    return (data.date)
  }),//this should be an array of strings
  datasets: [
    {
      label: "Your Finantial Overview",
      data:recentExpense.map((data)=>{
        return (data.Amount)
      }) ,//this should be an array of numbers
      backgroundColor: [
        "#aa0bf4",
       
        "#aa0bf4",
        "#aa0bf4",
        "#aa0bf4"
      ],
      borderColor: "black",
      borderWidth: 2
    }
  ]
});
const [chartData1, setChartData1] = useState({
  labels:recentIncome.map((item)=>{
    return item.Icon;
    // console.log(item.date)
  }),//this should be an array of strings
  datasets: [
    {
      label: "Your Finantial Overview",
      data:recentIncome.map((item)=>{
        return item.Amount
      }),//this should be an array of numbers
      backgroundColor: [
        "#f80b5e",
       
        "#f80b5e",
        "#f80b5e",
        "#f80b5e",
        "#f80b5e",
       
        "#f80b5e",
        "#f80b5e",
        "#f80b5e"
      ],
      borderColor: "black",
      borderWidth: 2
    }
  ]
});
async function GetAllTransaction(email){
  let {data}=await axios.get(`https://etracker-ba4e.onrender.com/GetAllTheTransaction`)
  // console.log(data.msg)
// let newarr=data.msg.filter((item)=>{
//   return item.Time>Date.now()
// })

  setrecentTrans(data.msg)
  // console.log(newarr)
}
async function GetUserIncomeData(email){
  // alert('Income data')
  // alert(email)
  let UserId=JSON.parse(localStorage.getItem("ExpeneUserData"))._id
  let {data}=await axios.get(`https://etracker-ba4e.onrender.com/Income/GetAllIncomeData/${UserId}`)
  // console.log(data);
  let newarr=data.msg.filter((item)=>{
    return item.Time>Date.now()
  })
  
setuserincome(data.msg)
setrecentIncome(newarr)
// setrecentTrans([...recentTrans,...data.Income])

let Data=data.msg.map((item)=>{
  return Number(item.Amount)
})
// console.log(Data)
let sum=0
Data.map((item)=>{
  // console.log(item)
  sum+=item
})
// alert(sum)
settotalincome(sum)

// console.log(data)
}
async function GetUserExpenseData(email){
  // alert('Income data')
  // alert(email)
  let UserId=JSON.parse(localStorage.getItem("ExpeneUserData"))._id

  let {data}=await axios.get(`https://etracker-ba4e.onrender.com/expense/GetAllExpenseData/${UserId}`)
  let newarr=data.msg.filter((item)=>{
    return item.Time>Date.now()
  })
  
setuserexpense(data.msg)
setrecentExpense(newarr)



console.log(data.Expense)

let Data=data.msg.map((item)=>{
  return Number(item.Amount)
})
// console.log(Data)
let sum=0
Data.map((item)=>{
  // console.log(item)
  sum+=item
})
// alert(sum)
settotalexpense(sum)


}
  const navigate=useNavigate()
  let [activepop,setactivepop]=useState(false)
  let [userdata,setuserdata]=useState([])
  let [selectedtab,setseletedtab]=useState('Dashboard')
  let [IsMenu,setIsMenu]=useState(false)
  
  let menubar=useRef()
  function HandleExpensePageShift(){
    // navigate('/expense')
    setseletedtab('Expense')

  }
  useEffect(()=>{
let data=JSON.parse(localStorage.getItem('ExpeneUserData'))
setuserdata(data)
// console.log(userexpense)
GetUserIncomeData(data.email)
GetUserExpenseData(data.email)
GetAllTransaction(data.email)

GetTotalExpense()
  },[])
  async function HandleCurrDiv(idx){
    alert(idx)
    console.log(document.getElementById(`Expense`))
  }
  function HandleBar(){
    if(IsMenu==false){
      menubar.current.className=`left   fixed md:relative top-[50px] md:top-[0px] left-[0%] md:left-0 transition-all duration-300  md:flex w-[300px] md:w-[20%] bg-[#FFFFFF] z-30  flex-col gap-3 items-center justify-start strip1 h-[90%] md:h-[100%] mx-1 py-3`
      setIsMenu(true)
    }
    else{
      setIsMenu(false)
       menubar.current.className=`left  z-30 fixed md:relative top-[50px] md:top-[0px] left-[-100%] md:left-0 transition-all duration-300  md:flex w-[300px] md:w-[20%] bg-[#FFFFFF]  flex-col gap-3 items-center justify-start strip1 h-[90%] md:h-[100%] mx-1 py-3 `
    }

  }
  useEffect(()=>{  
    // alert("chala")
    console.log(IncomePieChart)
  },[])
  return (
    <>
   {activepop? <PopUp setactivepop={setactivepop} userincome={userincome} setuserincome={setuserincome}/>:null}
    <div className='bg-[#FFFFFF] flex flex-col gap-2 w-[100%] min-h-screen overflow-hidden'>
      <div className='strip1 bg-[#FFFFFF] py-2 px-2 mx-2 my-1 flex items-center justify-start gap-2'>
      <div className="md:hidden right1 font-bold text-2xl text-black">
        <span className='cursor-pointer' onClick={(e)=>{HandleBar(e)
        
        }}>{!IsMenu?<FaHamburger/>:<RxCross1/>}</span>
        {/* <span>bar</span> */}

      </div>
    <h1 className='font-bold text-xl'>Expense Tracker</h1>
      </div>
      <div className=' bg-[#FFFFFF] flex items-center justify-center gap-2 w-[99%] h-[90vh] mx-2 my-1 py-1'>
        <div ref={menubar} className="  absolute md:relative top-[50px] md:top-[0px] left-[-100%] md:left-0 transition-all duration-300  md:flex w-[300px] md:w-[20%] bg-[#fff]  flex-col gap-3 items-center justify-start strip1 h-[90%] md:h-[100%] mx-1 py-3">
          <div className='flex flex-col items-center justify-center gap-3 z-40'>


          <img src={logo} alt="logo" className='border-2 px-3 py-3 border-amber-300 w-[100px] h-[100px] rounded-full' />
          <h1 className='font-bold'>Hello {userdata.UserName}</h1>
       
          </div>
              <div className='flex items-center justify-center flex-col gap-2 w-[100%] '>
                <button onClick={()=>{setseletedtab('Dashboard')
                       menubar.current.className=`left  z-30 fixed md:relative top-[50px] md:top-[0px] left-[-100%] md:left-0 transition-all duration-300  md:flex w-[300px] md:w-[20%] bg-[#FFFFFF]  flex-col gap-3 items-center justify-start strip1 h-[90%] md:h-[100%] mx-1 py-3 `
                       setIsMenu(false)

                  }} className={selectedtab=='Dashboard'?'font-bold italic cursor-pointer bg-blue-600 py-2 w-[70%] flex items-center justify-center gap-3 text-white rounded-md':'font-bold flex items-center justify-center gap-3 italic bg-transparent py-2 w-[70%] text-black rounded-md'}><RiDashboardHorizontalLine className='text-2xl'/>Dashboard</button>
                <button onClick={()=>{setseletedtab('Income')
                                       menubar.current.className=`left  z-30 fixed md:relative top-[50px] md:top-[0px] left-[-100%] md:left-0 transition-all duration-300  md:flex w-[300px] md:w-[20%] bg-[#FFFFFF]  flex-col gap-3 items-center justify-start strip1 h-[90%] md:h-[100%] mx-1 py-3 `
                       setIsMenu(false)

                }}   className={selectedtab=='Income'?'font-bold italic cursor-pointer bg-blue-600 flex items-center justify-center gap-3 py-2 w-[70%] text-white rounded-md':'font-bold flex items-center justify-center gap-3 italic bg-transparent py-2 w-[70%] text-black rounded-md'}><FaHandHoldingUsd className='text-3xl'/>Income</button>
                <button onClick={()=>{setseletedtab('Expense')
                                       menubar.current.className=`left  z-30 fixed md:relative top-[50px] md:top-[0px] left-[-100%] md:left-0 transition-all duration-300  md:flex w-[300px] md:w-[20%] bg-[#FFFFFF]  flex-col gap-3 items-center justify-start strip1 h-[90%] md:h-[100%] mx-1 py-3 `
                       setIsMenu(false)

                }}   className={selectedtab=='Expense'?'font-bold italic cursor-pointer bg-blue-600  flex items-center justify-center gap-3 py-2 w-[70%] text-white rounded-md':'font-bold italic bg-transparent py-2 w-[70%] flex items-center justify-center gap-3 text-black rounded-md'}><FaRupeeSign className='text-2xl'/>Expense</button>
                <button onClick={()=>{setseletedtab('Logout')
                  localStorage.removeItem("ExpeneUserData")
                  
                  
                }}  className={selectedtab=='Logout'?'font-bold italic cursor-pointer bg-blue-600  flex items-center justify-center gap-3 py-2 w-[70%] text-white rounded-md':'font-bold flex items-center justify-center gap-3 italic bg-transparent py-2 w-[70%] text-black rounded-md'}><RiLogoutCircleRLine className='text-2xl'/>Logout</button>
              </div>

        </div>
       <div className={selectedtab=="Dashboard"?"right  md:w-[80%] w-[100%]  h-[100%] mx-1 overflow-y-scroll":"hidden"}>
                 <div className="first w-[100%] md:flex-row flex-col flex items-center justify-center lg:gap-10 gap-2 my-1">
                  <div className="card md:w-[30%] w-[80%] flex items-start justify-start px-3  rounded-md gap-2  py-2 bg-[#FFFFFF] strip1">
                    <button className='w-[50px] h-[50px] flex items-center justify-center bg-blue-600 rounded-full'>
                      <TbArrowFork className='text-2xl text-white'/>
                    </button>
                    <div className='flex flex-col items-start '>
                      <span className=' font-bold'>Total Balance</span>
                      <span className=' font-bold flex items-center justify-center'><FaRupeeSign className='text-xs'/>{totalincome-totalexpense}</span>
                    </div>
                    
                  </div>
                  <div className="card  md:w-[30%] w-[80%] flex items-start justify-start px-3  rounded-md gap-2  py-2 bg-[#FFFFFF] strip1">
                    <button className='w-[50px] h-[50px] bg-orange-600 rounded-full flex items-center justify-center'><FaHandHoldingUsd className='text-3xl text-white'/></button>
                    <div className='flex flex-col items-start '>
                      <span className=' font-bold'>Total Income</span>
                      <span className=' font-bold flex items-center justify-center'><FaRupeeSign className='text-xs'/>{totalincome}</span>

                    </div>
                    
                  </div>
                  <div className="card  md:w-[30%] w-[80%] flex items-start justify-start px-3  rounded-md gap-2  py-2 bg-[#FFFFFF] strip1">
                    <button className='w-[50px] h-[50px] bg-purple-600 rounded-full flex items-center justify-center'><FaRupeeSign className='text-2xl text-white'/></button>
                    <div className='flex flex-col items-start '>
                      <span className=' font-bold'>Total Expense</span>
                      <span className=' font-bold flex items-center justify-center'><FaRupeeSign className='text-xs'/>{totalexpense}</span>

                    </div>
                    
                  </div>
                 </div>
                 <div className="second  w-[100%] min-h-[100%] flex flex-wrap md:gap-10 gap-2 justify-center  py-4 px-2 ">
                  <div className="card md:w-[45%] w-[48%] min-w-[300px] h-[400px] strip1 rounded-2xl">
                    <div className='w-[100%] px-2 py-1 flex items-center justify-between'>

                    <h1 className='font-bold text-[1rem] '>Today's Transactions</h1>
                    <button className='bg-blue-100  items-center text-xs font-semibold justify-center gap-2 px-3 rounded-md hidden py-1'>See All<FaArrowRight/></button>
                    </div>
                         <div className="list  py-1 w-[100%] h-[90%] flex flex-col gap-2 overflow-y-scroll">

                        {
                          recentTrans.map((item,index)=>{
                            return <div key={index} onClick={()=>{
                              HandleCurrDiv(index)
                              // console.log(CurrDiv.current)
                            }} id={`${item.AmountType}`}  className="list-card bg-[#FFFFFF] hover:bg-blue-50 transition-All duration-300 w-[90%] mx-auto px-3 rounded-md  flex items-center justify-between">
                            <div className='flex items-center justify-center gap-2'>
      
                            <div className="icon w-[30px] h-[30px] rounded-full flex items-center justify-center text-3xl">
                              {item.Icon}
      
                            </div>
                            <div className="detail flex flex-col">
                              <span className='font-semibold'>{item.IncomeSource}</span>
                              <span className='font-semibold text-sm'>{item.date}</span>
                            </div>
                            </div>
                            {
                              item.AmountType=="income"? <button className="right bg-green-200 flex text-sm font-semibold text-green-900 items-center justify-center gap-1 w-[80px] py-1 rounded-md">
                              <FaPlus className='text-xs'/>{item.Amount}<FaArrowTrendUp className='text-green-900'/>
                            </button>: <button className="right bg-red-200 flex items-center text-sm font-semibold justify-center text-red-600 gap-1 w-[80px] py-1 rounded-md">
                            <FaMinus className='text-xs'/>{item.Amount}<FaArrowTrendDown className='text-red-600'/>
                              
                            </button>
                            }
                           
                           
                          </div>
                          })
                        }
                    
                    
                    </div>

                  </div>
                  <div className="card md:w-[45%] w-[48%] min-w-[300px] h-[400px] strip1 rounded-2xl">

                  <div className='w-[100%] px-2 py-1 flex items-center justify-between'>

<h1 className='font-bold text-[1rem]'>Finantial overview</h1>
<button className='bg-blue-100 items-center text-xs font-semibold justify-center gap-2 px-3 rounded-md py-1 hidden'>See All<FaArrowRight/></button>
</div>
<div className='w-[100%] relative h-[80%] flex items-center justify-center'>

  <Doughnut width={100} height={100} className='z-10'   data={TotalExpenseData} options={{cutout:90,
    plugins:{
      title:{
        text:'Finantial overview'
      }
    }
  }} />
  </div>
{/* </ResponsiveContainer> */}
                  </div>
                  <div className="card md:w-[45%] w-[48%] min-w-[300px] h-[400px] strip1 rounded-2xl">
                    <div className='w-[100%] px-2 py-1 flex items-center justify-between'>

                    <h1 className='font-bold text-[1rem'>Expense</h1>
                    <button onClick={HandleExpensePageShift} className='bg-blue-100 flex items-center text-xs font-semibold justify-center gap-2 px-3 rounded-md py-1'>See All<FaArrowRight/></button>
                    </div>
                         <div className="list   py-1 w-[100%] h-[90%] flex flex-col gap-2 overflow-y-scroll">

                        {
                          userexpense.map((item,index)=>{
                            return  <div key={index} className="list-card bg-[#FFFFFF] hover:bg-blue-50 transition-All duration-300 hover:cursor-pointer w-[90%] mx-auto px-3 rounded-md  flex items-center justify-between">
                            <div className='flex items-center justify-center gap-2'>
      
                            <div className="icon w-[30px] h-[30px] flex items-center justify-center text-3xl rounded-full ">
                             {item.Icon}
                            </div>
                            <div className="detail flex flex-col">
                              <span className='font-semibold'>{item.expensesource}</span>
                              <span className='font-semibold text-sm'>{item.date}</span>
                            </div>
                            </div>
                            <button className="right bg-red-200 text-sm flex items-center font-semibold justify-center text-red-600 gap-1 w-[80px] py-1 rounded-md">
                            <FaRupeeSign className='text-xs'/>{item.Amount}<FaArrowTrendDown className='text-red-600'/>
                              
                            </button>
                          </div>
                          })
                        }
                   
                   
                    </div>

                  </div>
                  <div className="card md:w-[45%] w-[48%] min-w-[300px] h-[400px] strip1 rounded-2xl ">
                  <div className='w-[100%] px-2 py-1 flex items-center justify-between'>

<h1 className='font-bold text-[1rem]'>Today's Expense</h1>
</div>
<div className='w-[100%] relative h-[90%] flex items-center justify-center'>
    <ResponsiveContainer width="100%" className={'z-10'} height="100%">
        <ComposedChart
          width={500}
          height={400}
          data={ExpensePieChart}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name"  />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="uv" name={"Amount"} barSize={20} fill="#413ea0" />
          <Line type="monotone" dataKey="uv" name='Amount' stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer>
   
  </div>
  

                  </div>
                  <div className="card md:w-[45%] w-[48%] min-w-[300px] h-[400px] strip1 rounded-2xl">
                    <div className='w-[100%] px-2 py-1 flex items-center justify-between'>

                    <h1 className='font-bold text-[1rem]'>Income</h1>
                    <button onClick={()=>{
                      setincome(true)
                      setDashboard(false)
                      setExpense(false)
                    }} className='bg-blue-100 flex items-center text-xs font-semibold justify-center gap-2 px-3 rounded-md py-1'>See All<FaArrowRight/></button>
                    </div>
                         <div className="list  py-1 w-[100%] h-[90%] flex flex-col gap-2 overflow-y-scroll">

                        {
                          userincome.map((item,index)=>{
                            return  <div key={index} className="list-card bg-[#FFFFFF] hover:bg-blue-50 transition-All duration-300 w-[90%] mx-auto px-3 rounded-md  flex items-center justify-between">
                            <div className='flex items-center justify-center gap-2'>
      
                            <div className="icon w-[30px] flex items-center justify-center h-[30px] rounded-full ">
                              <span className='text-3xl'>{item.Icon}</span>
      
                            </div>
                            <div className="detail flex flex-col">
                              <span className='font-semibold'>{item.IncomeSource}</span>
                              <span className='font-semibold text-sm'>{item.date}</span>
                            </div>
                            </div>
                            <button className="right bg-green-200 text-sm flex font-semibold text-green-900 items-center justify-center gap-1 w-[80px] py-1 rounded-md">
                              <FaRupeeSign className='text-xs'/>{item.Amount}<FaArrowTrendUp className='text-green-900'/>
                            </button>
                          </div>
                          })
                        }
                   
                    
                    </div>

                  </div>
                  <div className="card md:w-[45%] w-[48%] min-w-[300px] h-[400px] strip1 rounded-2xl ">

                  <div className='w-[100%] px-2 py-1 flex items-center justify-between'>

<h1 className='font-bold text-[1rem]'>Today's Income</h1>
<button className='bg-blue-100  items-center text-xs font-semibold justify-center gap-2 px-3 rounded-md py-1 hidden'>See All<FaArrowRight/></button>
</div>
<div className='w-[100%] relative h-[90%] flex items-center justify-center'>
  <ResponsiveContainer  width="100%" className={'z-10'} height="100%">
        <ComposedChart
          width={500}
          height={400}
          
          data={IncomePieChart}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name"  />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar   dataKey="uv" name={"Amount"} barSize={20} fill="#413ea0" />
          <Line type="monotone" dataKey="uv" name='Amount' stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  
                  </div>

                 </div>
        </div>
        
        <div className={selectedtab=="Expense"?"right md:w-[80%] w-[100%]  h-[100%] mx-1 overflow-y-scroll":"hidden"}>
        <Expense setactivepop={setactivepop} userexpense={userexpense}/>
        </div>
        
        
        <div className={selectedtab=="Income"?"right md:w-[80%] w-[100%]  h-[100%] mx-1 overflow-y-scroll":"hidden"}>
        <Income setactivepop={setactivepop} userincome={userincome}/>
        </div>
        

      </div>

      
    </div>
    </>

  )
}
