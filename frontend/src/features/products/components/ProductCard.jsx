import React, { useEffect, useState } from 'react';
import { BiCartDownload } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAsync, selectCartItems } from '../../cart/CartSlice';
import { selectLoggedInUser } from '../../auth/AuthSlice';
import { selectWishlistItems } from '../../wishlist/WishlistSlice';
import { useNavigate } from 'react-router-dom';
import { BsFillForwardFill } from "react-icons/bs";
import { key } from '../../../constants/cred';
import ReactStarRating from 'react-star-rating-component';
import { fetchAllReviewsAsync, selectReviews } from '../../review/ReviewSlice';

const CustomTooltip = ({ text }) => (
    <div className="custom-tooltip">{text}</div>
);

const ProductCard = ({ id, title, sku, price, thumbnail, description, discountPercentage,
    handleAddRemoveFromWishlist, }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [showTooltip, setShowTooltip] = useState(null);
    const wishlistItems = useSelector(selectWishlistItems);
    const loggedInUser = useSelector(selectLoggedInUser);
    const cartItems = useSelector(selectCartItems);
    const [rating, setRating] = useState(null);
    const reviewsData = useSelector(selectReviews);
 
    useEffect(() => {
    dispatch(fetchAllReviewsAsync())
  }, [dispatch])


   useEffect(() => {
    if (reviewsData && reviewsData.length > 0) {
      const productReviews = reviewsData.filter(review => review.product === id || review.product._id === id)

      if (productReviews.length > 0) {
        const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0)
        const avg = totalRating / productReviews.length
        setRating(avg.toFixed(1)) 
      } else {
        setRating(null) 
      }
    }
  }, [reviewsData, id])
    let isProductAlreadyinWishlist = -1
    isProductAlreadyinWishlist = wishlistItems.some((item) => item?.product?._id === id)
    const isProductAlreadyInCart = cartItems.some((item) => item?.product?._id === id)

    const discountAmount = (discountPercentage / 100) * price;
    let priceAfterDiscount = price - discountAmount;
    priceAfterDiscount = priceAfterDiscount;
    let savedAmount = discountAmount;

    // Add to cart handler //
    const handleAddToCart = (productId) => {
        if (loggedInUser != null) {
            const data = { user: loggedInUser?._id, product: productId };
            dispatch(addToCartAsync(data));
        }
        else {
            // navigate("/my-account")
        }
    };

    // Go to cart page
    const handleCartPage = () => {
        navigate("/cart")
    }

    return (
        <>
            <div className="product-card" key={key}  >
                <div>
                    <div className="product-card-details" onClick={() => navigate(`/product-details/${id}`)}>
                        <h3 className="product-card-name">
                            {title && title.length > 40 ? title.slice(0, 40) + '...' : title}
                        </h3>
                        <img src={thumbnail} alt="product" className="product-card-image" />
                        <p className="product-card-discription">
                            {description && description.length > 60
                                ? description.slice(0, 60) + '...'
                                : description}
                        </p>

                        <div className="product-card-info">
                            <div className="product-card-sku">SKU: {sku}</div>
                            <div className="product-rating">

                                <ReactStarRating
                                    name="product-rating"
                                    starCount={5}
                                    value={rating}
                                    editing={false}
                                />
                                {
                                    rating && (
                                        <span> ({rating})</span>
                                    )
                                }
                            </div>
                        </div>

                    </div>
                    <div className="price-wrapper">
                        <div className="price-left">
                            <span className="product-card-price">
                                ₹ {priceAfterDiscount}
                                {!discountPercentage &&
                                    <span className="gst-info">(Incl. GST)</span>
                                }
                            </span>
                            {discountPercentage > 0 && (
                                <div className="price-container">
                                    {discountPercentage && (
                                        <>
                                            <span className="discount">₹ {price} <span className="gst-info">(Incl. GST)</span> </span>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                        <div
                            className="icon-container"
                            onMouseEnter={() => setShowTooltip(id)}
                            onMouseLeave={() => setShowTooltip(null)}
                        >
                            {!isProductAlreadyInCart ? (
                                <>
                                    <BiCartDownload
                                        style={{ color: 'white' }}
                                        className="cart-image"
                                        onClick={() => handleAddToCart(id)}
                                    />
                                    {showTooltip === id && <CustomTooltip text="Add to cart" />}
                                </>
                            ) : (
                                <>
                                    <BsFillForwardFill

                                        className="forward-image"
                                        onClick={() => handleCartPage()}
                                    />
                                    {showTooltip === id && <CustomTooltip text="Go to cart" />}
                                </>
                            )}
                        </div>

                    </div>
                </div>

                {discountPercentage > 0 && (
                    <div className="save-percentage">
                        <span>You save ({discountPercentage}%):</span>
                        <span className="save-money">₹ {savedAmount.toFixed(2)}</span>
                    </div>
                )}


                {/* Conditionally render Add to Wishlist or Remove from Wishlist */}
                <div className="wishlist-card-actions">
                    <input
                        type="checkbox"
                        checked={isProductAlreadyinWishlist}
                        onChange={(e) => handleAddRemoveFromWishlist(e, id)}
                        id={`wishlist-checkbox-${id}`}
                        className='checkbox-disable'
                    />
                    <label htmlFor={`wishlist-checkbox-${id}`} className="wishlist-label">
                        <span className="wishlist-icon">
                            {isProductAlreadyinWishlist ? '❤️' : '🤍'}
                        </span>
                        <span className="wishlist-text">
                            {isProductAlreadyinWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                        </span>
                    </label>
                </div>
            </div>
        </>
    );
};

export default ProductCard;
