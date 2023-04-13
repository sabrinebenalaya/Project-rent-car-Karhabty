import React from 'react'
import { Navigate } from 'react-router-dom'

const UserRoute = ({user, children}) =>{
   if(!user.isConnected){
     return <Navigate to="/login" replace/> 
   }else{
      if(user.role !== "User"){
        return <Navigate to="/profilUser" replace/> 
      }
   }
   return children
}

export default UserRoute