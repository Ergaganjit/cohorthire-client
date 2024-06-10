import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import PostJobForm from './components/PostJobForm/PostJobForm';
import PostCandidatesForm from './components/PostCandidateForm/PostCandidateForm';
import JobPostData from './components/JobPostData/JobPostData';
import CandidateData from './components/CandidateData/CandidateData';
import Employer from './components/Employer/Employer';
import Home from './components/Home/Home';
import Candidates from './components/Candidates/Candidates';
import JobPostDataCandidates from './components/JobPostData/JobPostDataCandidates';
import Admin from './components/Admin/Admin';
import './App.scss';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/employer/job/new" element={<PostJobForm />} />
            <Route path="/employer/jobs" element={<JobPostData />} />
            <Route path="/candidates-list" element={<CandidateData />} />
            {/* <Route path="/post-candidate" element={<PostCandidatesForm />} /> */}
            <Route path="/post-candidate/:jobId" Component={PostCandidatesForm} />
            <Route path="/employer" element={<Employer />} />
            <Route path="/candidate" element={<Candidates />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/candidate/jobs" element={<JobPostDataCandidates />} /> {/* New route */}

          </Routes>
        </main>
        <footer className="footer">
          <p>&copy; 2024 CohortHire. All rights reserved by DevOrbs.</p>
        </footer>
      </div>
    </Router>
  );
};


export default App;
