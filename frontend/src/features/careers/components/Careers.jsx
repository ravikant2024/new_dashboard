import React, { useEffect } from "react";
import "./Careers.css";
import hiring from "../../../assets/career-image.png"
const Careers = () => {

  const jobData = [
    {
      title: "Back-End Pricing Analyst",
      type: "Full Time",
      location: "Pune",
      posted: "6 hours ago",
      description:
        "Back-End Pricing Analyst Job Summary: Original Innovation LLP.in is India’s biggest robotics E-Commerce store. Our website has 15,000+ products that mainly include Drone Parts, E-bike Accessories, 3D Printer Parts, D...",
    },
    {
      title: "Senior Sales Engineer (Electronics, Electrical, or Mechanical Components)",
      type: "Full Time",
      location: "Pune",
      posted: "2 days ago",
      description:
        "Senior Sales Engineer (Electronics, Electrical, or Mechanical Components) Job Summary: We are building a High-Performance Electronic/Sales Engineer team here at ROBU.IN & have vacancy for Se...",
    },
    {
      title: "Senior Executive – Influencer Marketing & Social Media (Male Only)",
      type: "Full Time",
      location: "Pune",
      posted: "6 days ago",
      description:
        "Job description Job Title: Senior Executive – Influencer Marketing & Social Media (Male Only) Job Overview: We are looking for a Senior Executive – influencer Marketing & social media...",
    },
    {
      title: "Back-End Pricing Analyst",
      type: "Full Time",
      location: "Pune",
      posted: "6 hours ago",
      description:
        "Back-End Pricing Analyst Job Summary: Original Innovation LLP.in is India’s biggest robotics E-Commerce store. Our website has 15,000+ products that mainly include Drone Parts, E-bike Accessories, 3D Printer Parts, D...",
    },
    {
      title: "Senior Sales Engineer (Electronics, Electrical, or Mechanical Components)",
      type: "Full Time",
      location: "Pune",
      posted: "2 days ago",
      description:
        "Senior Sales Engineer (Electronics, Electrical, or Mechanical Components) Job Summary: We are building a High-Performance Electronic/Sales Engineer team here at ROBU.IN & have vacancy for Se...",
    },
    {
      title: "Senior Executive – Influencer Marketing & Social Media (Male Only)",
      type: "Full Time",
      location: "Pune",
      posted: "6 days ago",
      description:
        "Job description Job Title: Senior Executive – Influencer Marketing & Social Media (Male Only) Job Overview: We are looking for a Senior Executive – influencer Marketing & social media...",
    },
  ];

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant"
    })
  }, [])
  return (
    <>
      <div className="Career-container">
        <div className="Career-header">
          <img src={hiring} alt="Chair" className="Career-image" />
        </div>
        <h2 className="Career-title">What's there in Original Innovation LLP for you ???</h2>
        <h3 className="Career-subtitle">Well this ...</h3>
        <p className="Career-description">
          Many roles in other organizations make you stuck in a particular department such as Warehousing or Logistics or Procurement without any chance to properly understand or learn how the other departments work & interlink with each other. We have no such red tapes. You are free to interact & understand how every department functions. Everyone is there to help you. All you have to do is ask respectfully. Plus, <strong>its crazy fun & interesting!</strong> You get to see the impact of your work directly in the company's performance.
        </p>
        <p className="Career-description">
          <strong>We follow the OKR</strong> (Objective and Key Results) methodology religiously. It may happen that one of the company’s OKR is directly connected to your own! It’s exhilarating as well as nerve-racking! You are handed over responsibility straight away.
        </p>
        <p className="Career-description">
          <strong>Freedom to try & fail.</strong> If you have an idea which you want to try out, you’ve got complete freedom to pitch it with your teammates/Category Lead or Manager & convince them why it is worth trying! Your ideas & plans will be heard, pondered over & collectively analyzed before approving or rejecting it (with a valid & just explanation of course!).
        </p>
        <p className="Career-description">
          <strong>Work with a young & energetic team.</strong> Progression is based solely on merit & performance. No orthodox or rigid rules will limit your growth.
        </p>


      </div>
      <div className="job-listings-container">
        <h2 className="job-listings-heading">Wish to be a part of our team?</h2>
        <div className="job-listings">
          {jobData.map((job, index) => (
            <div key={index} className="job-card">
              {/* <div className="job-icon">
                <img
                  src="https://via.placeholder.com/100"
                  alt="Company Logo"
                />
              </div> */}
              <h3 className="job-title">{job.title}</h3>
              <p className="job-info">
                <i className="fas fa-briefcase"></i> {job.type}
              </p>
              <p className="job-info">
                <i className="fas fa-map-marker-alt"></i> {job.location}
              </p>
              <p className="job-info">
                <i className="fas fa-clock"></i> Posted {job.posted}
              </p>
              <p className="job-description">{job.description}</p>
              <div className="job-buttons">
                <button className="apply-btn">Quick Apply</button>
                <button className="read-more-btn">Read More</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Careers;
