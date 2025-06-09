import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./GoogleRating.css";
import googleImage from "../../assets/googleimage.png";
import googlelogo from "../../assets/googlelogo.png";

const reviews = [
    {
        name: "Parth Sudhir Joshi",
        date: "2024-12-14",
        rating: 4,
        reviewText: "Thank you Bhaskar ji for your prompt support in getting tax invoices for my orders!",
    },
    {
        name: "Amit Kumar",
        date: "2024-12-13",
        rating: 5,
        reviewText: "Excellent service! Everything was quick and seamless.",
    },
    {
        name: "Ravikant yadav",
        date: "2024-12-12",
        rating: 4,
        reviewText: "Good experience, but there could be improvements in delivery speed.",
    },

];

const GoogleRating = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024, 
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 600, 
                settings: {
                    slidesToShow: 1, 
                },
            },
        ],
    };


    return (
        <>
            <div className="main-container">
                <div className="google-text" >
                    <img
                        src={googleImage}
                        style={{ height: "70px",width:'120px' }}
                        alt="Google"
                      
                    />
                    <h3 style={{ fontSize: "20px" }}>-Backed Trust in Every Order</h3>
                </div>

                <div className="google-container">
                    {/* Sidebar */}
                    <div className="review-sidebar">
                        <h2 className="review-sidebar-title">
                            <span className="review-sidebar-text">EXCELLENT</span> <br />
                        </h2>
                        <span className="review-sidebar-rating"> ★★★★☆</span> <br />
                        <span className="review-text">
                            Based on <span style={{ fontSize: "15px", fontWeight: "bold" }}>5225 reviews</span>
                        </span>
                        <br />
                        <img src={googleImage} className="image-google" />
                    </div>

                    {/* Review slider */}
                    <div className="user-review-slider">
                        <Slider {...settings}>
                            {reviews.map((review, index) => (
                                <div key={index} className="user-review">
                                    <div className="user-review-header">
                                        <div className="user-info">
                                            <span className="user-initial">{review.name[0]}</span>
                                            <div>
                                                <p className="user-name">{review.name}</p>
                                                <span className="date">{review.date}</span>
                                            </div>
                                        </div>
                                        <div className="google-review">
                                            <img src={googlelogo} alt="Google" />
                                        </div>
                                    </div>
                                    <div className="user-review-content">
                                        <div className="user-rating-review">
                                            <span className="star">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
                                            <span className="verified">✓</span>
                                        </div>
                                        <p className="user-review-text">{review.reviewText}</p>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>

        </>
    );
};

export default GoogleRating;
