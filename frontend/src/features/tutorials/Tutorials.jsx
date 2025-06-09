import React from 'react';
import './tutorials.css';
import pcblogo from '../../assets/pcblogo.png';

const tutorialsData = [
    { id: 1, name: 'Interfacing SmartElex Sensors', image: pcblogo, description: 'Interfacing SmartElex Sensors  – A Complete Information and Guide For Users' },
    { id: 2, name: 'Online FDM 3D Printing Service', image: pcblogo, description: 'Easy Raspberry pi 5 and OpenCV based object detection and sorting using python' },
    { id: 3, name: 'Customized Lithium ion Battery Pack', image: pcblogo, description: 'Easy Step-by-Step Guide for Setting Up a Raspberry Pi 5 for Beginners' },
    { id: 4, name: 'Metal Laser Cutting Service', image: pcblogo, description: 'Create an eye-catching scrolling text LED display using Arduino UNO' },
];

const Tutorials = () => {
    return (
        <>
            <div className="tutorialcard-container">
                <h2 className="tutorial-heading">Tutorials</h2>
                <div className="button-container">
                    <button>View All</button>
                </div>
                <div className="tutorial-container">
                    {tutorialsData.map((tutorial) => (
                        <div className="tutorial-card" key={tutorial.id}>
                            <div className="tutorial-header">
                                <div className="tutorial-details">
                                    <span>{tutorial.name}</span>
                                </div>
                                <div className="tutorial-right">
                                    <img src={tutorial.image} alt={tutorial.name} />
                                </div>
                            </div>
                            <div className="tutorial-description">
                                <p>{tutorial.description}</p>
                            </div>
                        </div>
                    ))}
                </div>


            </div>

        </>
    );
};

export default Tutorials;
