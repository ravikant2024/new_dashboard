import React, { useEffect } from 'react';
import './Wishlist.css';
import { toast } from 'react-toastify';
import { deleteWishlistItemByIdAsync, fetchWishlistByUserIdAsync, resetWishlistFetchStatus, resetWishlistItemAddStatus, resetWishlistItemDeleteStatus, resetWishlistItemUpdateStatus, selectWishlistItemAddStatus, selectWishlistItemDeleteStatus, selectWishlistItems } from '../WishlistSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartAsync, resetCartItemAddStatus, selectCartItemAddStatus, selectCartItems } from '../../cart/CartSlice';
import { selectLoggedInUser } from '../../auth/AuthSlice';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const dispatch = useDispatch()
  const wishlistItems = useSelector(selectWishlistItems);
  const loggedInUser = useSelector(selectLoggedInUser)
  const wishlistItemDeleteStatus = useSelector(selectWishlistItemDeleteStatus)
  const wishlistItemAddStatus = useSelector(selectWishlistItemAddStatus)
  const cartItemAddStatus = useSelector(selectCartItemAddStatus);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant"
    })
  }, [])

  useEffect(() => {
    if (loggedInUser?._id) {
      dispatch(fetchWishlistByUserIdAsync(loggedInUser._id));
    }
  }, [dispatch, loggedInUser]);

  // useEffect(() => {
  //   if (cartItemAddStatus === 'fulfilled') {
  //     toast.success("Product added to cart");
  //   } else if (cartItemAddStatus === 'rejected') {
  //     toast.error("Error adding product to cart, please try again later");
  //   }
  // }, [cartItemAddStatus]);



  // useEffect(() => {
  //   if (wishlistItemAddStatus === 'fulfilled') {
  //     toast.success("Product added to wishlist");
  //     dispatch(resetWishlistItemAddStatus());
  //   } else if (wishlistItemAddStatus === 'rejected') {
  //     toast.error("Error adding product to wishlist, please try again later");
  //     dispatch(resetWishlistItemAddStatus());
  //   }
  // }, [wishlistItemAddStatus, dispatch]);

  useEffect(() => {
    if (wishlistItemDeleteStatus === 'fulfilled') {
      toast.success("Product removed from wishlist");
      dispatch(resetWishlistItemDeleteStatus());
    } else if (wishlistItemDeleteStatus === 'rejected') {
      toast.error("Error removing product from wishlist, please try again later");
      dispatch(resetWishlistItemDeleteStatus());
    }
  }, [wishlistItemDeleteStatus, dispatch]);

  // Add cart from wishlist //

  const handleAddToCartFromWishlist = (productId) => {
    const data = { user: loggedInUser?._id, product: productId }
    dispatch(addToCartAsync(data))
  }
  // Remove wishlist ///
  const handleRemoveWishlist = (id) => {
    dispatch(deleteWishlistItemByIdAsync(id))
  }

  useEffect(() => {
    return () => {
      dispatch(resetWishlistFetchStatus())
      dispatch(resetCartItemAddStatus())
      dispatch(resetWishlistItemUpdateStatus())
      dispatch(resetWishlistItemDeleteStatus())
      dispatch(resetWishlistItemAddStatus())
    }
  }, [dispatch])


  return (
    <div className="wishlist-container">
      <h3>My Wishlist ({wishlistItems?.length})</h3>
      <hr />
      {wishlistItems.length > 0 ? (
        <table className="wishlist-table">

          <thead>
            <tr>
              <th>Image</th>
              <th className="product-name-column">Product name</th>

              <th>Unit price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {wishlistItems.map((item) => (
              <tr key={item.id}>
                <td data-label="Image">
                  <img src={item.product.thumbnail} alt="product" className="product-image" />
                </td>
                <td data-label="Product name">
                  <Link to={`/product-details/${item?.product?._id}`} className="wishlist-product-link">
                    {item?.product?.title}
                  </Link>
                </td>


                <td data-label="Unit price">
                  <div className="wishlist-price">₹{item?.product?.price}</div>
                </td>
                <td data-label="Action">
                  <button className="wishlist-remove-button" onClick={() => handleRemoveWishlist(item?._id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      ) : (
        <>

          <div className="empty-wishlist">
            <img
              src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/mywishlist-empty_39f7a5.png"
              alt="Empty Wishlist"
            />
            <h3>Empty Wishlist</h3>
            <p>You have no items in your wishlist. Start adding!</p>
          </div>

        </>

      )}

    </div>
  );
};

export default Wishlist;