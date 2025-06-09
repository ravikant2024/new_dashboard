import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import '../components/comment.css';
import { useDispatch, useSelector } from 'react-redux';
import { addCommentAsync, selectCommentsError, selectCommentsSuccess } from '../CommentSlice';
import { toast } from 'react-toastify';

const Comment = () => {
    const dispatch = useDispatch()
    const success = useSelector(selectCommentsSuccess);
    const error = useSelector(selectCommentsError);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful }
    } = useForm();

    useEffect(() => {
        if (success) {
            toast.success('Comment posted successfully!');
            reset();
        }
        if (error) {
            toast.error(error);
        }
    }, [success, error, reset]);

    const onSubmit = async (data) => {

        dispatch(addCommentAsync(data))
    }

    return (
        <div className="comment-section">
            <h2>Leave a comment</h2>
            <p>Your email address will not be published. Required fields are marked *</p>
            <form className="comment-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="comment-group">
                    <label htmlFor="comment">Comment *</label>
                    <textarea
                        id="comment"
                        rows="5"
                        placeholder="Write your comment..."
                        className="comment-textarea"
                        {...register('comment', { required: 'Comment is required' })}
                    ></textarea>
                    {errors.comment && <span className="error-msg">{errors.comment.message}</span>}
                </div>

                <div className="comment-row">
                    <div className="comment-group">
                        <label htmlFor="name">Name *</label>
                        <input
                            type="text"
                            id="name"
                            className="comment-input"
                            {...register('name', { required: 'Name is required' })}
                        />
                        {errors.name && <span className="error-msg">{errors.name.message}</span>}
                    </div>
                    <div className="comment-group">
                        <label htmlFor="email">Email *</label>
                        <input
                            type="email"
                            id="email"
                            className="comment-input"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                    message: 'Enter a valid email'
                                }
                            })}
                        />
                        {errors.email && <span className="error-msg">{errors.email.message}</span>}
                    </div>
                </div>

                <div className="comment-group">
                    <label htmlFor="website">Website</label>
                    <input
                        type="url"
                        id="website"
                        className="comment-input"
                        {...register('website')}
                    />
                </div>

                <button type="submit" className="comment-submit-button">Post Comment</button>

                {isSubmitSuccessful && <p className="success-msg">Comment posted successfully!</p>}
            </form>
        </div>
    );
};

export default Comment;
