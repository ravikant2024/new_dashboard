import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import { fetchAllReviewsAsync, selectReviews } from '../../review/ReviewSlice';

const SearchProductCardList = ({
    id,
    title,
    sku,
    price,
    thumbnail,
    description,
    discountPercentage,
}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [rating, setRating] = useState(null);
    const reviewsData = useSelector(selectReviews);

    // Fetch reviews on mount
    useEffect(() => {
        dispatch(fetchAllReviewsAsync());
    }, [dispatch]);

    // Calculate average rating
    useEffect(() => {
        if (reviewsData && id) {
            const productReviews = reviewsData.filter(
                (review) => review.product && review.product._id === id
            );

            if (productReviews.length > 0) {
                const totalRating = productReviews.reduce(
                    (acc, review) => acc + (review.rating || 0),
                    0
                );
                const avgRating = totalRating / productReviews.length;
                setRating(Number(avgRating.toFixed(1))); // ✅ Ensure it's a number
            } else {
                setRating(null);
            }
        }
    }, [reviewsData, id]);

    // Calculate discounted price
    const discountAmount = (discountPercentage / 100) * price;
    const priceAfterDiscount = price - discountAmount;

    return (
        <div className="search-product-card" key={id}>
            <div onClick={() => navigate(`/product-details/${id}`)}>
                <h3 className="search-product-card-name">
                    {title && title.length > 25 ? title.slice(0, 25) + '...' : title}
                </h3>

                <img src={thumbnail} alt="product" className="search-card-image" />

                <div className="search-product-card-info">
                    <div className="search-product-card-sku">SKU: {sku}</div>

                    <div className="search-product-rating">
                        <StarRatings
                            rating={rating || 0} // fallback to 0 if null, undefined, or 0
                            starRatedColor="#ffd700"
                            numberOfStars={5}
                            starDimension="25px"
                            starSpacing="3px"
                            name="search-product-rating"
                        />
                        {rating !== null && <span> ({rating})</span>}

                    </div>
                </div>
            </div>

            <div className="search-price-wrapper">
                <div className="search-price-left">
                    <span className="search-product-card-price">
                        ₹ {priceAfterDiscount}
                        {!discountPercentage && (
                            <span className="search-gst-info">(Incl. GST)</span>
                        )}
                    </span>

                    {discountPercentage > 0 && (
                        <div className="search-price-container">
                            <span className="search-discount">
                                ₹ {price} <span className="gst-info">(Incl. GST)</span>
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchProductCardList;
