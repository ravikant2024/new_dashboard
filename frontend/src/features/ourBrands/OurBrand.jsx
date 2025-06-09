import React from 'react';
import "./ourBrand.css";
import intel from "../../assets/intel.png"
import m5stack from "../../assets/m5stack.png"
import seedstudio from "../../assets/seedstudio.png"
const brands = [
  { id: 1, name: "Adafruit", logo: seedstudio },
  { id: 2, name: "Arduino", logo: intel },
  { id: 5, name: "Microchip", logo: m5stack },
  { id: 6, name: "Adafruit", logo: intel },
  { id: 7, name: "Arduino", logo: m5stack },
];

const OurBrand = () => {
  return (
    <>
      <div className="brand-Featured">
        <div className='brand-heading'>
          <h4>Our Featured Brands</h4>
          <button className="brand-view-all">View All</button>
        </div>

        <div className="brand-container">
          {brands.map((brand) => (
            <div key={brand.id} className="brand-card">
              <div className="brand-logo">
                <img src={brand.logo} alt={`${brand.name} Logo`} />
                {/* <span>{brand.name}</span> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default OurBrand;
