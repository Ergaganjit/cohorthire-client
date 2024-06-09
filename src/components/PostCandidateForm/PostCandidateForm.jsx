// PostCandidatesForm.jsx

import React, { useState } from 'react';
import axios from 'axios';
import './PostCandidateForm.scss';

const PostCandidatesForm = ({ jobId, onCancelApply }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: '',
    coverLetter: '',
    status: 'applied'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://127.0.0.1:8787/api/candidates`, { ...formData, jobId });
      setFormData({
        name: '',
        email: '',
        phone: '',
        resume: '',
        coverLetter: '',
        status: 'applied'
      });
      onCancelApply();
      alert('Application submitted successfully');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit application. Please try again later.');
    }
  };

  return (
    <div className="form-container">
      <h2>Apply for the Job</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Resume:</label>
          <input type="text" name="resume" value={formData.resume} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Cover Letter:</label>
          <textarea name="coverLetter" value={formData.coverLetter} onChange={handleChange} required />
        </div>
        <div className="form-actions">
          <button type="submit">Submit</button>
          <button type="button" onClick={onCancelApply}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default PostCandidatesForm;
