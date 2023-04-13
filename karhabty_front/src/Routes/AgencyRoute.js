import React from 'react'
import { Navigate } from 'react-router-dom'

const AgencyRoute = ({user, children}) =>{
   if(!user.isConnected){
     return <Navigate to="/login" replace/> 
   }else{
      if(user.role !== "Agency"){
        return <Navigate to="/" replace/> 
      }
   }
   return children
}

export default AgencyRoute