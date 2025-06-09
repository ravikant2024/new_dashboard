import React, { useEffect, useRef, useState } from "react";
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaPhoneAlt } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { fetchLoggedInUserByIdAsync, resetUserInfo, selectUserInfo } from "../user/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "../auth/AuthSlice";
import { resetWishlist } from "../wishlist/WishlistSlice";

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const dropdownRef = useRef(null);
  const accountRef = useRef(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const loggedInUser = useSelector(selectLoggedInUser);
  const userInfo = useSelector(selectUserInfo);

  useEffect(() => {
    if (userInfo && userInfo._id) {
      dispatch(fetchLoggedInUserByIdAsync(userInfo._id));
    }
  }, [dispatch]);


  //  Logout function //
  const handleLogout = () => {
    navigate("/logout");
      dispatch(resetWishlist());
  };

  const handleMyAccountClick = () => {
    if (loggedInUser && loggedInUser._id === "77f2434c53bbe09c7c63f666") {
      navigate("/my-account");
    } else {
      navigate("/");
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleClickOutside = (event) => {
    if (
      accountRef.current && !accountRef.current.contains(event.target) &&
      dropdownRef.current && !dropdownRef.current.contains(event.target)
    ) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="header">
        <div className="left-section">
          {/* <FaPhoneAlt className="phone-icon" /> */}
          <h5 className="phone-number">+919599466635</h5>
          <span className="divider">|</span>
          <a href="#" className="customer-support">Customer Support</a>
        </div>

        <div className="right-section">
          {/* <Link to="/orders" className="nav-link">My Orders</Link>
          <span className="divider">|</span> */}
          <Link to="/order-tracking" className="nav-link">Track your order</Link>
          <span className="divider">|</span>
          <div
            className="my-account-container"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <div className="my-account" onClick={handleMyAccountClick}>

              {loggedInUser?.isAdmin === false ? userInfo?.name : "My Account"}

              {/* <span className="account-dropdown">&#9662;</span> */}
            </div>
            {userInfo && isDropdownOpen && loggedInUser?.isAdmin === false && (
              <div className="account-dropdown-menu" ref={dropdownRef}>
              <ul>
                <li>
                  <Link to="/user-profile">Profile</Link>
                </li>
                <li>
                  <Link to="/orders">Orders</Link>
                </li>
                <li onClick={handleLogout}>Logout</li>
              </ul>
            </div>
            
            )}

          </div>
          <span className="divider">|</span>
          <div className="social-icons">
            <Link to="https://www.facebook.com/profile.php?id=61566401565182" target="_blank" className="social" ><FaFacebookF /></Link>
            <span className="divider">|</span>
            <Link to="https://www.instagram.com/original_innovation_llp" target="_blank" className="social"><FaInstagram /></Link>
            <span className="divider">|</span>
            < Link to="https://x.com/LlpOriginal" target="_blank" className="social"><BsTwitterX /></Link>
            <span className="divider">|</span>
            <Link to="https://www.linkedin.com/in/original-innovation-llp-794968313/" target="_blank" className="social"><FaLinkedinIn /></Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;

