import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './JobPostData.scss'; // Import your SCSS file for styling
import { FaTrash, FaEdit } from 'react-icons/fa'; // Import trash and edit icons from react-icons
import PostJobForm from '../PostJobForm/PostJobForm'; // Import the PostJobForm component

const JobPostData = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false); // State variable for edit mode
  const [editJob, setEditJob] = useState(null); // State variable to store job data for editing

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

  const handleDelete = async (jobId) => {
    try {
    
      await axios.delete(`http://127.0.0.1:8787/api/jobs/${jobId}`);
      setJobs(jobs.filter(job => job.id !== jobId));
      setSelectedJob(null); // Clear selected job after deletion
    } catch (err) {
      setError(err);
    }
  };

  const handleEdit = async (jobId) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8787/api/jobs/${jobId}`);
        const editedJob = response.data;
        // Update the job in the jobs array
        const updatedJobs = jobs.map(job => {
          if (job.id === editedJob.id) {
            return editedJob;
          }
          return job;
        });
        setJobs(updatedJobs);
        setEditJob(editedJob); // Set job data for editing
        setEditMode(true); // Activate edit mode
      } catch (err) {
        setError(err);
      }
  };

  const handleCancelEdit = () => {
    setEditMode(false); // Deactivate edit mode
    setEditJob(null); // Clear edit job data
  };

  if (loading) {
    return <p>Loading jobs...</p>;
  }

  if (error) {
    return <p>Error loading jobs: {error.message}</p>;
  }

  return (
    <div className="job-post-data">
      <h2>Job Listings</h2>
      <table className="job-table">
        {/* Table header */}
        <tbody>
          {/* Jobs list */}
          {jobs.map((job) => (
            <tr key={job.id} onClick={() => handleJobClick(job.id)}>
              <td>{job.id}</td>
              <td>{job.jobTitle}</td>
              <td>{job.company}</td>
              <td>{job.location}</td>
              <td>{job.jobType}</td>
              <td>{job.pay}</td>
              <td>
                <button onClick={() => handleDelete(job.id)}>
                  <FaTrash />
                </button>
                <button onClick={() => handleEdit(job.id)}>
                  <FaEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Job details */}
      {selectedJob && (
        <div className="job-details">
          <h3>Selected Job Details</h3>
          {Object.entries(selectedJob).map(([key, value]) => (
            <p key={key}><strong>{key}:</strong> {value}</p>
          ))}
        </div>
      )}
      {/* Edit job form */}
      {editMode && editJob && (
        <div className="edit-job-form">
          <h3>Edit Job</h3>
          <PostJobForm jobData={editJob} onCancelEdit={handleCancelEdit} />
        </div>
      )}
    </div>
  );
};

export default JobPostData;
