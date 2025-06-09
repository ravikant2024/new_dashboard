import React, { useEffect } from 'react';
import { selectLoggedInUser } from '../../features/auth/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLoggedInUserByIdAsync } from '../../features/user/UserSlice';
import { fetchCartByUserIdAsync } from '../../features/cart/CartSlice';
import { fetchAddressByUserIdAsync } from '../../features/address/AddressSlice';
import { fetchWishlistByUserIdAsync } from '../../features/wishlist/WishlistSlice';
import { fetchBrandsAsync } from '../../adminpanel/addbrand/AddBrandSlice';
import { fetchCategoryAsync } from '../../adminpanel/category/CategorySlice';

export const UserFetchDetails = ( data ) => {  
  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectLoggedInUser);  
  

  // useEffect(() => {
  //   if (data && loggedInUser?.isVerified) {
  //     dispatch(fetchLoggedInUserByIdAsync(loggedInUser?._id));
  //     dispatch(fetchBrandsAsync())
  //     dispatch(fetchCategoryAsync())
  //     dispatch(fetchCartByUserIdAsync(loggedInUser?._id))
  //     dispatch(fetchAddressByUserIdAsync(loggedInUser?._id))
  //     dispatch(fetchWishlistByUserIdAsync(loggedInUser?._id))
  //   }
    
  //   if(!loggedInUser?.isAdmin){
  //     dispatch(fetchCartByUserIdAsync(loggedInUser?._id))
  //     dispatch(fetchAddressByUserIdAsync(loggedInUser?._id))
  //     dispatch(fetchWishlistByUserIdAsync(loggedInUser?._id))
  
  //   }
  // }, [data, loggedInUser, dispatch]);  


  useEffect(() => {
    if (loggedInUser?.isVerified && loggedInUser?._id) {
      dispatch(fetchLoggedInUserByIdAsync(loggedInUser._id));
      dispatch(fetchBrandsAsync());
      dispatch(fetchCategoryAsync());

      if (!loggedInUser.isAdmin) {
        dispatch(fetchCartByUserIdAsync(loggedInUser._id));
        dispatch(fetchAddressByUserIdAsync(loggedInUser._id));
        dispatch(fetchWishlistByUserIdAsync(loggedInUser._id));
      }
    }
  }, [loggedInUser, dispatch]);

  
  return null;
};
