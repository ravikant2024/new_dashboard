import React, { useState } from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';
import "../Components/bulkEnquiry.css";
import maneger from "../../../assets/Dedicated_Manager.png";
import genuine from "../../../assets/Genuine.png";
import trusted_Clients from "../../../assets/trusted_Clients.png";
import sale_support from "../../../assets/sale_support.png";
import IOT from "../../../assets/IOT.png";
import Automation from "../../../assets/Automation.png";
import medical from "../../../assets/medical.png";
import drone from "../../../assets/drone.png";
import Footer from '../../footer/components/Footer';

const BulkEnquiry = () => {
    return (
        <>
            <Header />
            <section className="b2b-section">
                <div className="bulk-content">
                    <div className="text-content">
                        <h1>Business to<br />Business</h1>
                        <p>
                            We are fast growing electronics distribution company in PAN INDIA with operational capability and an excellent after sales services and distributing quality brands. We have quality brands with wide product selection which you can choose from.
                        </p>
                        <Link to="/b2b" className="btn">
                            Click here
                        </Link>
                    </div>
                    <div className="image-content">
                        {/* Replace this with actual image URL or base64 */}
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzkrPj6aN1RjgIbfIFzNnMu_-y35DIo_m7zholWnXyVamPqlRkPw&s=10&ec=72940545" alt="Business Meeting" />
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="why-choose-us">
                <h2>Why Choose Us?</h2>
                <div className="feature-container">
                    <div className="feature-item">
                        <img src={maneger} alt="Dedicated Manager" />
                        <h3>Dedicated Key Account Manager for B2B</h3>
                    </div>
                    <div className="feature-item">
                        <img src={genuine} alt="Genuine Components" />
                        <h3>100% Genuine Components</h3>
                    </div>
                    <div className="feature-item">
                        <img src={trusted_Clients} alt="Trusted Clients" />
                        <h3>Trusted by More Than 20,000 Corporate Clients</h3>
                    </div>
                    <div className="feature-item">
                        <img src={sale_support} alt="After Sale Support" />
                        <h3>Great After Sale Support</h3>
                    </div>
                </div>
            </section>

            {/* B2B Industries */}
            <section className="b2b-section">
                <h2>B2B Industries We Serve</h2>
                <div className="industry-container">
                    <div className="industry-item">
                        <img src={IOT} alt="IT/IoT" />
                        <h3>IT / IoT</h3>
                    </div>
                    <div className="industry-item">
                        <img src={Automation} alt="Automation" />
                        <h3>Automation</h3>
                    </div>
                    <div className="industry-item">
                        <img src={medical} alt="Medical" />
                        <h3>Medical</h3>
                    </div>
                    <div className="industry-item">
                        <img src={drone} alt="Drone Manufacturer" />
                        <h3>Drone Manufacturer</h3>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default BulkEnquiry;