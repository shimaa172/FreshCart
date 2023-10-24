import React from 'react'
import Style from './Categories.module.css'
import axios from 'axios'
import { BallTriangle } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { Helmet } from "react-helmet";


export default function Categories() {
  function getCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)

  }
  let { data, isLoading } = useQuery('Categories', getCategories)

  return <>
    <Helmet>
      <meta charSet="utf-8" />
      <link rel="shortcut icon" href="../../../src/assets/favicon_io/favicon.ico"></link>
      <title>Categories</title>
    </Helmet>
    {isLoading ? <div className=' w-100 vh-100 d-flex justify-content-center align-items-center'><BallTriangle
      height={100}
      width={100}
      radius={5}
      color="#4fa94d"
      ariaLabel="ball-triangle-loading"
      wrapperClass={{}}
      wrapperStyle=""
      visible={true} /></div> : <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4 justify-content-center">
      {data?.data.data.map((category) => <div className='' key={category._id}>
        <Link to={`/categoriesDetails/${category._id}`} className='text-decoration-none'>
          <div className='p-2'>
            <div className={`cursor-pointer ${Style.product_details}`}>
              <div className='card'>
                <img className="w-100 card-img-top" height="300" src={category.image} alt={category.title} />
                <h3 className="h6 text-main text-center text-main  p-3">{category.name}</h3>
              </div>
            </div>
          </div>
        </Link>
      </div>)}
    </div>}
  </>
}
