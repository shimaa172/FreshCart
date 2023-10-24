import React, { useState } from 'react'
import Style from './Footer.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



export default function Footer() {
  let navigate = useNavigate()

  async function formSubmit() {
    toast.success("🦄 Shared successfully!", { autoClose: 2000 });
    setTimeout(() => {
      navigate('/')
    }, 3000);


  }

  let validationSchema = Yup.object({
    email: Yup.string('email inValid').required('email is required'),
  })

  let Formik = useFormik({
    initialValues: {
      email: '',
    }, validationSchema, onSubmit: formSubmit
  })

  return <>
    <ToastContainer />
    <footer className="footer bg-light">
      <div className=" p-4">
        <h4>Get The FreshCart App</h4>
        <p>We Will Send You a Link.Open it on Your Phone</p>
        <form onSubmit={Formik.handleSubmit} className={`d-flex justify-content-around align-items-baseline ${Style.changeDirection}`}>
          <div className="w-75">
            <input onChange={Formik.handleChange} onBlur={Formik.handleBlur} value={Formik.values.email} id="Email" type="email" name="email" className="form-control mb-2 " placeholder='Email' />
            {Formik.errors.email && Formik.touched.email ? <div className="alert alert-danger">{Formik.errors.email}</div> : ''}
          </div>
          <button disabled={!(Formik.isValid && Formik.dirty)} type="submit" className="btn text-white bg-main"> Share App Link </button>
        </form>
        <hr className="my-2 mx-5 m-auto" />
        <p className="text-center p-color m-0">Copyright © My Website 2023</p>
      </div>
    </footer>
  </>
}
