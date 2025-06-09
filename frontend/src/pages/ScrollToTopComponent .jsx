import React, { useState, useEffect } from 'react';
import ScrollToTop from 'react-scroll-to-top';

const ScrollToTopComponent = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth > 768); // Change breakpoint as needed
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  if (!isDesktop) return null;

  return (
    <ScrollToTop
      smooth
      style={{
        backgroundColor: isHovered ? '#fff' : '#cc7a00',
        width: '30px',
        height: '30px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%',
        padding: '6px',
        marginBottom: '40px',
        transition: 'background-color 0.3s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span style={{ fontSize: '20px', color: '#000' }}>↑</span>
    </ScrollToTop>
  );
};

export default ScrollToTopComponent;
