import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { RiLockPasswordFill } from 'react-icons/ri';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import './resetPassword.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { clearResetPasswordError, clearResetPasswordSuccessMessage, resetPasswordAsync, resetResetPasswordStatus, selectResetPasswordError, selectResetPasswordStatus, selectResetPasswordSuccessMessage } from '../../AuthSlice';

const ResetPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const status = useSelector(selectResetPasswordStatus);
    const error = useSelector(selectResetPasswordError);
    const successMessage = useSelector(selectResetPasswordSuccessMessage);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { userId, passwordResetToken } = useParams();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword((prev) => !prev);
    };

    // Effect for error messages
    useEffect(() => {
        if (error) {
            toast.error(error.message);
        }
        return () => {
            dispatch(clearResetPasswordError());
        };
    }, [error]);

    // Effect for success message and redirection
    useEffect(() => {
        if (status === 'fullfilled') {
            toast.success(successMessage?.message);
            navigate("/my-account");
        }
        return () => {
            dispatch(clearResetPasswordSuccessMessage());
        };
    }, [status]);

    // Reset status after component unmount
    useEffect(() => {
        return () => {
            dispatch(resetResetPasswordStatus());
        };
    }, []);

    const handleResetPassword = async (data) => {
        const cred = { ...data, userId: userId, token: passwordResetToken };
        delete cred.confirmPassword;
        dispatch(resetPasswordAsync(cred));
        reset();
    };

    return (
        <div className="reset-password-container">
            <div className="reset-password-box">
                <h2>Reset Password</h2>
                <h3>Please enter and confirm new password</h3>

                <form onSubmit={handleSubmit(handleResetPassword)} className="reset-password-form">
                    <div className="reset-form-group">
                        <label>
                            <RiLockPasswordFill size={20} className="icon" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="New Password"
                                {...register('password', {
                                    required: "Password is required",
                                    pattern: {
                                        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                                        message: `At least 8 characters, must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number, Can contain special characters`
                                    }
                                })}
                                className="reset-input-field"
                            />
                            {/* Show/Hide icon */}
                            <span className="reset-password-icon" onClick={handleClickShowPassword}>
                                {showPassword ? <RiEyeOffLine size={20} /> : <RiEyeLine size={20} />}
                            </span>
                        </label>
                        {errors.password && <p className="reset-error-message">{errors.password.message}</p>}
                    </div>

                    <div className="reset-form-group">
                        <label>
                            <RiLockPasswordFill size={20} className="icon" />
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="Confirm New Password"
                                {...register('confirmPassword', {
                                    required: "Please confirm your password",
                                    validate: (value, allValues) =>
                                        value === allValues.password  || "Passwords do not match"
                                })}
                                className="reset-input-field"
                            />
                            {/* Show/Hide icon */}
                            <span className="reset-password-icon" onClick={handleClickShowConfirmPassword}>
                                {showConfirmPassword ? <RiEyeOffLine size={20} /> : <RiEyeLine size={20} />}
                            </span>
                        </label>
                        {errors.confirmPassword && <p className="reset-error-message">{errors.confirmPassword.message}</p>}
                    </div>

                    <button type="submit" className="reset-btn">Reset Password</button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
