import React from 'react';
import "../Components/footer.css";
import logo from "../../../assets/logo-removebg.png";
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bulk-footer">
      <div className="bulk-footer-section bulk-logo-section">
        <img src={logo} alt="logo" className="bulk-logo" />
        <h4 className="bulk-company-name">Original Innovation LLP</h4>
      </div>

      <div className="bulk-footer-section">
        <h4>Why choose us?</h4>
        <ul>
          <li><Link to="#">Support</Link></li>
          <li><Link to="/about-us">About Us</Link></li>
          <li><Link to="/contact-us">Contact Us</Link></li>
        </ul>
      </div>

      <div className="bulk-footer-section">
        <h4>Policies</h4>
        <ul>
          <li><Link to="/privacy-policy">Privacy Policy</Link></li>
          <li><Link to="/Shipping-Refund">Shipping and Refund Policy</Link></li>
          <li><Link to="#">Terms of Service</Link></li>
          <li><Link to="/careers">Careers</Link></li>
          <li><Link to="#">FAQ</Link></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
