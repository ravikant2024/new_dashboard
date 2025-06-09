import React, { useEffect } from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant"
    })
  }, [])
  return (
    <div className="privacy-policy-container">
      <h1 className="privacy-policy-title">Privacy Policy</h1>

      <section>
        <h2>Privacy Policy</h2>
        <p>We are committed to protecting your privacy. This privacy policy 
          explains how we collect, use, and protect your personal information when you use 
          our website or services. We collect personal information such as your name, email, 
          address, and payment details to process your orders. Your information is securely stored 
          and will not be shared with third parties without your consent, except as necessary to
           fulfill your orders or comply with legal obligations. You have the right to access,
            update, or delete your personal information by 
            contacting us at <a href="mailto:engineering@orginv8.com">engineering@orginv8.com</a> For more details, please review our complete privacy policy on our website.</p>
      </section>

    </div>
  );
};

export default PrivacyPolicy;