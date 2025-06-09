import React, { useState, useEffect } from 'react';
import "./myAccount.css";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearLoginError, forgotPasswordAsync, loginAsync, resetLoginStatus, selectLoggedInUser, selectLoginStatus, signupAsync } from '../../AuthSlice';

const MyAccount = () => {
     const dispatch = useDispatch();
    const navigate = useNavigate();
    const loggedInUser = useSelector(selectLoggedInUser);
    const loginStatus = useSelector(selectLoginStatus);

    const [isNewUser, setIsNewUser] = useState(true);
    const [signupFormData, setSignupFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [showPasswordSignin, setShowPasswordSignin] = useState(false);
    const [showPasswordSignup, setShowPasswordSignup] = useState(false);
    const [showConfirmPasswordSignup, setShowConfirmPasswordSignup] = useState(false);
    const [loginCredentials, setLoginCredentials] = useState({ email: "", password: "" });
    const [showResetPasswordForm, setShowResetPasswordForm] = useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const [error, setError] = useState(null);

    // ✅ Redirect if already logged in and verified
    useEffect(() => {
        if (!loggedInUser) return;

        if (!loggedInUser.isVerified) {
            navigate("/verify-otp");
        } else if (loggedInUser._id !== import.meta.env.VITE_GUESTUSER_ID) {
            navigate("/");
        }
    }, [loggedInUser, navigate]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, []);

    useEffect(() => {
        if (error) toast.error(error.message);
    }, [error]);

    useEffect(() => {
        if (loginStatus === 'fullfilled') {
            if (loggedInUser?.isVerified) {
                toast.success('Login successful');
                navigate(loggedInUser?.isAdmin ? '/admin-dashboard' : '/');
            } else {
                toast.success('Login successful');
                reset();
                navigate('/');
            }
        }

        return () => {
            dispatch(clearLoginError());
            dispatch(resetLoginStatus());
        };
    }, [loginStatus, loggedInUser, dispatch]);

    const handleToggleUser = () => {
        setIsNewUser(!isNewUser);
        setShowResetPasswordForm(false);
    };

    const handleSignupInputChange = (e) => {
        const { name, value } = e.target;
        setSignupFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();

        if (signupFormData.password !== signupFormData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setError(null);
        try {
            const resultAction = await dispatch(signupAsync(signupFormData)).unwrap();
            toast.success(resultAction.message || 'Signup successful!');
        } catch (err) {
            toast.error(err?.message || 'Signup failed! Please try again.');
        }
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const resultLogin = await dispatch(loginAsync(loginCredentials)).unwrap();
            if (resultLogin?.message) {
                toast.success(resultLogin?.message);
            }
        } catch (err) {
            toast.error(err?.message || 'Login failed! Please check your credentials and try again.');
        }
    };

    const handleForgotPasswordSubmit = async (e) => {
        e.preventDefault();

        if (!resetEmail) {
            toast.error('Please enter a valid email address.');
            return;
        }

        try {
            const response = await dispatch(forgotPasswordAsync({ email: resetEmail })).unwrap();
            toast.success(response?.message || 'Password reset link sent!');
            setResetEmail("");
            setShowResetPasswordForm(false);
        } catch (err) {
            toast.error(err?.message || 'Failed to send reset link.');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <div className="signup-section">
                    <h3>Sign in Or Register</h3>
                    <h2>{isNewUser ? "New to Original Innovation LLP" : "Existing User"}</h2>
                    <div className="divider-auth"></div>
                    <button className="signup-btn" onClick={handleToggleUser}>
                        {isNewUser ? "New here? Sign up" : "Already have an account? Login"}
                    </button>
                </div>

                <div className="login-section">
                    {showResetPasswordForm ? (
                        <div className="reset-password-form">
                            <h2>Reset Your Password</h2>
                            <form onSubmit={handleForgotPasswordSubmit}>
                                <div className="form-group">
                                    <label>
                                        <MdEmail size={25} className="email-icon" />
                                        <input
                                            type="email"
                                            name="resetEmail"
                                            placeholder="Enter your email"
                                            className="input-field"
                                            value={resetEmail}
                                            onChange={(e) => setResetEmail(e.target.value)}
                                        />
                                    </label>
                                </div>
                                <button className="reset-password-btn">Send Reset Link</button>
                                <button
                                    type="button"
                                    className="cancel-btn"
                                    onClick={() => setShowResetPasswordForm(false)}
                                >
                                    Cancel
                                </button>
                            </form>
                        </div>
                    ) : isNewUser ? (
                        <>
                            <h2>Login</h2>
                            <form className="login-form" onSubmit={handleLoginSubmit}>
                                <div className="form-group">
                                    <label>
                                        <MdEmail size={25} className="email-icon" />
                                        <input
                                            type="text"
                                            name="email"
                                            placeholder="Enter mobile or email"
                                            className="input-field"
                                            value={loginCredentials.email}
                                            onChange={(e) => setLoginCredentials({ ...loginCredentials, email: e.target.value })}
                                        />
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label>
                                        <RiLockPasswordFill size={25} className="password-icon" />
                                        <input
                                            type={showPasswordSignin ? "text" : "password"}
                                            name="password"
                                            placeholder="Enter password"
                                            className="input-field"
                                            value={loginCredentials.password}
                                            onChange={(e) => setLoginCredentials({ ...loginCredentials, password: e.target.value })}
                                        />
                                        {showPasswordSignin ? (
                                            <AiFillEyeInvisible
                                                size={20}
                                                className="eye-icon"
                                                onClick={() => setShowPasswordSignin(false)}
                                            />
                                        ) : (
                                            <AiFillEye
                                                size={20}
                                                className="eye-icon"
                                                onClick={() => setShowPasswordSignin(true)}
                                            />
                                        )}
                                    </label>
                                </div>

                                <button className="login-btn">Login</button>
                            </form>

                            <Link to="/my-account" className="forgot-password" onClick={() => setShowResetPasswordForm(true)}>
                                Forgot your password?
                            </Link>
                        </>
                    ) : (
                        <>
                            <h2>Signup</h2>
                            <form className="login-form" onSubmit={handleSignupSubmit}>
                                <div className="form-group">
                                    <label>
                                        <FaRegUser size={25} className="email-icon" />
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Enter username"
                                            className="input-field"
                                            value={signupFormData.name}
                                            onChange={handleSignupInputChange}
                                        />
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label>
                                        <MdEmail size={25} className="email-icon" />
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Enter email"
                                            className="input-field"
                                            value={signupFormData.email}
                                            onChange={handleSignupInputChange}
                                        />
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label>
                                        <RiLockPasswordFill size={25} className="password-icon" />
                                        <input
                                            type={showPasswordSignup ? "text" : "password"}
                                            name="password"
                                            placeholder="Enter password"
                                            className="input-field"
                                            value={signupFormData.password}
                                            onChange={handleSignupInputChange}
                                        />
                                        {showPasswordSignup ? (
                                            <AiFillEyeInvisible
                                                size={20}
                                                className="eye-icon"
                                                onClick={() => setShowPasswordSignup(false)}
                                            />
                                        ) : (
                                            <AiFillEye
                                                size={20}
                                                className="eye-icon"
                                                onClick={() => setShowPasswordSignup(true)}
                                            />
                                        )}
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label>
                                        <RiLockPasswordFill size={25} className="password-icon" />
                                        <input
                                            type={showConfirmPasswordSignup ? "text" : "password"}
                                            name="confirmPassword"
                                            placeholder="Confirm password"
                                            className="input-field"
                                            value={signupFormData.confirmPassword}
                                            onChange={handleSignupInputChange}
                                        />
                                        {showConfirmPasswordSignup ? (
                                            <AiFillEyeInvisible
                                                size={20}
                                                className="eye-icon"
                                                onClick={() => setShowConfirmPasswordSignup(false)}
                                            />
                                        ) : (
                                            <AiFillEye
                                                size={20}
                                                className="eye-icon"
                                                onClick={() => setShowConfirmPasswordSignup(true)}
                                            />
                                        )}
                                    </label>
                                </div>

                                <button className="login-btn">Signup</button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyAccount;
