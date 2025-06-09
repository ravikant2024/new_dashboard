import React, { useEffect } from 'react'
import BannerWithSidebar from '../features/banner/BannerWithSidebar'
import GoogleRating from '../features/googleRating/GoogleRating'
import OurService from '../features/ourServices/OurService'
import ShippingLogo from '../features/shippingLogo/ShippingLogo'
import Tutorials from '../features/tutorials/Tutorials'
import OurBrand from '../features/ourBrands/OurBrand'
import ScrollToTopComponent from './ScrollToTopComponent '
import ProductList from '../features/products/components/ProductList'
import CategoryList from '../features/categories/categoryList/CategoryList'
import BlogList from '../features/blogs/components/BlogList'
import VideoList from '../features/videoes/components/VideoList'
const HomePage = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant"
    })
  }, [])
  return (
    <>
      <BannerWithSidebar />
      <CategoryList />
      <ProductList />
      {/* <GoogleRating /> */}
      {/* <OurService /> */}
      {/* <ShippingLogo /> */}
      <VideoList />
      <BlogList />
      {/* <Tutorials /> */}
      {/* <OurBrand /> */}
      <ScrollToTopComponent />
    </>
  )
}

export default HomePage
