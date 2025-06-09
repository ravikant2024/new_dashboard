import React, { useEffect, useState } from 'react'
import "./Review.css";
import { createReviewAsync, fetchReviewsByProductIdAsync, resetReviewAddStatus, resetReviewDeleteStatus, resetReviewUpdateStatus, selectReviewAddStatus, selectReviewDeleteStatus, selectReviews, selectReviewUpdateStatus } from "../ReviewSlice"
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { selectLoggedInUser } from '../../auth/AuthSlice';
import { toast } from 'react-toastify'
import ReviewItems from './ReviewItems';
import ReactStarRating from 'react-star-rating-component';
import { useNavigate } from "react-router";

const Reviews = ({ product }) => {
    const navigate=useNavigate()
    const dispatch = useDispatch()
    const [rating, setRating] = useState(0);
    const loggedInUser = useSelector(selectLoggedInUser)
    const reviewsData = useSelector(selectReviews);
    const reviewAddStatus = useSelector(selectReviewAddStatus)
    const reviewDeleteStatus = useSelector(selectReviewDeleteStatus)
    const reviewUpdateStatus = useSelector(selectReviewUpdateStatus)
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const totalReviews = reviewsData.length;
    const averageRating = totalReviews > 0
        ? (reviewsData.reduce((acc, review) => acc + review.rating, 0) / totalReviews).toFixed(1)
        : 0;

    // Calculate breakdown of each rating
    const ratingBreakdown = [0, 0, 0, 0, 0];

    reviewsData.forEach((review) => {
        ratingBreakdown[review.rating - 1]++;
    });

    useEffect(() => {
        if (reviewAddStatus === 'fulfilled') {
            toast.success("Review added");
            reset();
        } else if (reviewAddStatus === 'rejected') {
            toast.error("Error posting review, please try again later");
        }
        if (reviewAddStatus !== 'pending') {
            dispatch(resetReviewAddStatus());
        }
    }, [reviewAddStatus, dispatch]);


    useEffect(() => {

        if (reviewDeleteStatus === 'fulfilled') {
            toast.success("Review deleted")
        }
        else if (reviewDeleteStatus === 'rejected') {
            toast.error("Error deleting review, please try again later")
        }
    }, [reviewDeleteStatus])


    useEffect(() => {

        if (reviewUpdateStatus === 'fulfilled') {
            toast.success("Review updated")
        }
        else if (reviewUpdateStatus === 'rejected') {
            toast.error("Error updating review, please try again later")
        }
    }, [reviewUpdateStatus])

    useEffect(() => {
        if (product._id) {
            dispatch(fetchReviewsByProductIdAsync(product._id))
        }
    }, [dispatch, product._id])

    const handleRatingChange = (index) => {
        setRating(index);
    };

 const onSubmit = (data) => {
    if (  loggedInUser._id !== "77f2434c53bbe09c7c63f666"
    ) {
        const review = {
            ...data,
            rating: rating,
            user: loggedInUser._id,
            product: product._id,
        };
        dispatch(createReviewAsync(review));
    } else {
        toast.error("You are not allowed to submit a review. Please login");
        navigate("/my-account");
    }

    reset();
    setRating(0);
};


    useEffect(() => {
        return () => {
            dispatch(resetReviewAddStatus())
            dispatch(resetReviewDeleteStatus())
            dispatch(resetReviewUpdateStatus())
        }
    }, [])

    return (
        <>
            <div className="review-container">
                <div className="review-summary">
                    <h3>Based on {totalReviews} reviews</h3>
                    <div className="overall-rating">
                        <span className="rating-score">{averageRating}</span>
                        <p>overall</p>
                    </div>
                    <div className="rating-breakdown">
                        {ratingBreakdown.map((count, index) => {
                            const stars = '★'.repeat(index + 1) + '☆'.repeat(5 - (index + 1));
                            return (
                                <div className="star-row" key={index}>
                                    <span className="stars">{stars}</span>
                                    <div className="bar">
                                        <div className="fill" style={{ width: `${(count / totalReviews) * 100}%` }}></div>
                                    </div>
                                    <span>{count}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="review-form">
                    <p className="review-title">{product?.title}</p>
                    {
                        loggedInUser ? (
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="review-rating">
                                    <p>Your Rating</p>
                                    <div className="star-rating">
                                        <ReactStarRating
                                            name="product-rating"
                                            starCount={5}
                                            value={rating}
                                            onStarClick={handleRatingChange}
                                            editing={true}
                                            renderStarIcon={(index, value) => value >= index ? '★' : '☆'}
                                            starColor="gold"
                                            emptyStarColor="gray"
                                        />

                                    </div>
                                    {errors.rating && <p className="error">Rating is required</p>}
                                </div>

                                <div className="review-comment">
                                    <p>Your Review</p>
                                    <textarea {...register("comment", { required: true })}></textarea>
                                    {errors.comment && <p className="error">Review is required</p>}
                                </div>

                                <button type="submit" className="add-review-button">Add Review</button>
                            </form>
                        ) : (
                            <p className="login-prompt">Please log in to submit a review.</p>

                        )
                    }

                </div>
            </div>
            <div className="reviews-list">
                {reviewsData.map((review) => (
                    <ReviewItems key={review._id} review={review} loggedInUser={loggedInUser} />
                ))}
            </div>
        </>
    )
}

export default Reviews