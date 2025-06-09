import React from 'react';
import sameDayShipping from "../../assets/samedayshipping.png";
import seeeds from "../../assets/seeedimage.png";
import dedicated from "../../assets/dedicated.jpg";

const ShippingLogo = () => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center', /* Center horizontally */
    alignItems: 'center', /* Center vertically */
    height: '35vh', /* Set the height of the container */
  };

  const imageContainerStyle = {
    display: 'flex',
    gap: '70px', /* Adds 70px space between each image */
  };

  const imageStyle = {
    height: '100%', /* Makes sure images take full height of their container */
    maxHeight: '200px', /* Adjust the height of the images */
    width: 'auto', /* Maintain aspect ratio */
  };

  return (
    <div style={containerStyle}>
      <div style={imageContainerStyle}>
        <img src={sameDayShipping} alt="shipping" style={imageStyle} />
        <img src={seeeds} alt="shipping" style={imageStyle} />
        <img src={dedicated} alt="shipping" style={imageStyle} />
      </div>
    </div>
  );
};

export default ShippingLogo;
