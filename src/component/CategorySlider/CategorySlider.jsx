import React from 'react'
import Style from './CategorySlider.module.css'
import { useQuery } from 'react-query'
import axios from 'axios'
import Slider1 from "react-slick"
import Slider2 from "react-slick"
import Slider3 from "react-slick"
import Slider4 from "react-slick"
import { BallTriangle } from 'react-loader-spinner'


export default function CategorySlider() {

  var settings1 = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 7,
    slidesToScroll: 1,
  };

  var settings2 = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 5,
    slidesToScroll: 1,
  };

  var settings3 = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  var settings4 = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 2,
    slidesToScroll: 1,
  };


  function getCategorySlider() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }
  let { data, isLoading } = useQuery('Categories', getCategorySlider)

  return <>
    {!isLoading ? <div>
      <h2>Shop Popular Categories</h2>
      <div className='row'>
        <Slider1 {...settings1} className={`${Style.slider1}`}>
          {data?.data.data.map((category) => <div className="" key={category._id}>
            <div>
              <div className={`cursor-pointer ${Style.product_details}`}>
                <div >
                  <img className="w-100 card-img-top" height="200" src={category.image} alt={category.title} />
                  <h3 className="h6 text-main text-center text-main  p-3">{category.name}</h3>
                </div>
              </div>
            </div>
          </div>)}
        </Slider1>
        <Slider2 {...settings2} className={`${Style.slider2}`}>
          {data?.data.data.map((category) => <div className="" key={category._id}>
            <div>
              <div className={`cursor-pointer ${Style.product_details}`}>
                <div >
                  <img className="w-100 card-img-top" height="200" src={category.image} alt={category.title} />
                  <h3 className="h6 text-main text-center text-main  p-3">{category.name}</h3>
                </div>
              </div>
            </div>
          </div>)}
        </Slider2>
        <Slider3 {...settings3} className={`${Style.slider3}`}>
          {data?.data.data.map((category) => <div className="" key={category._id}>
            <div>
              <div className={`cursor-pointer ${Style.product_details}`}>
                <div >
                  <img className="w-100 card-img-top" height="200" src={category.image} alt={category.title} />
                  <h3 className="h6 text-main text-center text-main  p-3">{category.name}</h3>
                </div>
              </div>
            </div>
          </div>)}
        </Slider3>
        <Slider4 {...settings4} className={`${Style.slider4}`}>
          {data?.data.data.map((category) => <div className="" key={category._id}>
            <div>
              <div className={`cursor-pointer ${Style.product_details}`}>
                <div >
                  <img className="w-100 card-img-top" height="200" src={category.image} alt={category.title} />
                  <h3 className="h6 text-main text-center text-main  p-3">{category.name}</h3>
                </div>
              </div>
            </div>
          </div>)}
        </Slider4>
      </div>
    </div> : <div className=' w-100 vh-100 d-flex justify-content-center align-items-center'><BallTriangle
      height={100}
      width={100}
      radius={5}
      color="#4fa94d"
      ariaLabel="ball-triangle-loading"
      wrapperClass={{}}
      wrapperStyle=""
      visible={true} /></div>}
  </>
}
