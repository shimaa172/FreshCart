import React from 'react'
import Style from './Products.module.css'
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts'
import { Helmet } from "react-helmet";


export default function Products() {
  return <>
    <Helmet>
      <meta charSet="utf-8" />
      <link rel="shortcut icon" href="../../../src/assets/favicon_io/favicon.ico"></link>
      <title>Products</title>
    </Helmet>
    <FeaturedProducts />
  </>
}
