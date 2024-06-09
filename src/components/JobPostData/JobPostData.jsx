import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './JobPostData.scss';
import { FaTrash, FaEdit } from 'react-icons/fa';
import PostJobForm from '../PostJobForm/PostJobForm';
import Modal from '../Modal/Modal';
import { CSSTransition } from 'react-transition-group'; // Import CSSTransition

const JobPostData = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editJob, setEditJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      setIsModalOpen(true);
    } catch (err) {
      setError(err);
    }
  };

  const handleDelete = async (jobId, event) => {
    event.stopPropagation();
    try {
      await axios.delete(`http://127.0.0.1:8787/api/jobs/${jobId}`);
      setJobs(jobs.filter(job => job.id !== jobId));
      setSelectedJob(null);
    } catch (err) {
      setError(err);
    }
  };

  const handleEdit = async (jobId, event) => {
    event.stopPropagation();
    try {
      const response = await axios.get(`http://127.0.0.1:8787/api/jobs/${jobId}`);
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
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Company</th>
          <th>Location</th>
          <th>Type</th>
          <th>Pay</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {jobs.map((job) => (
          <tr key={job.id} onClick={() => handleJobClick(job.id)}>
            <td>{job.id}</td>
            <td>{job.jobTitle}</td>
            <td>{job.company}</td>
            <td>{job.location}</td>
            <td>{job.jobType}</td>
            <td>{job.pay}</td>
            <td>
              <button onClick={(event) => handleDelete(job.id, event)}>
                <FaTrash />
              </button>
              <button onClick={(event) => handleEdit(job.id, event)}>
                <FaEdit />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    {isModalOpen && selectedJob && (
      <Modal onClose={() => setIsModalOpen(false)}>
        <div className="job-details">
          <h3>Selected Job Details</h3>
          {Object.entries(selectedJob).map(([key, value]) => (
            <p key={key}>
              <strong>{key}:</strong> {value}
            </p>
          ))}
        </div>
      </Modal>
    )}
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
