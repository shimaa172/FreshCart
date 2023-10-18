import React from 'react'
import Style from './Notfound.module.css'
import { Link } from 'react-router-dom'



export default function Notfound() {
  return <>
  <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="text-center">
                <h1 className="display-1 fw-bold">404</h1>
                <p className="fs-3"> <span className="text-danger">Opps!</span> Page not found.</p>
                <p className="lead">
                    The page you’re looking for doesn’t exist.
                  </p>
                <Link id='link' to={'/'} className="btn mt-4 text-white bg-main text-decoration-none">Go Home</Link>
            </div>
        </div>
  </>
}
