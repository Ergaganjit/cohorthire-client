import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './JobPostData.scss';

const JobPostDataCandidates = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8787/api/jobs');
        setJobs(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleJobClick = async (jobId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8787/api/jobs/${jobId}`);
      setSelectedJob(response.data);
    } catch (err) {
      setError(err);
    }
  };

  if (loading) {
    return <p>Loading jobs...</p>;
  }

  if (error) {
    return <p>Error loading jobs: {error.message}</p>;
  }

  return (
    <div className="job-post-data">
      <div className="job-listing-header">
        <h2 className="welcome-message">Welcome to CohortHire Candidates!</h2>
        <p className="instruction-message">You can view job posts and details here.</p>
      </div>
      <div className="job-container">
        <div className="job-list">
          {jobs.map((job) => (
            <div key={job.id} className="job-card" onClick={() => handleJobClick(job.id)}>
              <div className="job-card-header">
                <h3>{job.jobTitle}</h3>
              </div>
              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Type:</strong> {job.jobType}</p>
              <p><strong>Pay:</strong> {job.pay}</p>
            </div>
          ))}
        </div>
        <div className="job-details-container">
          {selectedJob ? (
            <div className="job-details">
              <h3>Selected Job Details</h3>
              {Object.entries(selectedJob).map(([key, value]) => (
                <p key={key}>
                  <strong>{key}:</strong> {value}
                </p>
              ))}
            </div>
          ) : (
            <p>Select a job to see the details</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobPostDataCandidates;
