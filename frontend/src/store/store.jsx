import { configureStore } from '@reduxjs/toolkit';

import authReducer from "../features/auth/AuthSlice";
import userReducer from "../features/user/UserSlice";
import categoriesReducer from "../features/categories/CategoriesSlice";
import productReducer from "../features/products/ProductsSlice";
import cartReducer from '../features/cart/CartSlice';
import addressReducer from "../features/address/AddressSlice";
import wishlistReducer from '../features/wishlist/WishlistSlice';
import reviewsReducer from "../features/review/ReviewSlice";
import brandReducer from "../adminpanel/addbrand/AddBrandSlice";
import catgoryReducer from "../adminpanel/category/CategorySlice";
import orderReducer from "../features/orders/OrderSlice";
import couponReducer from "../adminpanel/coupon/CouponSlice";
import blogReducer from '../features/blogs/BlogSlice';
import commentReducer from '../features/comment/CommentSlice';
import contactReducer from '../features/contact/ContactSlice';
import bulkEnquiryReducer from '../features/bulkEnquiry/BulkEnquirySlice';
import shippingChargeReducer from '../adminpanel/deliveryCharge/deliveryChargeSlice';
import backendStatusReducer from './backendStatusSlice';

const store = configureStore({
  reducer: {
    backendStatus: backendStatusReducer,
    AuthSlice: authReducer,
    userSlice: userReducer,
    categories: categoriesReducer,
    productSlice: productReducer,
    CartSlice: cartReducer,
    addressSlice: addressReducer,
    WishlistSlice: wishlistReducer,
    ReviewSlice: reviewsReducer,
    brandSlice: brandReducer,
    categorySlice: catgoryReducer,
    orderSlice: orderReducer,
    couponSlice: couponReducer,
    blogSlice: blogReducer,
    comments: commentReducer,
    contact: contactReducer,
    bulkEnquiry: bulkEnquiryReducer,
    shippingCharge: shippingChargeReducer,
  },
  // Redux Toolkit includes redux-thunk by default, so no need to specify middleware unless you add custom ones.
});

export default store;
