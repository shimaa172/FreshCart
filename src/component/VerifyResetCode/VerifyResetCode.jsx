import React, { useContext, useState } from 'react'
import Style from './VerifyResetCode.css'
import { useFormik } from 'formik'
import axios from 'axios'
import { ThreeDots } from 'react-loader-spinner'
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'


export default function VerifyResetCode() {
  let navigate = useNavigate()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)


  async function VerifySubmit(values) {
    setLoading(true)
    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, values)

      .catch((err) => {
        setError(err.data.status);
        setLoading(false)
      })

    if (data.status === 'Success') {
      setLoading(false)
      toast.success("🦄 Next reset your password", { autoClose: 2000 });
      setTimeout(() => {
        navigate('/FreshCart/resetPassword')
      }, 3000);
    }
  }

  let validationSchema = Yup.object({
    resetCode: Yup.string('code inValid').required(' resetCode is required '),
  })

  let Formik = useFormik({
    initialValues: {
      resetCode: ''
    }, validationSchema, onSubmit: VerifySubmit
  })

  return <>
    <ToastContainer />
    <div className={`${Style.change_width}  bg-main-light rounded py-3 shadow mx-auto`}>
      <h1 className="text-center h3">Forgot Password</h1>
      {error ? <div className="alert alert-danger">{error}</div> : ''}
      <form onSubmit={Formik.handleSubmit} className='vstack gap-3'>
        <label htmlFor="resetCode">Reset Code:</label>
        <input onChange={Formik.handleChange} onBlur={Formik.handleBlur} placeholder='Your Reset Code...' value={Formik.values.resetCode} id="resetCode" type="text" name="resetCode" className="form-control " />
        {Formik.errors.resetCode && Formik.touched.resetCode ? <div className="alert alert-danger">{Formik.errors.resetCode}</div> : ''}
        {!loading ? <button disabled={!(Formik.isValid && Formik.dirty)} type="submit" className="btn mt-4 text-white bg-main"> Confirm </button> :
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
          </button>
        }
      </form>
    </div>
  </>
}
