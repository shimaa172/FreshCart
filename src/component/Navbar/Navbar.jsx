import React, { useContext} from 'react'
import Style from './Navbar.module.css'
import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { UserTokenContext } from '../../Context/UserTokenContext'
import freshcart from '../../assets/images/freshcart-logo.svg'
import { CartContext } from '../../Context/CartContext'
import { WhishlistContext } from '../../Context/WhishlistContext'


export default function Navbar() {
  let { userToken, setUserToken } = useContext(UserTokenContext)
  let {numOfCartItems} =useContext(CartContext)
  let {count} =useContext(WhishlistContext)

  let navigate = useNavigate()
  function SignOut() {
    localStorage.removeItem('userToken')
    setUserToken(null)
    navigate('/login')
  }

  return <>
    <nav className="navbar navbar-expand-lg py-3 bg-light  fixed-top" >
      <div className=" container-fluid">
        <div className="me-3"><img src={freshcart} alt="freshCart" /></div>
        <button className={`navbar-toggler ${Style.changeToggler}`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {userToken ? <ul className="navbar-nav  mb-2 mb-lg-0">
            <li className="nav-item me-3">
              <NavLink id='link' className="nav-link  mt-3 mt-md-0 px-2" to={' '}>Home</NavLink>
            </li>
            <li className="nav-item me-3">
              <NavLink id='link' className="nav-link mt-3 mt-md-0 px-2" to={'products'}>Products</NavLink>
            </li>
            <li className="nav-item me-3">
              <NavLink id='link' className="nav-link mt-3 mt-md-0 px-2" to={'categories'}>Categories</NavLink>
            </li>
            <li className="nav-item me-3">
              <NavLink id='link' className="nav-link mt-3 mt-md-0 px-2" to={'brands'}>Brands</NavLink>
            </li>
          </ul> : ''}
          <ul className='navbar-nav ms-auto mb-2 mb-lg-0  justify-content-center align-items-center'>
            {userToken ? <>
              <li className='nav-item me-3 d-flex justify-content-center align-items-center '>
                <Link className="text-decoration-none text-dark position-relative" id='link' to={'Whishlist'}><i className="fa-solid fa-heart fs-2 mt-3 mt-md-0 pe-3 text-main cursor-pointer"></i><span className="span2 fs-6 fw-bold position-absolute top-50 start-50">{count}</span></Link>
                <div className='dropdown px-2 '>
                  <button type="button" data-bs-toggle="dropdown" aria-expanded="false" className={`dropdown-toggle ${Style.userbtn}`}>
                    <i className="fa-solid fa-user mt-md-0   text-main cursor-pointer"></i>
                  </button>
                  <ul className={`dropdown-menu ${Style.dropdownChange}`}>
                    <li>
                      <NavLink routerlinkactive="active-link" to={'forgot'} className="dropdown-item small" >Forgot Password</NavLink>
                    </li>
                    <li>
                      <NavLink routerlinkactive="active-link" to={'updatepass'} className="dropdown-item small">Update password</NavLink>
                    </li>
                    <li>
                      <NavLink routerlinkactive="active-link" to={'profile'} className="dropdown-item small" >Profile</NavLink>
                    </li>
                    <li>
                      <NavLink routerlinkactive="active-link" to={'allorders'} className="dropdown-item small">My Orders</NavLink>
                    </li>
                  </ul>
                </div>
                <Link className="text-decoration-none text-dark position-relative" id='link' to={'cart'}><i className="fa-solid fa-cart-shopping mt-3 mt-md-0 px-3 fs-5 text-main"></i><span className="span fs-6 fw-bold position-absolute top-50 start-50">{numOfCartItems}</span></Link>
                <Link id='link' to={'https://www.facebook.com/'} className="text-decoration-none text-dark">
                  <i className='fab fa-facebook mt-3 mt-md-0 px-2 cursor-pointer'></i>
                </Link>
                <Link id='link' to={'https://www.whatsapp.com/'} className="text-decoration-none text-dark">
                  <i className='fab fa-whatsapp mt-3 mt-md-0 px-2 cursor-pointer'></i>
                </Link>
              </li>
              <li className="nav-item me-3">
                <span onClick={() => SignOut()} className="nav-link mt-3 mt-md-0 pe-3 cursor-pointer">SignOut</span>
              </li></> : <><li className={`nav-item me-3 ${Style.changeWidth}`}>
                <NavLink id='link' className='nav-link mt-3 mt-md-0 px-3' to={'login'}>Login</NavLink>
              </li>
              <li className={`nav-item me-3 ${Style.changeWidth}`}>
                <NavLink id='link' className="nav-link mt-3 mt-md-0 px-3" to={'register'}>Register</NavLink>
              </li></>}
          </ul>
        </div>
      </div>
    </nav>
  </>
}
