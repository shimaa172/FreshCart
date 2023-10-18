import React, { useContext, useEffect, useState } from 'react'
import Style from './Profile.module.css'
import { Helmet } from "react-helmet";
import { useFormik } from 'formik'
import * as Yup from 'yup'
import 'react-toastify/dist/ReactToastify.css';
import { UserTokenContext } from '../../Context/UserTokenContext'
import toast from "react-hot-toast";



export default function Profile() {
  let { addAddress, removeaddAddress, getAddress } = useContext(UserTokenContext);
  const [userData, setUserData] = useState(null);

  let UserName = localStorage.getItem('userName')


  async function getAddressItems() {
    let { data } = await getAddress();
    setUserData(data.data);
  }

  useEffect(() => {
    getAddressItems();
  }, []);



  async function addAddressSubmit(values) {
    let { data } = await addAddress(values);
    if (data.status === "success") {
      toast.success("Your address added successfully", {
        duration: 5000,
        position: "bottom-right",
      });
    }
    await getAddressItems();

  }

  async function removeItem(id) {
    let { data } = await removeaddAddress(id);
    if (data.status === "success") {
      toast.success("Your address removed successfully", {
        duration: 5000,
        position: "bottom-right",
      });
    }
    await getAddressItems();
  }

  let validationSchema = Yup.object({
    name: Yup.string().min(3, 'name must be more than 3 character').max(15, 'name must be less than 3 character').required('name is required'),
    phone: Yup.string().matches(/^01[0125][0-9]{8}$/, 'phone must be egyption number').required('phone is required'),
  })

  let Formik = useFormik({
    initialValues: {
      name: '',
      details: '',
      phone: '',
      city: ''
    }, validationSchema, onSubmit: addAddressSubmit
  })


  return <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Profile</title>
    </Helmet>
    <div>
      <h1 className="text-center">Hello Mr:{UserName}</h1>
      {userData && userData.length ? <div className={`table-responsive table-data ${Style.tableScroll}`}>
        <table className='table'>
          <thead>
            <tr className='table-primary'>
              <th>Name:</th>
              <th>Details:</th>
              <th>Phone:</th>
              <th>City:</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {userData?.map((i) =>
              <tr key={i._id} className='small position-relative'>
                <td>{i.name}</td>
                <td>{i.details}</td>
                <td>{i.phone}</td>
                <td>{i.city}</td>
                <td>
                  <span role="button" onClick={() => removeItem(i._id)} className={`position-absolute end-0 top-50 translate-middle-y me-4 ${Style.delete}`}>
                    <i className="fas fa-trash text-danger fa-xl"></i>
                  </span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div> : ''}
      <form onSubmit={Formik.handleSubmit} className='border rounded p-3 shadow mt-5 '>
        <div className='row g-3'>
          <div className='col-md-6 col-lg-4 col-xl-3'>
            <input onChange={Formik.handleChange} value={Formik.values.name} onBlur={Formik.handleBlur} id="name" type="text" placeholder='Name' name="name" className="form-control" />
            {Formik.errors.name && Formik.touched.name ? <div className="alert alert-danger mt-2">{Formik.errors.name}</div> : ''}
          </div>
          <div className='col-md-6 col-lg-4 col-xl-3'>
            <input onChange={Formik.handleChange} value={Formik.values.details} onBlur={Formik.handleBlur} id="details" type="text" placeholder='Details' name="details" className="form-control" />
          </div>
          <div className='col-md-6 col-lg-4 col-xl-3'>
            <input onChange={Formik.handleChange} value={Formik.values.phone} onBlur={Formik.handleBlur} id="phon" type="tel" placeholder='Phone' name="phone" className="form-control" />
            {Formik.errors.phone && Formik.touched.phone ? <div className="alert alert-danger mt-2">{Formik.errors.phone}</div> : ''}
          </div>
          <div className='col-md-6 col-lg-4 col-xl-3'>
            <input onChange={Formik.handleChange} value={Formik.values.city} onBlur={Formik.handleBlur} id="city" type="text" placeholder='City' name="city" className="form-control" />
          </div>
          <button disabled={!(Formik.isValid && Formik.dirty)} type="submit" className="btn text-white bg-main w-100">ADD ADDRESS</button>
        </div>
      </form>
    </div>
  </>
}
