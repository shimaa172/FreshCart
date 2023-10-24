import React, { useState, useEffect, useContext } from 'react'
import Style from './MyOrders.module.css'
import { Helmet } from "react-helmet";
import { OrderContext } from '../../Context/OrderContext';



export default function MyOrders() {
  let { id, getUserOrders } = useContext(OrderContext)
  const [UserOrders, setUserOrders] = useState(null);


  async function getOrders() {
    let { data } = await getUserOrders(id);
    setUserOrders(data)
  }

  useEffect(() => {
    getOrders();
  }, []);


  return <>
    <Helmet>
      <meta charSet="utf-8" />
      <link rel="shortcut icon" href="../../../src/assets/favicon_io/favicon.ico"></link>
      <title>MyOrders</title>
    </Helmet>
    <div className={`${Style.order} bg-main-light p-4 mx-auto rounded shadow`}>
      <h1 className="text-center h4">All Orders</h1>
      {UserOrders?.map((order, index) => (<div key={order._id} className='row align-items-center border rounded m-2 p-2'>
        <h3 className="h6">Order:{index + 1}</h3>
        {order.cartItems?.map((product) => (
          <div key={product._id} className='col-md-8'>
            <div className='ps-5 mb-1'>
              <div className='product-item d-flex align-items-center gap-3'>
                <img width="70" src={product.product.imageCover} alt={product.product.title} />
                <div className='product-info'>
                  <h3 className="h6 small text-main"> {product.product.title} </h3>
                  <span className="text-muted d-block"> Count:{product.count} </span>
                  <span className="text-muted d-block"> Price:{product.price} </span>
                </div>
              </div>
              <hr className="border-warning mx-5" />
            </div>
          </div>
        ))}
        <div className='col-md-4'>
          <div className='border border-dark rounded p-1'>
            <p className='mb-0'>
              <span> Is Delivered: </span>
              {order.isDelivered ? <span className="badge bg-success">Yes</span> : <span className="badge bg-danger">No</span>}
            </p>
            <p className='mb-0'>
              <span> Is Paid: </span>
              {order.isPaid ? <span className="badge bg-success">Yes</span> : <span className="badge bg-danger">No</span>}
            </p>
            <span className="d-block"> Payment Method Type:{order.paymentMethodType}</span>
            <span className="d-block"> totalOrderPrice:{order.totalOrderPrice}</span>
          </div>
        </div>
        <div className="col-12">
          <hr className="my-3 mx-5" />
        </div>
      </div>))}
    </div>
  </>
}
