import React from "react";
import "./footer.css";
import { FaFacebookF } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { CiHeadphones } from "react-icons/ci";
import { FaInstagramSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";


import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-grid">
          <div className="footer-col">
            <h4>ABOUT</h4>
            <ul>
              <li><Link to="/about-us">About Us</Link></li>
              <li><Link to="/contact-us">Contact Us</Link></li>
              <li><Link to="/b2b">OILLP B2B</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>My Account</h4>
            <ul>
              <li><Link to="/cart">Cart</Link></li>
              <li><Link to="/my-account">My Account</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Policies</h4>
            <ul>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/refund-policy">Refund Policy</Link></li>
              <li><Link to="/shipping-policy">Shipping Policy</Link></li>
            </ul>
          </div>
          <div className="footer-col wide">
            <h4>Mail Us:</h4>
            <p>
              Original Innovation LLP,<br />
              490,Udyog Vihar Phase V,<br /> Gurgoan, Haryana - 122016.
              <br />
              engineering@orginv8.com<br />
              Mobile: +919599466635
            </p>
            <h4>Social:</h4>
            <div className="footer-social-icons">

              <Link to="https://www.facebook.com/profile.php?id=61566401565182" target="_blank">
                <FaFacebookF />
              </Link>
              <Link to="https://x.com/LlpOriginal" target="_blank">
                <FaXTwitter />
              </Link>
              <Link to="https://www.instagram.com/original_innovation_llp" target="_blank">
                <FaInstagramSquare />
              </Link>
              <Link to="https://www.linkedin.com/in/original-innovation-llp-794968313/" target="_blank">
                <FaLinkedinIn />
              </Link>
            </div>
          </div>
          
          <div className="footer-col wide">
            <h4>Registered Office Address:</h4>
            <p>
              Original Innovation LLP,<br />
              B-19, 2nd Floor, Shiv Park, <br />
              School Road, Khanpur,
              <br />New Delhi -
              110062.<br />
              CIN :U62013MH2023PTC411571<br />
              Mobile: +919599466635
            </p>
          </div>
        </div>
      </div>
      <hr className="footer-divider" />
      <div className="footer-bottom">
        <div className="footer-left-links">
          <span>©2025 Original Innovation LLP</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
