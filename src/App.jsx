import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PostJobForm from './components/PostJobForm/PostJobForm';
import JobPostData from './components/JobPostData/JobPostData';
import CandidateData from './components/CandidateData/CandidateData'; // Import CandidateData component

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/post-job">Post a Job</Link>
            </li>
            <li>
              <Link to="/jobs">Job Listings</Link>
            </li>
            <li>
              <Link to="/candidates">Candidate Listings</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/post-job" element={<PostJobForm />} />
          <Route path="/jobs" element={<JobPostData />} />
          <Route path="/candidates" element={<CandidateData />} /> {/* Add route for CandidateData */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
