import React, { useState } from 'react';
import axios from 'axios';
import './PostCandidateForm.scss';
import { useParams } from 'react-router-dom';



const PostCandidatesForm = () => {
  const { jobId } = useParams();
  console.log("applying for job: ", jobId);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: '',
    coverLetter: '',
    status: 'applied',
    jobId: jobId // Include jobId in the initial formData
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
      await axios.post(process.env.REACT_APP_BACKEND_SERVER_URL+'/api/candidates', formData, { // Send formData including jobId
        headers: {
          'Content-Type': 'application/json',
        }
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        resume: '',
        coverLetter: '',
        status: 'applied',
        jobId: jobId // Reset jobId in formData
      });
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
        </div>
      </form>
    </div>
  );
};

export default PostCandidatesForm;

