import React, { useContext, useState } from 'react'
import Style from './Checkout.module.css'
import { Helmet } from "react-helmet";
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast, ToastContainer } from "react-toastify";
import {OrderContext} from "../../Context/OrderContext"
import { useParams } from 'react-router-dom'


export default function Checkout() {

  let { checkout} = useContext(OrderContext);
  let {id} = useParams()

  async function CheckoutSubmit(values) {
    let { data } = await checkout(id,values);
    if (data.status == 'success') {
      toast.success("🦄Your checkout is done successfully!", { autoClose: 2000 });
      setTimeout(() => {
       window.location.href = data.session.url;
      }, 3000);

    }
  }


  let validationSchema = Yup.object({
    details: Yup.string().required('details is required'),
    phone: Yup.string().matches(/^01[0125][0-9]{8}$/, 'phone must be egyption number').required('phone is required'),
    city: Yup.string().required('city is required')
  })

  let Formik = useFormik({
    initialValues: {
        details:' ',
        phone:' ',
        city: ' '
    }, validationSchema, onSubmit:CheckoutSubmit
  })

  return <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Checkout</title>
    </Helmet>
    <ToastContainer />
    <div className={`${Style.change_width} bg-main-light rounded py-3 shadow  mx-auto`}>
      <h1 className="h3 text-center">shipping Address</h1>
      <form onSubmit={Formik.handleSubmit} className=' gap-3 w-75 mx-auto '>
        <label htmlFor="details">Details: </label>
        <input onChange={Formik.handleChange} onBlur={Formik.handleBlur} value={Formik.values.details}  placeholder='Your Details' id="details" type="text" name="details" className="form-control mb-3" />
        {Formik.errors.details && Formik.touched.details ? <div className="alert alert-danger">{Formik.errors.details}</div> : ''}
        <label htmlFor="phon">phone: </label>
        <input onChange={Formik.handleChange} value={Formik.values.phone} onBlur={Formik.handleBlur} placeholder='Your Phone' id="phon" type="tel" name="phone" className="form-control mb-3" />
        {Formik.errors.phone && Formik.touched.phone ? <div className="alert alert-danger">{Formik.errors.phone}</div> : ''}
        <label htmlFor="city">City: </label>
        <input onChange={Formik.handleChange} onBlur={Formik.handleBlur} value={Formik.values.city} placeholder='Your city' id="city" type="text" name="city" className="form-control mb-3" />
        {Formik.errors.city && Formik.touched.city ? <div className="alert alert-danger">{Formik.errors.city}</div> : ''}
        <button disabled={!(Formik.isValid && Formik.dirty)} type="submit" className="btn mt-4 text-white bg-main w-100"> Next </button>
      </form >
    </div >
  </>
}
