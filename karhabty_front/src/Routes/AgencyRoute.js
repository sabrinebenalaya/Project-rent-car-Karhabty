import React from 'react'
import { Navigate } from 'react-router-dom'

const AgencyRoute = ({user,role, children}) =>{
  if(!user.isConnected){
    return <Navigate to="/login" replace/> 
  }else{
     if(role === "Agency"){
       return <Navigate to="/profil/" replace/> 
     }
  }
  return children
  
}

export default AgencyRoute