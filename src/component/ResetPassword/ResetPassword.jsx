import React, { useContext } from 'react'
import Style from './ResetPassword.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from 'react-router-dom'
import { UserTokenContext } from '../../Context/UserTokenContext'


export default function ResetPassword() {
  let navigate = useNavigate()
  let { setUserToken } = useContext(UserTokenContext)

  async function resetPasswordSubmit(values) {
    let data = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values)


    if (data.status == 200) {
      localStorage.setItem('userToken', data.data.token)
      setUserToken(data.data.token)
      toast.success("🦄 Done successfully!", { autoClose: 2000 });
      setTimeout(() => {
        navigate('/')
      }, 3000);
    }
  }

  let validationSchema = Yup.object({
    email: Yup.string('email inValid').required('email is required'),
    newPassword: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, 'password must start with upperCase and any lowerCase or number from 5:10 ').required('password is required')
  })

  let Formik = useFormik({
    initialValues: {
      email: '',
      newPassword: ''
    }, validationSchema, onSubmit: resetPasswordSubmit
  })
  return <>
    <ToastContainer />
    <div className={`${Style.change_width} bg-main-light rounded p-3 shadow w-50 mx-auto`}>
      <h1 className="text-center h3">Forgot Password</h1>
      <form onSubmit={Formik.handleSubmit} className='vstack gap-3'>
        <label htmlFor="email">Email : </label>
        <input onChange={Formik.handleChange} onBlur={Formik.handleBlur} placeholder='Your Email' value={Formik.values.email} id="email" type="email" name="email" className="form-control " />
        {Formik.errors.email && Formik.touched.email ? <div className="alert alert-danger">{Formik.errors.email}</div> : ''}
        <label htmlFor="newPassword">newPassword : </label>
        <input onChange={Formik.handleChange} onBlur={Formik.handleBlur} value={Formik.values.newPassword} id="newPassword" placeholder='Your newPassword' type="password" name="newPassword" className="form-control" />
        {Formik.errors.newPassword && Formik.touched.newPassword ? <div className="alert alert-danger">{Formik.errors.newPassword}</div> : ''}
        <button disabled={!(Formik.isValid && Formik.dirty)} type="submit" className="btn mt-4 text-white bg-main"> Done </button> 
      </form>
    </div>
  </>
}
