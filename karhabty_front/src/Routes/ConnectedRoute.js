import React from 'react'
import { Navigate } from 'react-router-dom'

const ConnectedRoute = ({ children}) =>{
  const token = localStorage.getItem("jwt")
   if(!token){
     return <Navigate to="/login" replace/> 
   }
   return children
}

export default ConnectedRoute