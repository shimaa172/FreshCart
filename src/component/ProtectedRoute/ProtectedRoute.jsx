import React from 'react'
import Style from './ProtectedRoute.module.css'
import { Navigate, useLocation } from 'react-router-dom'




export default function ProtectedRoute(props) {
  let location = useLocation()
  // console.log(location.pathname)

  if (localStorage.getItem('userToken')) {
    // return props.children
    return <>
    <Navigate to={`${location.pathname}`} />
    {props.children}
    </>
  }
  else {
    return <Navigate to={'/login'} />
  }

}
