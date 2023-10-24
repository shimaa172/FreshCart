import React, { useContext} from 'react'
import Style from './UpdatePassword.module.css'
import { Helmet } from "react-helmet";
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams } from 'react-router-dom'
import { UserTokenContext } from "../../Context/UserTokenContext";


export default function UpdatePassword() {
  let { UpdatePassword } = useContext(UserTokenContext);
  let navigate = useNavigate()

  async function UpdatePasswordSubmit(values) {
    let { data } = await UpdatePassword(values)
    if (data.message == 'success') {
      toast.success("🦄Your password is updated successfully!", { autoClose: 2000 });
      setTimeout(() => {
        navigate('/FreshCart/login');
      }, 3000);

    }
  }


  let validationSchema = Yup.object({
    currentPassword: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, 'password must start with upperCase and any lowerCase or number from 5:10 ').required('currentPassword is required'),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, 'password must start with upperCase and any lowerCase or number from 5:10 ').required('password is required'),
    rePassword: Yup.string().oneOf([Yup.ref('password')], 'rePassword must math password').required('rePassword is required')
  })

  let Formik = useFormik({
    initialValues: {
      currentPassword: '',
      password: '',
      rePassword: ''
    }, validationSchema, onSubmit: UpdatePasswordSubmit
  })

  return <>
    <Helmet>
      <meta charSet="utf-8" />
      <link rel="shortcut icon" href="../../../src/assets/favicon_io/favicon.ico"></link>
      <title>UpdatePassword</title>
    </Helmet>
    <ToastContainer />
    <div className={`${Style.change_width} bg-main-light  mx-auto rounded shadow py-3`}>
      <h1 className="h4 text-center">Update User Password</h1>
      <form onSubmit={Formik.handleSubmit} className='vstack gap-3 w-75 mx-auto '>
        <div className='form-item'>
          <label htmlFor="currentPassword">Current Password: </label>
          <div className='position-relative'>
            <input onChange={Formik.handleChange} onBlur={Formik.handleBlur} value={Formik.values.currentPassword} placeholder='Your Current Password' id="currentPassword" type="password" name="currentPassword" className="form-control mb-2 " />
            <span role="button" className="position-absolute top-50 end-0 translate-middle-y me-2">
              <i className="fas fa-eye"></i>
            </span>
          </div>
          {Formik.errors.currentPassword && Formik.touched.currentPassword ? <div className="alert alert-danger">{Formik.errors.currentPassword}</div> : ''}
        </div>
        <div className='form-item'>
          <label htmlFor="password">password: </label>
          <div className='position-relative'>
            <input onChange={Formik.handleChange} value={Formik.values.password} onBlur={Formik.handleBlur} placeholder='Your Password' id="password" type="password" name="password" className="form-control mb-2 " />
            <span role="button" className="position-absolute top-50 end-0 translate-middle-y me-2">
              <i className="fas fa-eye"></i>
            </span>
          </div>
          {Formik.errors.password && Formik.touched.password ? <div className="alert alert-danger">{Formik.errors.password}</div> : ''}
        </div>
        <div className='form-item'>
          <label htmlFor="rePassword">rePassword: </label>
          <div className='position-relative'>
            <input onChange={Formik.handleChange} value={Formik.values.rePassword} onBlur={Formik.handleBlur} placeholder='Confirm Password' id="rePassword" type="password" name="rePassword" className="form-control mb-2 " />
            <span role="button" className="position-absolute top-50 end-0 translate-middle-y me-2">
              <i className="fas fa-eye"></i>
            </span>
          </div>
          {Formik.errors.rePassword && Formik.touched.rePassword ? <div className="alert alert-danger">{Formik.errors.rePassword}</div> : ''}
        </div>
        <button disabled={!(Formik.isValid && Formik.dirty)} type="submit" className="btn mt-4 text-white bg-main"> Change </button>
      </form>
    </div>
  </>
}
