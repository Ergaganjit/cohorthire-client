import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AppliedJobsList = ({ candidateId }) => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      if (!candidateId) return; // Exit if candidateId is not provided
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8787/api/candidates/${candidateId}/jobs`);
        setAppliedJobs(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, [candidateId]);

  if (!candidateId) {
    return <p>Please enter a Candidate ID to view applied jobs.</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h2>List of Applied Jobs</h2>
      <ul>
        {appliedJobs.map(job => (
          <li key={job.id}>{job.jobTitle}</li>
        ))}
      </ul>
    </div>
  );
};

export default AppliedJobsList;
