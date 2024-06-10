import React from 'react';
import './Employer.scss';
import recruitmentImage from '../../assets/images/1.jpeg';

const Employer = () => {
  return (
    <div className="employer-container">
      <div className="employer-content">
        <h2 className="employer-title">Welcome to CohortHire Employers!</h2>
        <p className="employer-description">
          We provide a platform where you can easily manage your job postings,
          view posted jobs, and connect with top talent.
        </p>
        <ul className="employer-options">
          <li>
            <a href="/employer/job/new">Post a Job</a>
          </li>
          <li>
            <a href="/employer/jobs">View Job Posts</a>
          </li>
          <li>
            <a href="/blog">Publish a Blog</a>
          </li>
        </ul>
      </div>
      <div className="employer-image">
        <img
          src={recruitmentImage}
          alt="Recruitment"
        />
      </div>
    </div>
  );
};

export default Employer;
