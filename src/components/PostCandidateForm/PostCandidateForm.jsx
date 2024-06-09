import React, { useState } from 'react';
import axios from 'axios';
import './PostCandidateForm'; // Import your SCSS file

const PostCandidatesForm = ({ candidateData, onCancelEdit }) => {
  const [formData, setFormData] = useState(candidateData || {
    name: '',
    email: '',
    phone: '',
    jobId: '',
    applicationDate: '',
    status: ''
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
      const url = formData.id
        ? `http://127.0.0.1:8787/api/candidates/${formData.id}`
        : 'http://127.0.0.1:8787/api/candidates';

      // console.log("formData: ",formData);
      // const method = formData.id ? 'put' : 'post';
      const method = "POST";
      console.log("method: ",method);

      await axios({
        method,
        url,
        data: formData,
        headers: {
          'Content-Type': 'application/json',
        }
      });

      // Optionally, reset the form data after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        jobId: '',
        applicationDate: '',
        status: ''
      });

      alert('Form submitted successfully');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form. Please try again later.');
    }
  };

  return (
    <div className="form-container">
      <h2>{formData.id ? 'Edit Candidate' : 'Post a Candidate'}</h2>
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
          <label>Job ID:</label>
          <input type="text" name="jobId" value={formData.jobId} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Application Date:</label>
          <input type="date" name="applicationDate" value={formData.applicationDate} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Status:</label>
          <input type="text" name="status" value={formData.status} onChange={handleChange} required />
        </div>
        <div className="form-actions">
          <button type="submit">{formData.id ? 'Update' : 'Submit'}</button>
          {formData.id && (
            <button type="button" onClick={onCancelEdit}>Cancel</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PostCandidatesForm;
