import React, { useContext, useEffect, useState } from "react";
import Style from "./Cart.module.css";
import { CartContext } from "../../Context/CartContext";
import { BallTriangle } from "react-loader-spinner";
import visa from "../../assets/images/visa-1.svg";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";

export default function Cart() {
  let {
    getCart,
    removeCartItem,
    updateCartItem,
    clearCartItem,
    setnumOfCartItems,
  } = useContext(CartContext);
  const [cartItems, setcartItems] = useState(null);
  const [loading, setLoading] = useState(false);

  async function removeItem(id) {
    let { data } = await removeCartItem(id);
    setcartItems(data);
    if (data.status === "success") {
      toast.success("removed successfully from your cart", {
        duration: 5000,
        position: "bottom-right",
      });

      if (data.numOfCartItems === 0) {
        setnumOfCartItems(null);
      } else {
        setnumOfCartItems(data.numOfCartItems);
      }
    }
  }

  // ****===========> EDITED
  async function clearCartItems() {
    let { data } = await clearCartItem();
    if (data.message === "success") {
      setLoading(false); // ✅
      toast.success("Your cart cleared successfully", {
        duration: 5000,
        position: "bottom-right",
      });
      // setnumOfCartItems(0); // ✅
      if (data.numOfCartItems === 0) {
        setnumOfCartItems(null);
      } else {
        setnumOfCartItems(data.numOfCartItems);
      }
    }
    setcartItems(null); // ✅
  }

  async function updateItem(id, count) {
    let { data } = await updateCartItem(id, count);
    setcartItems(data);
  }

  async function getCartItems() {
    setLoading(true);
    let { data } = await getCart();
    setcartItems(data);
    if (data?.status === "success") {
      setLoading(false);
      if (data.numOfCartItems === 0) {
        setnumOfCartItems(null);
      } else {
        setnumOfCartItems(data.numOfCartItems);
      }
    }
  }

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <link rel="shortcut icon" href="../../../src/assets/favicon_io/favicon.ico"></link>
        <title>Cart</title>
      </Helmet>
      {!loading ?(
        <>
          {cartItems && cartItems.data.products.length ? (
            <>
              <div
                className={`${Style.cart} bg-main-light py-4 mx-auto rounded shadow`}
              >
                <h1 className="text-center h3">Shop Cart</h1>
                <button
                  onClick={() => clearCartItems()}
                  className={`btn btn-outline-danger btn-sm d-block ms-auto ${Style.clear_btn}`}
                >
                  <i className="fas fa-trash"></i>
                  Clear Cart
                </button>
                <span className="text-main mb-3 d-block">
                  Total Price :{cartItems.data.totalCartPrice}EGP
                </span>
                {cartItems.data.products.map((product) => (
                  <div key={product._id} className="row g-4 align-items-center">
                    <div className="col-md-9">
                      <div className="item d-flex gap-3 align-items-center">
                        <img
                          src={product.product.imageCover}
                          width="70"
                          className=" cursor-pointer"
                          alt=""
                        />
                        <div className="item-details">
                          <h3 className="h6 small">{product.product.title}</h3>
                          <span className="text-main">
                            Price: {product.price}{" "}
                          </span>
                          <button
                            onClick={() => removeItem(product.product._id)}
                            className={`btn btn-remove d-block text-main ${Style.remove_btn}`}
                          >
                            <i className="fas fa-trash"></i>
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="hstack gap-3 justify-content-end">
                        <button
                          onClick={() =>
                            updateItem(product.product._id, product.count + 1)
                          }
                          className="btn-count"
                        >
                          {" "}
                          +{" "}
                        </button>
                        <span>{product.count}</span>
                        <button
                          onClick={() =>
                            updateItem(product.product._id, product.count - 1)
                          }
                          className="btn-count"
                        >
                          {" "}
                          -{" "}
                        </button>
                      </div>
                    </div>
                    <hr className="my-3"></hr>
                  </div>
                ))}
                <Link
                  to={`/checkout/${cartItems.data._id}`}
                  className="text-decoration-none"
                >
                  <button className="btn text-white bg-main py-0" tabIndex="0">
                    {" "}
                    Online Payment <img src={visa} alt="visa card" />
                  </button>
                </Link>
              </div>
              <div className="border rounded shadow-sm p-3 mt-5 mx-auto w-50">
                <Link to={`/allorders`} className="text-decoration-none">
                  <button className="btn text-white bg-main w-100" tabIndex="0">
                    My Orders
                  </button>
                </Link>
              </div>
            </>
          ) : (
            <h1 className="text-center my-3 display-3">
              Your cart Is Empty...
            </h1>
          )}
        </>
      ) : (
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
      )}
    </>
  );
}
