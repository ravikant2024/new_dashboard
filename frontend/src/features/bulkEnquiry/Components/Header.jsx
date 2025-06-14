import React from 'react'
import '../Components/header.css'
import { Link } from 'react-router-dom'
import logo from "../../../assets/logo.jpg"
const Header = () => {
    return (
        <>
            <div className="header-container">
                <div className="logo">
                    <Link to="/">
                        <img src={logo} alt="logo" />
                        <span>B2B</span>
                    </Link>
                </div>
                <ul className="menu">
                    <li><Link to="/">Home</Link></li>
                      <li><Link to="enquiry">Bulk Enquiry </Link></li>
                    <li><Link to="/about-us">About Us</Link></li>
                </ul>
            </div>
        </>
    )
}

export default Header
