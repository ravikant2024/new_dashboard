import React, { useEffect } from 'react';
import './b2b.css';
import logo from '../../../assets/logo.jpg';
import { Link } from 'react-router-dom';
import poeinjector from '../../../assets/DC_PoE_Injector.png';
import display from '../../../assets/display.jpg';
import pdf from "../../../assets/OPL Product Catalogue.pdf"

const B2BPage = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant"
    })
  }, [])
  return (
    <>
      {/* Logo + Company Name */}
      <div className="b2b-logo-container">
        <Link to="/" className="b2b-logo-link">
          <div className="b2b-logo">
            <img src={logo} alt="Original Innovation LLP Logo" />
          </div>
          <div className="b2b-company-name">
            <h1>Original Innovation LLP</h1>
          </div>
        </Link>
      </div>

      {/* Call to Join */}
      <div className="question-container">
        <div className="question-text">
          <h1>Want to be a part of Original Innovation LLP?</h1>
        </div>
        <div className="question-logo">
          <img src={logo} alt="logo" className="logo-image" />
        </div>
      </div>

      {/* Centered Button */}
      <div className="center-button">
        <a
          href={pdf}
          target="_blank"
          rel="noopener noreferrer"
          className="download-button"
        >
          Download PDF
        </a>
      </div>

      {/* Community Section */}
      <div className="community-container">
        <h1 className="community-title">Original Innovation LLP Community</h1>
        <p className="community-description">
          The Original Innovation LLP community is a huge amalgamation of students, educators, and professionals spanning throughout the country.
        </p>
        <p className="community-description">
          Original Innovation LLP has been actively working with individuals, firms, and organizations to create an inductive environment for everyone.
        </p>
        <p className="community-description">
          Original Innovation LLP nurtures talent by creating an environment where everyone can discuss and inspire others to build innovative stuff.
        </p>
      </div>

      {/* Product Section 1 */}
      <div className="section1">
        <div className="section1-image">
          <img src={poeinjector} alt="PoE Injector" />
        </div>
        <div className="section1-text">
          <h4 className="text-heading">Poe-injector</h4>
          <h3>PoE Injector, 24VDC, 24W</h3>
          <p>
            We are proud to announce to you that EyeROV’s underwater drones will use Orange Li-Ion Batteries from now on.
          </p>
        </div>
      </div>

      {/* Product Section 2 */}
      <div className="section2">
        <div className="section2-text">
          <h4 className="text-heading">Display</h4>
          <h4>
            DWIN 7inch HMI LCD, Capacitive Touch, TN TFT 800x480 800nit High Brightness LCD Display, DMG80480T070_09WTC (Industrial Grade)
          </h4>
          <p>
            LCD Type: TN, TFT LCD Resolution: 800×480 pixels (support 0°/90°/180°/270°) Rated Power: 5W Operating Voltage: 6~36V, typical value of 12V Operating Current: 340mA: VCC=12V, max backlight - 120mA: VCC=12V, backlight off Recommended power supply: 12V 1A DC Type: CTP (Capacitive touch panel) Structure: G+G structure with surface cover of tempered glass Touch Mode: Support point touch and drag Surface
          </p>
        </div>
        <div className="section2-image">
          <img src={display} alt="Display" />
        </div>
      </div>

      {/* Button Below Sections */}
      <div className="center-button">
        <a href={pdf} className="download-button">
          Download PDF
        </a>
      </div>

      {/* About Section */}
      <section className="about-section">
        <h4 className="about-title">
          About <span>Original Innovation LLP</span>
        </h4>
        <p className="about-description">
          {/* [Paste your long paragraph here; for brevity it's removed here] */}
          The fact that you are here definitely means that you are curious to know more about us and being one of the founders of Original Innovation LLP it’s an honor to tell you all.

          The obvious question is why Original Innovation LLP? It’s a very common and important question. I ask this to myself every day. Why we started this company?

          To answer this we’ll have to go back to 2024. We were fresh graduates from engineering & had good offers from different companies. We started our careers with decent packages and everything seems to be going well. But then we realized that something is missing, warming, honesty, and relentless dedication was just short. We felt right. We came back from our phones and asked each other do we really want to do this?

          Finally, after a year, we gave our answer in a YES. This was the time to commence our struggles. We somehow decided that we will make our own venture. We tried making prototypes, making presentations. We struggled for 2 long years and finally, we reached a dead end. No market, No money, No type of guiding person, and with limited resources, the pressure from our families…...the list is endless.

          We decided not to stop making progress. But then our dream of doing something hands-on was still alive. We gave ourselves to the different jobs which are coming our way. Sourcing, trading, retailing, designing, branding, everything that we could do. Thereby, we tried to reduce our financial crises.

          During that while, we came across many students, individuals & many other organizations which needed various hardware products. These products are not commonly available in India and even if available are not of decent quality. We tried to find a solution to this and somehow came to know that we are here to make it effective and helpful for you to celebrate your milestone.

          This was our Eureka Moment.

          It took a lot of planning and some hard-earned money. Original Innovation LLP is a venture of Original Innovation LLP Innovation, a one-stop solution for all kinds of Electronic hardware components, Robotics, and various DIY projects.

          But, getting 1000s to position it is not an easy walk. It took a lot of challenges. But those 1 long years of struggles helped us immensely to reach Original Innovation LLP from a dream to what it is today.

          Today, India is taking giant leaps forward. Innovation is at the forefront & the people who are making it happen are heroes and pioneers. Original Innovation LLP wants to support and appreciate this Maker’s Revolution and play a part.

          I would end this by a few lines by Robert Frost which perfectly depicts our journey so far.        </p>
      </section>
    </>
  );
};

export default B2BPage;
