import React, { useEffect } from 'react'
import Style from './Brands.module.css'
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from 'react-redux';
import { getBrands } from '../../Redux/brandsSlice';
import { BallTriangle } from 'react-loader-spinner'
import { Link } from 'react-router-dom'



export default function Brands() {
  let { brands, loading } = useSelector((state) => state.brand)
  let dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBrands())
  }, [])

  return <>
    <Helmet>
      <meta charSet="utf-8" />
      <link rel="shortcut icon" href="../../../src/assets/favicon_io/favicon.ico"></link>
      <title>Brands</title>
    </Helmet>
    {loading ? <div className=' w-100 vh-100 d-flex justify-content-center align-items-center'><BallTriangle
      height={100}
      width={100}
      radius={5}
      color="#4fa94d"
      ariaLabel="ball-triangle-loading"
      wrapperClass={{}}
      wrapperStyle=""
      visible={true} /></div> :
      <div>
        <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4'>
          {brands.map((brand) =>
            <Link key={brand._id} to={`/brandDetails/${brand._id}`} className='text-decoration-none'>
              <div role="button" className='col'>
                <div className='card'>
                  <img className='card-img-top' src={brand.image} alt={brand.name} />
                  <div className='card-body'>
                    <h4 className="card-title text-main">{brand.name}</h4>
                  </div>
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>}
  </>
}
