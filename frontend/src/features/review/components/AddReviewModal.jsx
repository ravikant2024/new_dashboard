import { useForm, Controller } from 'react-hook-form';
import "./AddReviewModal.css";
import { useDispatch } from 'react-redux';
import { createReviewAsync } from '../ReviewSlice';
import { useEffect } from 'react';

const AddReviewModal = ({ setShowModal, product, loggedInUser, order, fetchReviewData }) => {
    const dispatch = useDispatch();
    const feedback = ["Very Bad", "Bad", "Good", "Very Good", "Excellent"];

    const { register, handleSubmit, control, formState: { errors }, reset } = useForm({
        defaultValues: {
            rating: 0,
            title: '',
            comment: ''
        }
    });

    // Load existing review data if present
    useEffect(() => {
        if (fetchReviewData && Array.isArray(fetchReviewData)) {
            const userReview = fetchReviewData.find(
                (review) => review.user._id === loggedInUser._id
            );
            if (userReview) {
                reset({
                    rating: userReview.rating,
                    title: userReview.title || '',
                    comment: userReview.comment || ''
                });
            }
        }
    }, [fetchReviewData, loggedInUser._id, reset]);


    const onSubmit = (data) => {
        const payload = {
            order: order._id,
            user: loggedInUser._id,
            comment: data.comment,
            rating: data.rating,
            title: data.title,
            product: product._id,
        };
        dispatch(createReviewAsync(payload));
        setShowModal(false);
    };

    return (
        <div className="review-modal-overlay">
            <div className="review-modal-container">
                <div className="review-modal-left">
                    <h3>What makes a good review</h3>

                    <div className="review-tip">
                        <h4>Have you used this product?</h4>
                        <p>Your review should be about your experience with the product.</p>
                    </div>

                    <div className="review-tip">
                        <h4>Why review a product?</h4>
                        <p>Your valuable feedback will help fellow shoppers decide!</p>
                    </div>

                    <div className="review-tip">
                        <h4>How to review a product?</h4>
                        <p>
                            Your review should include facts. An honest opinion is always appreciated.
                            If you have an issue with the product or service please contact us.
                        </p>
                    </div>
                </div>

                <div className="review-modal-right">
                    <div className="close-icon" onClick={() => setShowModal(false)}>✖</div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h4 className="rating-label">Rate this product</h4>
                        <Controller
                            name="rating"
                            control={control}
                            rules={{ required: "Rating is required" }}
                            render={({ field }) => {
                                const { value, onChange } = field;

                                return (
                                    <div className="rating-stars">
                                        {Array.from({ length: 5 }, (_, index) => {
                                            const starValue = index + 1;
                                            return (
                                                <span
                                                    key={starValue}
                                                    onClick={() => onChange(starValue)}
                                                    style={{
                                                        cursor: "pointer",
                                                        fontSize: "24px",
                                                        color: value >= starValue ? "#ffc107" : "#ccc"
                                                    }}
                                                >
                                                    ★
                                                </span>
                                            );
                                        })}
                                        {value > 0 && (
                                            <span className="rating-text" style={{ marginLeft: "10px", fontWeight: "bold" }}>
                                                {["Very Bad", "Bad", "Good", "Very Good", "Excellent"][value - 1]}
                                            </span>
                                        )}
                                    </div>
                                );
                            }}
                        />

                        {errors.rating && <p className="error-message">{errors.rating.message}</p>}

                        <h4 className="review-label">Review Title</h4>
                        <input
                            type="text"
                            placeholder="Title(optional)..."
                            {...register("title" )}
                            className="review-title-input"
                        />
                        {errors.title && <p className="error-message">{errors.title.message}</p>}

                        <h4 className="review-label">Review this product</h4>
                        <textarea
                            placeholder="Description..."
                            {...register("comment", { required: "Review comment is required" })}
                            className="review-textarea"
                        />
                        {errors.comment && <p className="error-message">{errors.comment.message}</p>}

                        <div className="submit-button-wrapper">
                            <button className="submit-review-button" type="submit">
                                SUBMIT
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddReviewModal;
