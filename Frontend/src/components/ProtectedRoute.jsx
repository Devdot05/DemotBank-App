// components/ProtectedRoute.jsx
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios'

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    axios.get("https://demotbank-app-1.onrender.com/me", {
      withCredentials: true,
    })
    .then(res => {
      setIsAuthenticated(true)
      setLoading(false)
    //   console.log(res);
      
    })
    .catch(err => {
      setIsAuthenticated(false)
      setLoading(false)
      console.log(err);
      
    })
  }, [])

  if (loading) return 
  <div className='text-center background vh-100' style={{paddingTop: "300px"}}>
        <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>
             

  return isAuthenticated ? children : <Navigate to="/login" />
}

export default ProtectedRoute
