import React, { useContext, useEffect } from 'react'
import Style from './Layout.module.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import { UserTokenContext } from '../../Context/UserTokenContext'

export default function Layout() {



  let { setUserToken } = useContext(UserTokenContext)

  

  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      setUserToken(localStorage.getItem('userToken'))
    }

    // Prompt confirmation when reload page is triggered
    window.onbeforeunload = () => { return "" };
        
    // Unmount the window.onbeforeunload event
    return () => { window.onbeforeunload = null };
    

  }, [])
  return <>
    <Navbar />
    <div className=" container-fluid mt-5 min-vh-100 py-5">
      <Outlet></Outlet>
    </div>
    <Footer />
  </>
}
