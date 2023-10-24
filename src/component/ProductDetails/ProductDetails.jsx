import React, { useContext } from "react";
import Style from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";
import { BallTriangle } from "react-loader-spinner";
import { useQuery } from "react-query";
import axios from "axios";
import Slider from "react-slick";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

export default function ProductDetails() {
  let { AddToCart, setnumOfCartItems } = useContext(CartContext);

  async function PostCart(id) {
    let { data } = await AddToCart(id);
    console.log({ data });
    if (data.status === "success") {
      toast.success("added successfully to your cart", {
        duration: 5000,
        position: "bottom-right",
      });
      setnumOfCartItems(data.numOfCartItems);
    }
  }

  var settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  let { id } = useParams();
  function getProductDetails(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }
  let { data, isLoading } = useQuery("ProductDetails", () =>
    getProductDetails(id)
  );

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <link rel="shortcut icon" href="../../../src/assets/favicon_io/favicon.ico"></link>
        <title>{data?.data.data.title}</title>
      </Helmet>
      {isLoading ? (
        <div className=" w-100 vh-100 d-flex justify-content-center align-items-center">
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            wrapperClass={{}}
            wrapperStyle=""
            visible={true}
          />
        </div>
      ) : (
        <div className="row g-4 align-items-center">
          <div className="col-md-3">
            <Slider {...settings}>
              {data?.data.data.images.map((image) => (
                <div key={data?.data.data.id}>
                  <img
                    src={image}
                    className="w-100 cursor-pointer"
                    alt={data?.data.data.title}
                  />
                </div>
              ))}
            </Slider>
          </div>
          <div className="col-md-9">
            <div className="p-2">
              <div className={`cursor-pointer ${Style.product_details}`}>
                <header>
                  <h2>{data?.data.data.title}</h2>
                  <h3 className="h6 text-muted">
                    {data?.data.data.description}
                  </h3>
                  <h4 className="h6 font-sm text-main">
                    {data?.data.data.category.name}
                  </h4>
                </header>
                <footer className="d-flex justify-content-between">
                  <span className="small text-black">
                    {" "}
                    EGP{data?.data.data.price}.00
                  </span>
                  <div className="d-flex">
                    <i className="fas fa-star rating-color "></i>
                    <span className="small text-black">
                      {data?.data.data.ratingsAverage}
                    </span>
                  </div>
                </footer>
              </div>
              <button
                onClick={() => PostCart(data?.data.data.id)}
                className="btn text-white bg-main w-100 rounded-2"
              >
                {" "}
                + Add To Cart{" "}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
