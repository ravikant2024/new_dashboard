import React from 'react';
import "./Card.css";

const Card = ({ image, title }) => {
  return (
    <div className="cat-card">
      <div className="catcard-image-wrapper">
        <img src={image} alt={title} className="catcard-image" />
      </div>
      <div className="catcard-content">
        <h3 className="catcard-title">{title}</h3>
      </div>
    </div>
  );
};

export default Card;
