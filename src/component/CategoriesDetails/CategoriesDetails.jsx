import React, { useContext, useEffect, useState } from 'react'
import Style from './CategoriesDetails.module.css'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { BallTriangle } from 'react-loader-spinner'
import axios from 'axios'
import { Helmet } from "react-helmet";
import { CartContext } from '../../Context/CartContext'

export default function CategoriesDetails() {
  let { GetSubCategories } = useContext(CartContext)
  const [subCategories, setSubCategories] = useState(null)


  let { id } = useParams()
  function getProductDetails(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
  }
  let { data, isLoading } = useQuery('ProductDetails', () => getProductDetails(id))

  async function GetAllSubCategories() {
    let { data } = await GetSubCategories(id)
    setSubCategories(data)
  }

  useEffect(() => {
    GetAllSubCategories();
  }, []);

  return <>
    <Helmet>
      <meta charSet="utf-8" />
      <link rel="shortcut icon" href="../../../src/assets/favicon_io/favicon.ico"></link>
      <title>{data?.data.data.name}</title>
    </Helmet>
    {isLoading ? <div className=' w-100 vh-100 d-flex justify-content-center align-items-center'><BallTriangle
      height={100}
      width={100}
      radius={5}
      color="#4fa94d"
      ariaLabel="ball-triangle-loading"
      wrapperClass={{}}
      wrapperStyle=""
      visible={true} /></div> : <div className='w-75 mx-auto bg-main-light p-4 rounded shadow'>
      <div className='row align-items-center g-4'>
        <div className='col-md-4'>
          <div>
            <img className='w-100 rounded' src={data?.data.data.image} alt={data?.data.data.name} />
          </div>
        </div>
        <div className='col-md-8'>
          <div>
            <h3>{data?.data.data.name}</h3>
            <h4>Sub Categories:</h4>
            {subCategories?.data.map((subCategory) =>
              <span key={subCategory._id} className="badge bg-secondary me-3">{subCategory.name}</span>
            )}
          </div>
        </div>
      </div>
    </div>}
  </>
}
