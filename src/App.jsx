import React from 'react'
import { RouterProvider, createHashRouter } from 'react-router-dom'
import Home from './component/Home/Home'
import Layout from './component/Layout/Layout'
import Categories from './component/Categories/Categories'
import Brands from './component/Brands/Brands'
import Cart from './component/Cart/Cart'
import Whishlist from './component/Whishlist/Whishlist'
import Products from './component/Products/Products'
import Notfound from './component/Notfound/Notfound'
import Login from './component/Login/Login'
import Register from './component/Register/Register'
import ForgotPassword from './component/ForgotPassword/ForgotPassword'
import VerifyResetCode from './component/VerifyResetCode/VerifyResetCode'
import Profile from './component/Profile/Profile'
import UpdatePassword from './component/UpdatePassword/UpdatePassword'
import ResetPassword from './component/ResetPassword/ResetPassword'
import ProtectedRoute from './component/ProtectedRoute/ProtectedRoute'
import Checkout from './component/Checkout/Checkout'
import "./index.css"
import UserTokenContextProvider from './Context/UserTokenContext'
import CartContextProvider from './Context/CartContext'
import OrderContextProvider from './Context/OrderContext'
import WhishlistContextProvider from './Context/WhishlistContext'
import ProductDetails from './component/ProductDetails/ProductDetails'
import BrandsDetails from './component/BrandsDetails/BrandsDetails'
import CategoriesDetails from './component/CategoriesDetails/CategoriesDetails'
import ScrollButton from './component/ScrollButton/ScrollButton'
import { Toaster } from 'react-hot-toast';
import { Offline } from "react-detect-offline";
import MyOrders from './component/MyOrders/MyOrders'
import { Provider } from 'react-redux'
import { store } from './Redux/Store'




export default function App() {
  let routers = createHashRouter([
    {path: '/', element: <Layout />, children:[
    {index:true, element: <ProtectedRoute><Home /></ProtectedRoute> },
    { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute> },
    { path: 'productDetails/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
    { path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
    { path: 'brandDetails/:id', element: <ProtectedRoute><BrandsDetails /></ProtectedRoute> },
    { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
    { path: 'categoriesDetails/:id', element: <ProtectedRoute><CategoriesDetails /></ProtectedRoute> },
    { path: 'Whishlist', element: <ProtectedRoute><Whishlist /></ProtectedRoute> },
    { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
    { path: 'register', element: <Register /> },
    { path: 'login', element: <Login /> },
    { path: 'forgot', element: <ForgotPassword /> },
    { path: 'resetPassword', element: <ResetPassword /> },
    { path: 'verifyCode', element: <VerifyResetCode /> },
    { path: 'updatepass', element: <UpdatePassword /> },
    { path: 'profile', element: <ProtectedRoute><Profile /></ProtectedRoute> },
    { path: 'allorders', element: <ProtectedRoute><MyOrders /></ProtectedRoute> },
    { path: 'checkout/:id', element: <ProtectedRoute><Checkout /></ProtectedRoute> },
    { path: '*', element:<ProtectedRoute><Notfound /></ProtectedRoute>} ]
    }])
  return <>
  <OrderContextProvider>
    <WhishlistContextProvider>
      <CartContextProvider>
        <UserTokenContextProvider>
          <Provider store={store}>
            <RouterProvider router={routers}></RouterProvider>
            <Toaster toastOptions={{
              className: 'bg-main',
              style: {
                borderRadius: 'unset',
                padding: '20px',
                color: '#f0f3f2',
                fontSize: '20px'
              },
            }} />
            <ScrollButton />
            <div>
              <Offline>
                <div className="offline"><i className="fas fa-wifi text-danger pe-2"></i>You are offline.Check your connection please!</div>
              </Offline>
            </div>
          </Provider>
        </UserTokenContextProvider>
      </CartContextProvider>
    </WhishlistContextProvider>
  </OrderContextProvider>
  </>
}
