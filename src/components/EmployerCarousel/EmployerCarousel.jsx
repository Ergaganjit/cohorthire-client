import React from 'react';
import './EmployerCarousel.scss'; // Import your SCSS file

const EmployerCarousel = () => {
  return (
    <div className="employer-carousel">
      <h2>Employer Carousel</h2>
      <div className="carousel-items">
        <div className="carousel-item">
          <h3>Employer 1</h3>
          <p>Description of employer 1</p>
        </div>
        <div className="carousel-item">
          <h3>Employer 2</h3>
          <p>Description of employer 2</p>
        </div>
        <div className="carousel-item">
          <h3>Employer 3</h3>
          <p>Description of employer 3</p>
        </div>
        {/* Add more carousel items as needed */}
      </div>
    </div>
  );
};

export default EmployerCarousel;
