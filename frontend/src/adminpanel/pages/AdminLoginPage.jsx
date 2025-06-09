import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import {
    Box,
    Button,
    TextField,
    Typography,
    FormControl,
    InputAdornment,
    IconButton,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { clearLoginError, forgotPasswordAsync, loginAsync, resetLoginStatus, selectLoggedInUser, selectLoginStatus } from '../../features/auth/AuthSlice';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const AdminLoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loggedInUser = useSelector(selectLoggedInUser);
    const status = useSelector(selectLoginStatus);
    const [showResetPasswordForm, setShowResetPasswordForm] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const { register, handleSubmit, setError, formState: { errors }, reset } = useForm();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'instant',
        });
    }, []);

    useEffect(() => {
        if (loggedInUser) {
            if (!loggedInUser?.isVerified) {
                navigate('/verify-otp');
            } else if (loggedInUser._id === '397f2434c53bbe09c798763') {
                navigate('/admin-login');
            }
        }
    }, [loggedInUser, navigate]);

    useEffect(() => {
        if (status === 'fullfilled') {
            if (loggedInUser?.isVerified) {
                toast.success('Login successful');
                if (loggedInUser?.isAdmin === true) {
                    navigate('/admin-dashboard');
                } else {
                    navigate('/');
                }
            } else {
                toast.success('Login successful');
                navigate('/');
            }
        }

        return () => {
            dispatch(clearLoginError());
            dispatch(resetLoginStatus());
        };
    }, [status, loggedInUser, dispatch]);

    const onLoginSubmit = async (data) => {
        if (showResetPasswordForm) {
            return;
        }

        try {
            const resultLogin = await dispatch(loginAsync(data)).unwrap();
            if (resultLogin?.message) {
                toast.success(resultLogin?.message);
            }
        } catch (err) {
            toast.error(err?.message || 'Login failed! Please check your credentials and try again.');
        }
    };

    const onForgotPasswordSubmit = async (data) => {
        if (!data.email) {
            toast.error('Please enter a valid email address.');
            return;
        }

        try {
            const response = await dispatch(forgotPasswordAsync({ email: data.email })).unwrap();
            toast.success(response?.message || 'Password reset link sent to your email!');
            setShowResetPasswordForm(false);
            reset(); 
        } catch (err) {
            toast.error(err?.message || 'Failed to send reset link. Please try again.');
        }
    };

    const handlePasswordVisibilityToggle = () => {
        setPasswordVisible(prevState => !prevState);
    };

    const toggleForm = () => {
        setShowResetPasswordForm(prev => {
            if (!prev) {
                reset(); 
            }
            return !prev;
        });
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '90vh',
                padding: 2,
            }}
        >
            <Box
                sx={{
                    width: 450,
                    padding: 2,
                    border: '1px solid black',
                    borderRadius: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                }}
            >
                <Box sx={{ flex: 1, padding: 2 }}>
                    {showResetPasswordForm ? (
                        <Box sx={{ maxWidth: '500px', margin: '0 auto', padding: 2 }}>
                            <Typography variant="h5" mb={1}>
                                Reset Your Password
                            </Typography>
                            <form onSubmit={handleSubmit(onForgotPasswordSubmit)} style={{ width: '100%', maxWidth: '350px' }}>
                                <FormControl fullWidth margin="normal">
                                    <TextField
                                        label="Enter your email"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        {...register('email', { required: 'Please enter email id' })}
                                        error={!!errors.email}
                                        helperText={errors.email?.message}
                                        sx={{ width: '90%', marginLeft: 2, marginBottom: 3 }}
                                    />
                                </FormControl>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    sx={{ marginTop: 2, width: '50%', marginLeft: 0 }}
                                    type="submit"
                                >
                                    Send Reset Link
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    fullWidth
                                    sx={{ marginTop: 2, width: '35%', marginLeft: 3 }}
                                    onClick={toggleForm} 
                                >
                                    Cancel
                                </Button>
                            </form>
                        </Box>
                    ) : (
                        <>
                            <Typography variant="h5" mb={2}>
                                Admin Login
                            </Typography>
                            <form onSubmit={handleSubmit(onLoginSubmit)} style={{ width: '100%', maxWidth: '350px' }}>
                                <FormControl fullWidth margin="normal">
                                    <TextField
                                        label="Enter mobile or email"
                                        placeholder="Enter mobile or email"
                                        variant="outlined"
                                        {...register('email', { required: 'Please enter email id' })}
                                        error={!!errors.email}
                                        helperText={errors.email?.message}
                                        sx={{ width: '100%' }}
                                    />
                                </FormControl>

                                <FormControl fullWidth margin="normal">
                                    <TextField
                                        label="Enter password"
                                        placeholder="Enter password"
                                        variant="outlined"
                                        type={passwordVisible ? 'text' : 'password'} 
                                        {...register('password', { required: 'Password is required' })}
                                        error={!!errors.password}
                                        helperText={errors.password?.message}
                                        sx={{ width: '100%' }}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handlePasswordVisibilityToggle}
                                                        edge="end"
                                                    >
                                                        {passwordVisible ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </FormControl>

                                <Button variant="contained"  fullWidth sx={{ marginTop: 2, backgroundColor: '#d48521', '&:hover': { backgroundColor: 'red' } }}  type="submit">
                                    Login
                                </Button>
                            </form>
                            <Link
                                to="/admin-login"
                                onClick={toggleForm} 
                                style={{ textDecoration: 'none' }}
                            >
                                <Button variant="text" color="primary" sx={{ marginTop: 2 }}>
                                    Forgot your password?
                                </Button>
                            </Link>
                        </>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default AdminLoginPage;
