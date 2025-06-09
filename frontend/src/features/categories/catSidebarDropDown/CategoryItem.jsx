import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom';
import ReactStarRating from 'react-star-rating-component';
import { BiCartDownload } from "react-icons/bi";
import { selectWishlistItems } from '../../wishlist/WishlistSlice';
import { selectLoggedInUser } from '../../auth/AuthSlice';
import { addToCartAsync, resetCartItemAddStatus, selectCartItemAddStatus, selectCartItems } from '../../cart/CartSlice';
import { BsFillForwardFill } from "react-icons/bs";

const CustomTooltip = ({ text }) => (
    <div className="custom-tooltip">{text}</div>
);

const CategoryCardItems = ({ id, title, sku, price, thumbnail, description, discountPercentage,
    handleAddRemoveFromWishlist, key }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [showTooltip, setShowTooltip] = useState(null);
    const wishlistItems = useSelector(selectWishlistItems);
    const loggedInUser = useSelector(selectLoggedInUser);
    const cartItems = useSelector(selectCartItems);
    const cartItemAddStatus = useSelector(selectCartItemAddStatus)
    const [rating, setRating] = useState(5);

    let isProductAlreadyinWishlist = -1
    isProductAlreadyinWishlist = wishlistItems.some((item) => item?.product?._id === id)
    const isProductAlreadyInCart = cartItems.some((item) => item?.product?._id === id)

    // Assuming `discountPercentage` and `price` are numbers.
    const discountAmount = (discountPercentage / 100) * price;
    // Calculate the price after discount
    let priceAfterDiscount = price - discountAmount;
    priceAfterDiscount = priceAfterDiscount;
    let savedAmount = discountAmount;

    // Add product in cart //
    useEffect(() => {
        if (cartItemAddStatus === 'fulfilled') {
            toast.success("Product added to cart");
            dispatch(resetCartItemAddStatus()); 
        } else if (cartItemAddStatus === 'rejected') {
            toast.error('Error adding product to cart, please try again later');
            dispatch(resetCartItemAddStatus()); 
        }
    }, [cartItemAddStatus, dispatch]);
    
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
            <div className="product-card" key={key} >
                <div>
                    <div className="product-card-details" onClick={() => navigate(`/product-details/${id}`)}>
                        <h3 className="product-card-name">
                            {title && title.length > 25 ? title.slice(0, 25) + '...' : title}
                        </h3>
                        <img src={thumbnail} alt="product" className="product-card-image" />
                        <p className="product-card-discription">
                            {description && description.length > 50
                                ? description.slice(0, 50) + '...'
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
                                ₹ {priceAfterDiscount.toFixed(2)}
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

export default CategoryCardItems;