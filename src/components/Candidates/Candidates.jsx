import React from 'react';
import './Candidates.scss';
import candidateImage from '../../assets/images/front page.webp';

const Candidates = () => {
  return (
    <div className="candidates-container">
      <div className="candidates-content">
        <h2 className="candidates-title">Struggling with the Hiring Process?</h2>
        <p className="candidates-description">
        Get Noticed First with CohortHire's Candidate-First System!.At CohortHire, the first six applicants are reviewed first. Only if they are rejected will employers proceed with other applications. This ensures that you get noticed quickly and fairly.
        </p>
        <ul className="candidates-options">
          <li>
            <a href="/post-candidate">Register Profile</a>
          </li>
          <li>
            <a href="/job-postings">View Jobs</a>
          </li>
          <li>
            <a href="/tech-news">Tech News</a>
          </li>
        </ul>
      </div>
      <div className="candidates-image">
        <img
          src={candidateImage}
          alt="Candidates"
        />
      </div>
    </div>
  );
};

export default Candidates;
