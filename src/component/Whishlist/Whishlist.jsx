import React, { useContext, useEffect, useState } from "react";
import { WhishlistContext } from "../../Context/WhishlistContext";
import { CartContext } from "../../Context/CartContext";
import Style from "./Whishlist.module.css";
import { Helmet } from "react-helmet";
import { BallTriangle } from "react-loader-spinner";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Whishlist() {
  let { getWhishlist, removeWhishlistItem, setCount } = useContext(WhishlistContext);
  let { AddToCart, setnumOfCartItems } = useContext(CartContext);
  const [WhishlistItems, setWhishlistItems] = useState(null)


  async function removeItem(id) {
    let { data } = await removeWhishlistItem(id);
    await getWhishlistItem();
    if (data.status === "success") {
      toast.success("removed successfully from your Whishlist", {
        duration: 5000,
        position: "bottom-right",
      });
    }
  }


  async function PostCart(id) {
    let { data } = await AddToCart(id);
    if (data.status == "success") {
      toast.success("added successfully to your cart", {
        duration: 5000,
        position: "bottom-right",
      });
      setnumOfCartItems(data.numOfCartItems)
    }
  }

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
      <Helmet>
        <meta charSet="utf-8" />
        <title>Whishlist</title>
      </Helmet>
      {WhishlistItems? <>{WhishlistItems.data.length ?
        <div>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 row-cols-xl-6 justify-content-center">
            {WhishlistItems?.data.map((product) => (
              <div key={product._id} className="col">
                <div className="product position-relative p-2">
                  <span role="button" className="heart">
                    <i
                      onClick={() => removeItem(product._id)}
                      className="fas fa-heart-crack fs-1 text-main"
                    ></i>
                  </span>
                  <Link
                    to={`/productDetails/${product._id}`}
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
                          <ul className="d-flex mb-0 list-unstyled">
                            <li className="ng-star-inserted">
                              <i className="fas fa-star rating-color ng-star-inserted"></i>
                            </li>
                            <li className="ng-star-inserted">
                              <i className="fas fa-star rating-color ng-star-inserted"></i>
                            </li>
                            <li className="ng-star-inserted">
                              <i className="fas fa-star rating-color ng-star-inserted"></i>
                            </li>
                            <li className="ng-star-inserted">
                              <i className="fas fa-star rating-color ng-star-inserted"></i>
                            </li>
                            <li className="ng-star-inserted"></li>
                            <li className="ng-star-inserted">
                              <i className="fas fa-star-half rating-color"></i>
                            </li>
                          </ul>
                          <span className="small text-black">
                            {product.ratingsAverage}
                          </span>
                        </div>
                      </footer>
                    </div>
                  </Link>
                  <button
                    onClick={() => PostCart(product._id)}
                    className="btn text-white bg-main w-100 rounded-2"
                  >
                    {" "}
                    + Add To Cart{" "}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div> : <h1 className="text-center my-3 display-3">Your WhishList Is Empty...</h1>}</> : <div className=' w-100 vh-100 d-flex justify-content-center align-items-center'><BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#4fa94d"
          ariaLabel="ball-triangle-loading"
          wrapperClass={{}}
          wrapperStyle=""
          visible={true} /></div>}
    </>
  );
}
