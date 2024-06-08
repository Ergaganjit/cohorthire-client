import React from 'react';
import './BlogCard.scss'; // Import CSS file for styling

const BlogCard = ({ title, image, content }) => {
  return (
    <div className="blog-card">
      <div className="blog-card-inner">
        <div className="blog-card-front">
          <img src={image} alt="Blog" />
          <h3>{title}</h3>
        </div>
        <div className="blog-card-back">
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
