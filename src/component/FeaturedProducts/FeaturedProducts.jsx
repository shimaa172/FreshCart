import React, { useContext, useState, useEffect } from "react";
import Style from "./FeaturedProducts.module.css";
import axios from "axios";
import { BallTriangle } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { WhishlistContext } from "../../Context/WhishlistContext";
import toast from "react-hot-toast";

export default function FeaturedProducts() {
  let { AddToCart, setnumOfCartItems } = useContext(CartContext);
  let { AddToWhishlist, getWhishlist, setCount } = useContext(WhishlistContext);
  const [WhishlistItems, setWhishlistItems] = useState(null);




  async function PostCart(id) {
    let { data } = await AddToCart(id);
    if (data.status === "success") {
      toast.success("added successfully to your cart", {
        duration: 5000,
        position: "bottom-right",
      });
      setnumOfCartItems(data.numOfCartItems)
    }
  }

  async function PostWhishlist(id) {
    let { data } = await AddToWhishlist(id);
    await getWhishlistItem();
    if (data.status === "success") {
      toast.success("added successfully to your Whishlist", {
        duration: 5000,
        position: "bottom-right",
      });
    }
  }


  function getFeaturedProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }
  let { data, isLoading } = useQuery("FeaturedProducts", getFeaturedProducts);


  async function getWhishlistItem() {
    let { data } = await getWhishlist();
    setWhishlistItems(data);
    if (data?.status == "success") {
      if (data.count == 0) {
        setCount(null)
      }
      else {
        setCount(data.count)
      }
    }
  }

  useEffect(() => {
    getWhishlistItem();
  }, []);

  return (
    <>
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
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4 justify-content-center">
          {data?.data.data.map((product) => (
            <div className="" key={product.id}>
              <div className="product position-relative p-2">
                <span role="button" className="heart">
                  {/* {checkAdding ? <i className="fas fa-heart-crack fs-1 text-main"></i>:<i onClick={() => PostWhishlist(product.id)} className="fas fa-heart fs-1 text-main"></i>} */}
                  <i onClick={() => PostWhishlist(product.id)} className="fas fa-heart fs-1 text-main"></i>
                </span>
                <Link
                  to={`/productDetails/${product.id}`}
                  className="text-decoration-none"
                >
                  <div className={`cursor-pointer ${Style.product_details}`}>
                    <header>
                      <img
                        className="w-100"
                        src={product.imageCover}
                        alt={product.title}
                      />
                      <h4 className="h6 font-sm text-main">
                        {product.category.name}
                      </h4>
                      <h3 className="h6 small text-black">{product.title}</h3>
                    </header>
                    <footer className="d-flex justify-content-between">
                      <span className="small text-black">
                        {" "}
                        EGP{product.price}.00{" "}
                      </span>
                      <div className="d-flex">
                        <i className="fas fa-star rating-color "></i>
                        <span className="small text-black">
                          {product.ratingsAverage}
                        </span>
                      </div>
                    </footer>
                  </div>
                </Link>
                <button
                  onClick={() => PostCart(product.id)}
                  className="btn text-white bg-main w-100 rounded-2"
                >
                  {" "}
                  + Add To Cart{" "}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
