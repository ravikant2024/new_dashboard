import React, { useEffect, useState } from 'react';
import "../components/otpVerification.css";
import { useSelector, useDispatch } from "react-redux";
import {
    selectLoggedInUser, verifyOtpAsync,
    selectOtpVerificationStatus,
    selectOtpVerificationError,
    resendOtpAsync,
    selectResendOtpError,
    selectResendOtpStatus,
    clearResendOtpError,
    resetOtpVerificationStatus,
    clearOtpVerificationError,
    selectResendOtpSuccessMessage,
    clearResendOtpSuccessMessage,
    resetResendOtpStatus
} from '../AuthSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const OtpVerification = () => {
    const dispatch = useDispatch();
    const navigate=useNavigate()
    const loggedInUser = useSelector(selectLoggedInUser);
    const resendOtpStatus=useSelector(selectResendOtpStatus)
    const resendOtpError=useSelector(selectResendOtpError)
    const otpVerificationStatus = useSelector(selectOtpVerificationStatus);
    const otpVerificationError = useSelector(selectOtpVerificationError);
    const resendOtpSuccessMessage=useSelector(selectResendOtpSuccessMessage)
    const [otp, setOtp] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);
      // handles the redirection
      useEffect(()=>{
        if(!loggedInUser){
            navigate('/my-account')
        }
        else if(loggedInUser && loggedInUser?.isVerified){
            navigate("/")
        }
    },[loggedInUser])

    const handleOtpRequest = () => {
        // Simulate sending OTP
        setIsOtpSent(true);
        const data = { user: loggedInUser?._id }
        dispatch(resendOtpAsync(data))

    };

    const handleOtpVerification = (data) => {
        const cred = { ...data, userId: loggedInUser?._id }
        dispatch(verifyOtpAsync(cred))
    };
     // handles resend otp error
     useEffect(()=>{
        if(resendOtpError){
            toast.error(resendOtpError.message)
        }
        return ()=>{
            dispatch(clearResendOtpError())
        }
    },[resendOtpError])
    
    // handles resend otp success message
    useEffect(()=>{
        if(resendOtpSuccessMessage){
            toast.success(resendOtpSuccessMessage.message)
        }
        return ()=>{
            dispatch(clearResendOtpSuccessMessage())
        }
    },[resendOtpSuccessMessage])

    // handles error while verifying otp
    useEffect(()=>{
        if(otpVerificationError){
            toast.error(otpVerificationError.message)
        }
        return ()=>{
            dispatch(clearOtpVerificationError())
        }
    },[otpVerificationError])

    useEffect(()=>{
        if(otpVerificationStatus==='fullfilled'){
            toast.success("Email verified! We are happy to have you here")
            dispatch(resetResendOtpStatus())
        }
        return ()=>{
            dispatch(resetOtpVerificationStatus())
        }
    },[otpVerificationStatus])

    return (
        <div className="verify-email-card">
            <h2 className="title">Verify Your Email Address</h2>
            <p className="description">
                We will send you an OTP on <span className="email">{loggedInUser?.email}</span>
            </p>
            <button
                className="otp-button"
                onClick={handleOtpRequest}
                disabled={isOtpSent}
            >
                {isOtpSent ? "OTP Sent" : "GET OTP"}
            </button>

            {isOtpSent && otpVerificationStatus !== 'fulfilled' && (
                <div>
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
        <button onClick={() => handleOtpVerification({ otp })}>Verify OTP</button>
        </div>
            )}

            {otpVerificationStatus === 'pending' && <p>Verifying OTP...</p>}

            {otpVerificationStatus === 'fulfilled' && <p>Your email has been verified! You are now logged in.</p>}

            {otpVerificationStatus === 'rejected' && (
                <p style={{ color: 'red' }}>
                    OTP verification failed. {otpVerificationError?.message || "Please try again."}
                </p>
            )}
        </div>
    );
};

export default OtpVerification;
