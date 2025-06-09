import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./BannerWithSidebar.css";
import bannerImg1 from "../../assets/1.png";
import bannerImg2 from "../../assets/2.png";
import bannerImg3 from "../../assets/3.png";
import pcniocn from "../../assets/ACPOE.png";
import printing3D from "../../assets/power-supply.png"
import leser from "../../assets/display.jpg"
import customBattery from "../../assets/customBattery.png"
import { Link } from "react-router-dom";
const BannerWithSidebar = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  return (
    <div className="banner-container">
      {/* Sidebar */}

      <div className="sidebar">
        <h2 className="sidebar-title">
          <span className="fast-text">FAST</span> <br /> <span style={{ color: 'white' }}>Prototyping</span>
        </h2>
        <ul className="services-list">
          <li>

            <img src={pcniocn} alt="PCB" style={{ width: '40px', height: '30px' }} /> Poe-injector

          </li>
          <li>

            <img src={printing3D} style={{ width: '40px', height: '30px' }} alt="" /> Power Supply

          </li>
          <li>

            <img src={leser} style={{ width: '40px', height: '30px' }} alt="" />Display
          </li>
          <li>

            <img src={customBattery} style={{ width: '40px', height: '30px' }} alt="Battery Pack" /> Switches

          </li>
        </ul>
      </div>
      {/* Banner */}
      <div className="banner-slider">
        <Slider {...settings}>
          <div>
            <img src={bannerImg1} alt="Banner 1" className="banner-image" />
          </div>
          <div>
            <img src={bannerImg2} />
          </div>
          <div>
            <img src={bannerImg3} alt="Banner 3" className="banner-image" />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default BannerWithSidebar;
