import React from 'react';
import './ourService.css';
import pcblogo from '../../assets/pcblogo.png';

const services = [
    { id: 1, name: 'PCB Manufacturing ', image: pcblogo },
    { id: 2, name: 'Online FDM 3D Printing Service', image: pcblogo },
    { id: 3, name: 'Customized Lithium ion ', image: pcblogo },
    { id: 4, name: 'Metal Laser Cutting Service', image: pcblogo },
  
  
];

const OurService = () => {
    return (
        <>
        <div className="service-container">
            <h2 className="our-service">Our Services</h2>
            <div className="pcb-cards">
                {services.map((service) => (
                    <div className="pcb-card" key={service.id}>
                        <div className="pcb-image">
                            <img src={service.image} alt={service.name} />
                        </div>
                        <div className="pcb-details">
                            <h2>{service.name}</h2>
                            <button className="order-button">Order Now</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
};

export default OurService;
