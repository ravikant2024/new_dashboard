import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ReactStarRating from 'react-star-rating-component';

const SearchProductCardList = ({ id, title, sku, price, thumbnail, description, discountPercentage }) => {
    const navigate=useNavigate()
    const [rating, setRating] = useState(5);
    const discountAmount = (discountPercentage / 100) * price;
    // Calculate the price after discount
    let priceAfterDiscount = price - discountAmount;
    priceAfterDiscount = priceAfterDiscount;
    return (
        <div className="search-product-card" key={id}>
            <div
              
                onClick={() => navigate(`/product-details/${id}`)}
              >
                <h3 className="search-product-card-name">
                    {title && title.length > 25 ? title.slice(0, 25) + '...' : title}
                </h3>
                <img src={thumbnail} alt="product" className="search-card-image" />
                {/* <p className="search-product-card-discription">
                    {description && description.length > 50
                        ? description.slice(0, 50) + '...'
                        : description}
                </p> */}

                <div className="search-product-card-info">
                    <div className="search-product-card-sku">SKU: {sku}</div>
                    <div className="search-product-rating">
                        <ReactStarRating
                            name="search-product-rating"
                            starCount={5}
                            value={rating}
                            editing={false}
                        />
                        {rating && <span> ({rating})</span>}
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

    )
}

export default SearchProductCardList
