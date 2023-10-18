import React from 'react'
import Style from './MainSlider.module.css'
import Slider from "react-slick"
import slide1 from '../../assets/images/slider-image-1.jpeg'
import slide2 from '../../assets/images/slider-image-2.jpeg'
import slide3 from '../../assets/images/slider-image-3.jpeg'
import image1 from '../../assets/images/slider-1.jpeg'
import image2 from '../../assets/images/slider-3.jpeg'

export default function MainSlider() {
  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return <>
    <div className='row g-0 pb-5'>
      <div className='col-md-9'>
        <Slider {...settings}>
          <img src={slide1} alt='slide1' className='w-100' height="400" />
          <img src={slide2} alt='slide2' className='w-100' height="400" />
          <img src={slide3} alt='slide3' className='w-100' height="400" />
        </Slider>
      </div>
      <div className='col-md-3 d-flex flex-column d-none d-md-block'>
        <img src={image1} alt='image1' className='w-100' height="200" />
        <img src={image2} alt='image2' className='w-100' height="200" />
      </div>
    </div>
  </>
}
