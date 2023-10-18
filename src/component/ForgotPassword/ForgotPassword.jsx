import React from 'react'
import Style from './ForgotPassword.module.css'
import { Helmet } from "react-helmet";
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from 'react-router-dom'




export default function ForgotPassword() {
  let navigate = useNavigate()

  async function forgotPasswordSubmit(values) {
    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, values)
    if (data.statusMsg === 'success') {
      toast.success("🦄 Next reset code sent to your email!", { autoClose: 2000 });
      setTimeout(() => {
        navigate('/verifyCode')
      }, 3000);
    }
  }

  let validationSchema = Yup.object({
    email: Yup.string('email inValid').required('email is required'),
  })

  let Formik = useFormik({
    initialValues: {
      email: ''
    }, validationSchema, onSubmit: forgotPasswordSubmit
  })

  return <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>ForgotPassword</title>
    </Helmet>
    <ToastContainer />
    <div className={` ${Style.change_width} bg-main-light rounded p-3 shadow w-50 mx-auto`}>
      <h1 className="text-center h3">Forgot Password</h1>
      <form onSubmit={Formik.handleSubmit} className='vstack gap-3'>
        <label htmlFor="email">Email : </label>
        <input onChange={Formik.handleChange} onBlur={Formik.handleBlur} placeholder='Your Email' value={Formik.values.email} id="email" type="email" name="email" className="form-control " />
        {Formik.errors.email && Formik.touched.email ? <div className="alert alert-danger">{Formik.errors.email}</div> : ''}
        <button disabled={!(Formik.isValid && Formik.dirty)} type="submit" className="btn mt-4 text-white bg-main"> Next </button>
      </form>
    </div>
  </>
}
