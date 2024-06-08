import React, { useState } from 'react';
import axios from 'axios';
import './PostJobForm.scss'; // Import your SCSS file

const PostJobForm = ({ jobData, onCancelEdit }) => {
  const [formData, setFormData] = useState(jobData || {
    jobTitle: '',
    company: '',
    numberOfOpenings: '',
    country: '',
    language: '',
    location: '',
    jobType: '',
    schedule: '',
    pay: '',
    supplementalPay: '',
    benefits: '',
    jobDescription: '',
    applicationMethod: '',
    requireResume: false,
    applicationUpdates: false,
    candidatesContactEmail: '',
    applicationDeadline: '',
    candidatesContactPhone: '',
    flexibleLanguageRequirement: false,
    hiringTimeline: '',
    expectedStartDate: '',
    sponsorship: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData({
      ...formData,
      [name]: newValue
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = formData.id
        ? `http://127.0.0.1:8787/api/jobs/${formData.id}`
        : 'http://127.0.0.1:8787/api/jobs';

      const method = formData.id ? 'put' : 'post';

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
        jobTitle: '',
        company: '',
        numberOfOpenings: '',
        country: '',
        language: '',
        location: '',
        jobType: '',
        schedule: '',
        pay: '',
        supplementalPay: '',
        benefits: '',
        jobDescription: '',
        applicationMethod: '',
        requireResume: false,
        applicationUpdates: false,
        candidatesContactEmail: '',
        applicationDeadline: '',
        candidatesContactPhone: '',
        flexibleLanguageRequirement: false,
        hiringTimeline: '',
        expectedStartDate: '',
        sponsorship: false
      });

      alert('Form submitted successfully');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form. Please try again later.');
    }
  };

  return (
    <div className="form-container">
      <h2>{formData.id ? 'Edit Job' : 'Post a Job'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Job Title:</label>
          <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Company:</label>
          <input type="text" name="company" value={formData.company} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Number of Openings:</label>
          <input type="number" name="numberOfOpenings" value={formData.numberOfOpenings} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Country:</label>
          <input type="text" name="country" value={formData.country} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Language:</label>
          <input type="text" name="language" value={formData.language} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Location:</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Job Type:</label>
          <input type="text" name="jobType" value={formData.jobType} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Schedule:</label>
          <input type="text" name="schedule" value={formData.schedule} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Pay:</label>
          <input type="text" name="pay" value={formData.pay} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Supplemental Pay:</label>
          <input type="text" name="supplementalPay" value={formData.supplementalPay} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Benefits:</label>
          <input type="text" name="benefits" value={formData.benefits} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Job Description:</label>
          <textarea name="jobDescription" value={formData.jobDescription} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Application Method:</label>
          <input type="text" name="applicationMethod" value={formData.applicationMethod} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Require Resume:</label>
          <input type="checkbox" name="requireResume" checked={formData.requireResume} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Application Updates:</label>
          <input type="checkbox" name="applicationUpdates" checked={formData.applicationUpdates} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Candidates Contact Email:</label>
          <input type="email" name="candidatesContactEmail" value={formData.candidatesContactEmail} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Application Deadline:</label>
          <input type="date" name="applicationDeadline" value={formData.applicationDeadline} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Candidates Contact Phone:</label>
          <input type="text" name="candidatesContactPhone" value={formData.candidatesContactPhone} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Flexible Language Requirement:</label>
          <input type="checkbox" name="flexibleLanguageRequirement" checked={formData.flexibleLanguageRequirement} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Hiring Timeline:</label>
          <input type="text" name="hiringTimeline" value={formData.hiringTimeline} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Expected Start Date:</label>
          <input type="date" name="expectedStartDate" value={formData.expectedStartDate} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Sponsorship:</label>
          <input type="checkbox" name="sponsorship" checked={formData.sponsorship} onChange={handleChange} />
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

export default PostJobForm;
