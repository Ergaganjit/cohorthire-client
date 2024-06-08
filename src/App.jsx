import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header'; // Import the Header component
import PostJobForm from './components/PostJobForm/PostJobForm';
import PostCandidatesForm from './components/PostCandidateForm/PostCandidateForm';
import JobPostData from './components/JobPostData/JobPostData';
import CandidateData from './components/CandidateData/CandidateData';
import EmployerCarousel from './components/EmployerCarousel/EmployerCarousel';
import CandidateCarousel from './components/CandidateCarousel/CandidateCarousel';
import Home from './components/Home/Home';
import ClientReview from './components/ClientReview/ClientReview';
import './App.scss'; // Global styles

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Header /> {/* Include the Header component */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post-job" element={<PostJobForm />} />
            <Route path="/jobs" element={<JobPostData />} />
            <Route path="/candidates" element={<CandidateData />} />
            <Route path="/post-candidate" element={<PostCandidatesForm />} />
            
          </Routes>

        </main>
        <footer className="footer">
          <p>&copy; 2024 JobPortal. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
