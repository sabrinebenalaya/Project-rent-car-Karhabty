import React from 'react'
import { Navigate } from 'react-router-dom'

const AgencyRoute = ({ children}) =>{
  const token = localStorage.getItem("jwt");
  const role = localStorage.getItem("role");
  if(!token){
    return <Navigate to="/login" replace/> 
  }else{
     if(role !== "Agency"){
       return <Navigate to="/profil/" replace/> 
     }
  }
  return children
  
}

export default AgencyRoute