import React, { useState } from 'react';
import { VscKebabVertical } from "react-icons/vsc";
import { useDispatch } from 'react-redux';
import { deleteReviewByIdAsync, updateReviewByIdAsync } from '../ReviewSlice';
import { useForm } from 'react-hook-form';
import StarRatings from "react-star-ratings";

const ReviewItems = ({ review, loggedInUser }) => {
    const dispatch = useDispatch();
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const { register, handleSubmit, setValue, watch } = useForm();

    const toggleOptions = () => {
        setIsOptionsOpen(!isOptionsOpen);
    };

    // Edit open modal //
    const handleEditReview = (id) => {
        setIsEditing(true);
        setIsOptionsOpen(false);
        setValue('comment', review.comment);
        setValue('rating', review.rating);
    };

    // Delete review
    const handleDeleteReview = (id) => {
        dispatch(deleteReviewByIdAsync(id));
    };

    // Update review
    const handleUpdateReview = (data) => {
        const updatedReview = {
            _id: review._id,
            comment: data.comment,
            rating: data.rating,
        };
        dispatch(updateReviewByIdAsync(updatedReview));
        setIsEditing(false);
    };

    // Cancel update review //
    const handleCancel = () => {
        setIsEditing(false);
    };
    
    return (
        <div key={review._id} className="review-item">
            <div className="review-header">
                <span className="user-name">{review?.user?.name}</span>
                {review?.user?._id === loggedInUser?._id && (
                    <VscKebabVertical-
                        onClick={toggleOptions}
                        style={{ cursor: 'pointer' }}
                    />
                )}
            </div>

            {/* Dropdown Options */}
            {/* {isOptionsOpen && (
                <div className="options-dropdown">
                    <div onClick={handleEditReview}>Edit</div>
                    <div onClick={() => handleDeleteReview(review._id)}>Delete</div>
                </div>
            )} */}

            <div className="review-data">
                {isEditing ? (
                    <form onSubmit={handleSubmit(handleUpdateReview)} className="edit-form">
                        <div className="edit-rating">
                            <StarRatings
                                rating={watch('rating') || 0}
                                starRatedColor="#ffd700"
                                numberOfStars={5}
                                starDimension="25px"
                                starSpacing="3px"
                                name="rating"
                                isSelectable={true}
                                isAggregateRating={false}
                            />
                        </div>
                        <textarea
                            {...register('comment', { required: true })}
                            rows="4"
                            placeholder="Edit your comment"
                        />
                        <div className="edit-actions">
                            <button type="submit" className='update-btn'>Update</button>
                            <button type="button" onClick={handleCancel} className='cancel-btn'>Cancel</button>
                        </div>
                    </form>
                ) : (
                    <div className="review-content">
                        <div className="rating">
                            <StarRatings
                                rating={review.rating}
                                starRatedColor="gold"
                                numberOfStars={5}
                                name="rating"
                                starDimension="20px"
                                starSpacing="2px"
                                editing={false}
                            />

                        </div>
                        <div className="comment">
                            {review.comment}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReviewItems;
