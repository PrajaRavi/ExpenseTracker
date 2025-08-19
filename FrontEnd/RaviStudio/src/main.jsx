import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { useTranslation } from 'react-i18next'
import { ToastContainer } from 'react-toastify';

// import { AppContextProvider } from './Component/ContextAPI.jsx';

createRoot(document.getElementById('root')).render(
  <>
  

    <App />
    <ToastContainer
position="top-right"
autoClose={1999}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"

/>
  </>

  
)
