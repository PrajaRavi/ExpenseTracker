const arr=[
  {
  id:1,
  name:'Rahul',
},
  {
  id:2,
  name:'Rahu',
},
  {
  id:3,
  name:'Rah',
},
  {
  id:4,
  name:'Ra',
},
  {
  id:5,
  name:'R',
},
  {
  id:5,
  name:'R',
},
  {
  id:5,
  name:'R',
},
  {
  id:6,
  name:'Ravi',
},
]
// const arr=[1,2,3,3,4,5,6,3]

// const newarr=arr.filter((item,index,self)=>{
//   return self.indexOf(item)===index;
//   // console.log(item,index)
// })
// console.log(newarr)
let myarr=[];
const newarr=arr.filter((item,index,self)=>{
let arr1=self.filter((item1)=>{
  return item1==item
})
  })
console.log(newarr)
