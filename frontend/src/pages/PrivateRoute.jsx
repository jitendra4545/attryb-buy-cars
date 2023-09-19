import React from 'react'
import { Navigate } from 'react-router-dom'

export const PrivateRoute = ({children}) => {
   let token=JSON.parse(localStorage.getItem("usertoken"))
   console.log(token)

   if(!token){
     return  <Navigate to='/login' />
   }

   return children

}
