import React, { useContext, useState } from 'react'
import Style from './Login.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { ThreeDots } from 'react-loader-spinner'
import { toast, ToastContainer } from "react-toastify";
import { UserTokenContext } from '../../Context/UserTokenContext'
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from "react-helmet";


export default function Login() {

  let navigate = useNavigate()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  let { setUserToken } = useContext(UserTokenContext)

  async function loginSubmit(values) {
    setLoading(true)
    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .catch((err) => {
        setError(err.response.data.message);
        setLoading(false)
      })
    if (data.message == 'success') {
      setLoading(false)
      localStorage.setItem('userToken', data.token)
      localStorage.setItem('userName', data.user.name)
      setUserToken(data.token)

      toast.success("🦄 You are logged in successfully!", { autoClose: 2000 });
      setTimeout(() => {
        navigate('/')
      }, 3000);
    }
  }

  let validationSchema = Yup.object({
    email: Yup.string('email inValid').required('email is required'),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, 'password must start with upperCase and any lowerCase or number from 5:10 ').required('password is required')
  })

  let Formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    }, validationSchema, onSubmit: loginSubmit
  })

  return <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Login</title>
    </Helmet>
    <ToastContainer />
    <div className='w-75 mx-auto px-5'>
      <h2>Login Now:</h2>
      {error ? <div className="alert alert-danger">{error}</div> : ''}
      <form onSubmit={Formik.handleSubmit}>
        <label htmlFor="email">email : </label>
        <input onChange={Formik.handleChange} onBlur={Formik.handleBlur} value={Formik.values.email} id="email" type="email" name="email" className="form-control mb-2 " />
        {Formik.errors.email && Formik.touched.email ? <div className="alert alert-danger">{Formik.errors.email}</div> : ''}
        <label htmlFor="password">password : </label>
        <input onChange={Formik.handleChange} onBlur={Formik.handleBlur} value={Formik.values.password} id="password" type="password" name="password" className="form-control mb-2 " />
        {Formik.errors.password && Formik.touched.password ? <div className="alert alert-danger">{Formik.errors.password}</div> : ''}
        <div className=" d-flex justify-content-between align-items-center">
          {!loading ? <button disabled={!(Formik.isValid && Formik.dirty)} type="submit" className="btn mt-4 text-white bg-main"> Login </button> :
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
          <Link id='link'  to={'/forgot'}>ForgotPassword</Link>
        </div>
      </form>
    </div>
  </>
}
