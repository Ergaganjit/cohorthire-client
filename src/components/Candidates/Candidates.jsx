import React, { useState } from 'react';
import './Candidates.scss';
import candidateImage from '../../assets/images/front page.webp';
import { Link } from 'react-router-dom';
// import AppliedJobsList from '../AppliedJobList/AppliedJobList'; // Import AppliedJobsList component
import AppliedJobsPage from '../AppliedJobList/AppliedJobPage';
const Candidates = () => {
  const [candidateId, setCandidateId] = useState('');
  const [showAppliedJobs, setShowAppliedJobs] = useState(false);

  const handleCandidateIdChange = (e) => {
    setCandidateId(e.target.value.trim());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowAppliedJobs(true);
  };
  if (showAppliedJobs) {
    return <AppliedJobsPage candidateId={candidateId} />;
  }

  return (
    <div className="candidates-container">
      <div className="candidates-content">
        <h2 className="candidates-title">Struggling with the Hiring Process?</h2>
        <p className="candidates-description">
          Get Noticed First with CohortHire's Candidate-First System! At CohortHire, the first six applicants are reviewed first. Only if they are rejected will employers proceed with other applications. This ensures that you get noticed quickly and fairly.
        </p>
        <ul className="candidates-options">
          <li>
            <Link to="/post-candidate">Register Profile</Link>
          </li>
          <li>
            <Link to="/candidate/jobs">View All Jobs</Link> {/* Updated link */}
          </li>
        </ul>
       <div>
      <h1>Candidates</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Candidate ID:
          <input type="text" value={candidateId} onChange={handleCandidateIdChange} />
        </label>
        <button type="submit">Get Applied Jobs</button>
      </form>
    </div> 
      </div>
      <div className="candidates-image">
        <img src={candidateImage} alt="Candidates" />
      </div>
    </div>
  );
};

export default Candidates;
