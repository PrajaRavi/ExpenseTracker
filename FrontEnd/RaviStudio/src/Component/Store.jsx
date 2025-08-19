import { createContext, useEffect, useState } from "react";

export const AppContext=createContext({
  

  
  
  
})
export const AppProvider=({chidren})=>{
 

  return (
    <AppContext.Provider value={{data1,setdata}}>
{chidren}
    </AppContext.Provider>
  )
}