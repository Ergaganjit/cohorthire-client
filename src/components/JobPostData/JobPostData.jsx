import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import Toastify for notifications
import './JobPostData.scss';
import PostJobForm from '../PostJobForm/PostJobForm';
import { FaTrash, FaEdit, FaUserCheck } from 'react-icons/fa';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const JobPostData = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editJob, setEditJob] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_BACKEND_SERVER_URL+'/api/jobs');
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
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/jobs/${jobId}`);
      setSelectedJob(response.data);
    } catch (err) {
      setError(err);
    }
  };

  const handleDelete = async (jobId, event) => {
    event.stopPropagation();
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/jobs/${jobId}`);
      setJobs(jobs.filter(job => job.id !== jobId));
      setSelectedJob(null);
    } catch (err) {
      setError(err);
    }
  };

  const handleEdit = async (jobId, event) => {
    event.stopPropagation();
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/jobs/${jobId}`);
      const editedJob = response.data;
      const updatedJobs = jobs.map(job => {
        if (job.id === editedJob.id) {
          return editedJob;
        }
        return job;
      });
      setJobs(updatedJobs);
      setEditJob(editedJob);
      setEditMode(true);
    } catch (err) {
      setError(err);
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditJob(null);
  };

  return (
    <div className="job-post-data">
      <div className="job-listing-header">
        <h2 className="welcome-message">Hello Employer!</h2>
        <p className="instruction-message">You can view your posts, edit job postings, and delete them if vacancies are filled.</p>
      </div>
      <div className="job-container">
        <div className="job-list">
          {jobs.map((job) => (
            <div key={job.id} className="job-card" onClick={() => handleJobClick(job.id)}>
              <div className="job-card-header">
                <h3>{job.jobTitle}</h3>
                <div className="job-card-actions">
                  <button onClick={(event) => handleDelete(job.id, event)}>
                    <FaTrash />
                  </button>
                  <button onClick={(event) => handleEdit(job.id, event)}>
                    <FaEdit />
                  </button>
                  <div className="application-count">
                    <FaUserCheck /> {job.candidateCount}
                  </div>
                </div>
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
