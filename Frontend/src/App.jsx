import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './pages/Layout'
import UserSignup from './pages/UserSignup'
import UserLogin from './pages/UserLogin'
import Dashboard from './pages/Dashboard' 
import Aos from 'aos'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import AllTransaction from './pages/AllTransaction'
import Goal from './pages/Goal'
import Investment from './pages/Investment'
import About from './pages/About'
import Contact from './pages/Contact'
import ProtectedRoute from './components/ProtectedRoute'
function App() {
  const [count, setCount] = useState(0)
  const token = localStorage.tokens 
  // console.log(token);
  
  useEffect(()=>{
    Aos.init();

  }, [])

  return (
    <>
       <Routes>
          <Route path='/' element={<Layout/>}/>
          <Route path='/signup' element={<UserSignup/>}/>
          <Route path='/login' element={<UserLogin/>}/>
          <Route path='/' element={ <Navigate to = '/login'/>}/>
          <Route path='/dashboard/:id' element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
          <Route path='/allTransaction/:currentUserId' element={<AllTransaction/>}/>
          <Route path='/goal/:id' element={<Goal/>}/>
          <Route path='/investment/:id' element={<Investment/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/>
          {/* <Route path='/user/ :id' element={<user/>}/> */}
          
       </Routes>
    </>
  )
}

export default App
