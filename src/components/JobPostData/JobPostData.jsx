import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './JobPostData.scss';
import PostJobForm from '../PostJobForm/PostJobForm';
import { FaTrash, FaEdit, FaUserCheck } from 'react-icons/fa';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const JobPostData = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editJob, setEditJob] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [candidatesPerPage] = useState(6);
  const [warningMessage, setWarningMessage] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_BACKEND_SERVER_URL + '/api/jobs');
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
      const jobResponse = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/jobs/${jobId}`);
      const candidateResponse = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/jobs/${jobId}/candidates`);

      const jobData = jobResponse.data;
      jobData.candidates = candidateResponse.data;

      setSelectedJob(jobData);
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

  const handleStatusChange = async (jobId, candidateId, newStatus) => {
    try {
      setSelectedJob(prevJob => ({
        ...prevJob,
        candidates: prevJob.candidates.map(candidate => {
          if (candidate.id === candidateId) {
            return { ...candidate, status: newStatus };
          }
          return candidate;
        })
      }));

      const formData = {
        jobId: jobId,
        candidateId: candidateId,
        newStatus: newStatus
      };

      await axios.patch(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/jobs/${jobId}/candidates`, formData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      setWarningMessage("");
    } catch (err) {
      setError(err);
    }
  };

  const handleLoadMore = () => {
    const currentCandidates = selectedJob.candidates.slice(0, candidatesPerPage);
    const allRejected = currentCandidates.every(candidate => candidate.status === 'rejected');

    if (allRejected) {
      setCurrentPage(prevPage => prevPage + 1);
      setWarningMessage("");
    } else {
      setWarningMessage("Warning: Review Pending for First Cohort List");
    }
  };

  return (
    <div className="job-post-data">
      <div className="job-listing-header">
        <h2 className="welcome-message">Hello Employer!</h2>
      </div>
      <div className="job-container">
        <div className="job-list">
          <TransitionGroup>
            {jobs.map((job) => (
              <CSSTransition key={job.id} timeout={300} classNames="job">
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
                  <div className="job-card-content">
                    <p><strong>Company:</strong> {job.company}</p>
                    <p><strong>Location:</strong> {job.location}</p>
                    <p><strong>Type:</strong> {job.jobType}</p>
                    <p><strong>Pay:</strong> {job.pay}</p>
                  </div>
                </div>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
        <div className="job-details-container">
          {selectedJob ? (
            <div className="job-details">
              <h3>Selected Job Details</h3>
              <p><strong>Job Title:</strong> {selectedJob.jobTitle}</p>
              <p><strong>Description:</strong> {selectedJob.jobDescription}</p>
              <p><strong>Company:</strong> {selectedJob.company}</p>
              <p><strong>Location:</strong> {selectedJob.location}</p>
              <p><strong>Type:</strong> {selectedJob.jobType}</p>
              <p><strong>Pay:</strong> {selectedJob.pay}</p>

              {selectedJob.candidates && selectedJob.candidates.length >= 0 ? (
                <div className="candidate-list">
                  <h3>Candidates for Selected Job</h3>
                  <ul>
                    <TransitionGroup>
                      {selectedJob.candidates.slice(0, (currentPage + 1) * candidatesPerPage).map(candidate => (
                        <CSSTransition key={candidate.id} timeout={300} classNames="candidate">
                          <li key={candidate.id}>
                            <div className="candidate-info">
                              <div>
                                <strong>Name:</strong> {candidate.name}
                              </div>
                              <div>
                                <strong>Email:</strong> {candidate.email}
                              </div>
                              <div>
                                <strong>Phone:</strong> {candidate.phone}
                              </div>
                              <div>
                                <strong>Resume:</strong> {candidate.resume}
                              </div>
                              <div>
                                <strong>Cover Letter:</strong> {candidate.coverLetter}
                              </div>
                              <div>
                                <strong>Application Date:</strong> {candidate.applicationDate}
                              </div>
                            </div>
                            <div className="candidate-actions">
                              <strong>Status:</strong>
                              <div className="status-buttons">
                                <button
                                  className={`status-button inprogress ${candidate.status === 'inprogress' ? 'active' : ''}`}
                                  onClick={() => handleStatusChange(selectedJob.id, candidate.id, 'inprogress')}>
                                  In Progress
                                </button>
                                <button
                                  className={`status-button accepted ${candidate.status === 'accepted' ? 'active' : ''}`}
                                  onClick={() => handleStatusChange(selectedJob.id, candidate.id, 'accepted')}>
                                  Accepted
                                </button>
                                <button
                                  className={`status-button rejected ${candidate.status === 'rejected' ? 'active' : ''}`}
                                  onClick={() => handleStatusChange(selectedJob.id, candidate.id, 'rejected')}>
                                  Rejected
                                </button>
                              </div>
                            </div>
                          </li>
                        </CSSTransition>
                      ))}
                    </TransitionGroup>
                    {(currentPage + 1) * candidatesPerPage < selectedJob.candidates.length && (
                      <>
                        <button onClick={handleLoadMore}>Load More</button>
                        {warningMessage && <p className="warning-message">{warningMessage}</p>}
                      </>
                    )}
                  </ul>
                </div>
              ) : (
                <p>No candidates have applied for this job.</p>
              )}
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
