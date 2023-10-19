import React from 'react'
import Style from './ProtectedRoute.module.css'
import { Navigate, useLocation } from 'react-router-dom'



export default function ProtectedRoute(props) {

  const location = useLocation();
  const { pathname } = location;

  if (localStorage.getItem('userToken')) {
    if(pathname == '/FreshCart/' || pathname == '/FreshCart'){
      return <Navigate to={'/'} />
  
    }
    return props.children
  }
  
  else {
    return <Navigate to={'/login'} />
  }


}
