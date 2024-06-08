import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CandidateData.scss'; // Import your SCSS file for styling
import { FaTrash, FaEdit } from 'react-icons/fa'; // Import trash and edit icons from react-icons
import PostCandidateForm from '../PostCandidateForm/PostCandidateForm'; // Import the CandidateForm component

const CandidateData = () => {
  const [candidates, setCandidates] = useState([]); // Initialize as an empty array
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false); // State variable for edit mode
  const [editCandidate, setEditCandidate] = useState(null); // State variable to store candidate data for editing

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8787/api/candidates');
        // Ensure the response data is an array
        if (Array.isArray(response.data)) {
          setCandidates(response.data);
        } else {
          setCandidates([]); // Fallback to an empty array if the response is not an array
        }
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  const handleCandidateClick = async (candidateId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8787/api/candidates/${candidateId}`);
     console.log(setSelectedCandidate(response.data));
    } catch (err) {
      setError(err);
    }
  };

  const handleDelete = async (candidateId) => {
    try {
      await axios.delete(`http://127.0.0.1:8787/api/candidates/${candidateId}`);
      setCandidates(candidates.filter(candidate => candidate.id !== candidateId));
      setSelectedCandidate(null); // Clear selected candidate after deletion
    } catch (err) {
      setError(err);
    }
  };

  const handleEdit = async (candidateId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8787/api/candidates/${candidateId}`);
      setEditCandidate(response.data); // Set candidate data for editing
      setEditMode(true); // Activate edit mode
    } catch (err) {
      setError(err);
    }
  };

  const handleSaveEdit = async (updatedCandidate) => {
    try {
      await axios.put(`http://127.0.0.1:8787/api/candidates/${updatedCandidate.id}`, updatedCandidate);
      const updatedCandidates = candidates.map(candidate => candidate.id === updatedCandidate.id ? updatedCandidate : candidate);
      setCandidates(updatedCandidates);
      setEditMode(false); // Deactivate edit mode
      setEditCandidate(null); // Clear edit candidate data
    } catch (err) {
      setError(err);
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false); // Deactivate edit mode
    setEditCandidate(null); // Clear edit candidate data
  };

  if (loading) {
    return <p>Loading candidates...</p>;
  }

  if (error) {
    return <p>Error loading candidates: {error.message}</p>;
  }

  return (
    <div className="candidate-data">
      <h2>Candidate Listings</h2>
      <table className="candidate-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Job ID</th>
            <th>Application Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => (
            <tr key={candidate.id} onClick={() => handleCandidateClick(candidate.id)}>
              <td>{candidate.id}</td>
              <td>{candidate.name}</td>
              <td>{candidate.email}</td>
              <td>{candidate.phone}</td>
              <td>{candidate.jobId}</td>
              <td>{candidate.applicationDate}</td>
              <td>{candidate.status}</td>
              <td>
                <button onClick={() => handleDelete(candidate.id)}>
                  <FaTrash />
                </button>
                <button onClick={() => handleEdit(candidate.id)}>
                  <FaEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedCandidate && (
        <div className="candidate-details">
          <h3>Selected Candidate Details</h3>
          {Object.entries(selectedCandidate).map(([key, value]) => (
            <p key={key}><strong>{key}:</strong> {value}</p>
          ))}
        </div>
      )}
      {editMode && editCandidate && (
        <div className="edit-candidate-form">
          <h3>Edit Candidate</h3>
          <PostCandidateForm candidateData={editCandidate} onSave={handleSaveEdit} onCancel={handleCancelEdit} />
        </div>
      )}
    </div>
  );
};

export default CandidateData;
