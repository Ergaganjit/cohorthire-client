import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

const AppliedJobsPage = ({ candidateId }) => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      if (!candidateId) return;
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/candidates/${candidateId}/jobs`);
        setAppliedJobs(response.data);
        console.log(response.data);
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
        {appliedJobs.map((job) => (
          <li key={job.id}>{job.jobTitle}</li>
        ))}
      </ul>
    </div>
  );
};

export default AppliedJobsPage;
