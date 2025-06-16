import React from 'react'
import "./helpCenter.css"
import helpcenImage from "../../../assets/help-centre-login.png"
import { selectLoggedInUser } from '../../auth/AuthSlice';
import { useSelector } from 'react-redux';
const HelpCenter = () => {
    const loggedInUser = useSelector(selectLoggedInUser);
    console.log("obloggedInUserject", loggedInUser)
    return (
        <>
            <div className="help-center-container">
                <h1 className="help-center-title">Original Innovation LLP Help Center </h1>
                <p className="help-center-description">
                    Original Innovation LLP Help Centre offers quick assistance for issues related to orders, deliveries, returns, payments, and more. With user-friendly filters and dedicated support, customers can easily resolve queries and enjoy a smooth online shopping experience. Professional help is available via the support number or page for fast and efficient service.
                </p>
                <div className="help-content-area">
                    <div className="help-main-content">
                        <span className="breadcrumb">Help Centre</span>
                        {!loggedInUser.isAdmin===false && (
                            <div className="login-prompt">
                                <img
                                    src={helpcenImage}
                                    alt="Login Illustration"
                                    className="login-illustration"
                                />
                                <p>Login to get help with your recent orders and issues</p>
                                <button className="login-button">Log In</button>
                            </div>
                        )}

                    </div>
                </div>
            </div>

        </>
    )
}

export default HelpCenter
