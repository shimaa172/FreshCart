import React, { useState } from 'react'
import Style from './Register.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ThreeDots } from 'react-loader-spinner'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from "react-helmet";



export default function Register() {
  let navigate = useNavigate()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function registerSubmit(values) {
    setLoading(true)
    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .catch((err) => {
        setError(err.response.data.message);
        setLoading(false)
      })
    if (data.message == 'success') {
      setLoading(false)
      toast.success("🦄You have been Registered", { autoClose: 2000 });
      setTimeout(() => {
        navigate('/login');
      }, 3000);

    }
  }

  let validationSchema = Yup.object({
    name: Yup.string().min(3, 'name must be more than 3 character').max(15, 'name must be less than 3 character').required('name is required'),
    email: Yup.string('email inValid').required('email is required'),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, 'password must start with upperCase and any lowerCase or number from 5:10 ').required('password is required'),
    rePassword: Yup.string().oneOf([Yup.ref('password')], 'rePassword must math password').required('rePassword is required'),
    phone: Yup.string().matches(/^01[0125][0-9]{8}$/, 'phone must be egyption number').required('phone is required'),
  })

  let Formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    }, validationSchema, onSubmit: registerSubmit
  })


  return <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Register</title>
    </Helmet>
    <ToastContainer />
    <div className='w-75 mx-auto px-5'>
      <h2>Registert Now:</h2>
      {error ? <div className="alert alert-danger">{error}</div> : ''}
      <form onSubmit={Formik.handleSubmit}>
        <label htmlFor="name">name : </label>
        <input onChange={Formik.handleChange} value={Formik.values.name} onBlur={Formik.handleBlur} id="name" type="text" name="name" className="form-control mb-2 " />
        {Formik.errors.name && Formik.touched.name ? <div className="alert alert-danger">{Formik.errors.name}</div> : ''}
        <label htmlFor="email">email : </label>
        <input onChange={Formik.handleChange} value={Formik.values.email} onBlur={Formik.handleBlur} id="email" type="email" name="email" className="form-control mb-2 " />
        {Formik.errors.email && Formik.touched.email ? <div className="alert alert-danger">{Formik.errors.email}</div> : ''}
        <label htmlFor="password">password : </label>
        <input onChange={Formik.handleChange} value={Formik.values.password} onBlur={Formik.handleBlur} id="password" type="password" name="password" className="form-control mb-2 " />
        {Formik.errors.password && Formik.touched.password ? <div className="alert alert-danger">{Formik.errors.password}</div> : ''}
        <label htmlFor="rePassword">rePassword : </label>
        <input onChange={Formik.handleChange} value={Formik.values.rePassword} onBlur={Formik.handleBlur} id="rePassword" type="password" name="rePassword" className="form-control mb-2 " />
        {Formik.errors.rePassword && Formik.touched.rePassword ? <div className="alert alert-danger">{Formik.errors.rePassword}</div> : ''}
        <label htmlFor="phon">phone : </label>
        <input onChange={Formik.handleChange} value={Formik.values.phone} onBlur={Formik.handleBlur} id="phon" type="tel" name="phone" className="form-control mb-2 " />
        {Formik.errors.phone && Formik.touched.phone ? <div className="alert alert-danger">{Formik.errors.phone}</div> : ''}
        {!loading ? <button disabled={!(Formik.isValid && Formik.dirty)} type="submit" className="btn mt-4 text-white bg-main"> Register </button> :
          <button type="button" className="btn mt-4 text-white bg-main">
            <ThreeDots
              height="25"
              width="55"
              radius="5"
              color="#ffff"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          </button>}
      </form>
    </div>
  </>
}
