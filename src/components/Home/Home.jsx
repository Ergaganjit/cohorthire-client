import React from 'react';
import './Home.scss';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to JobPortal</h1>
      <p>Your gateway to the best job opportunities and candidates.</p>
      <div className="home-actions">
        <button>
          <a href="/post-job">Post a Job</a>
        </button>
        <button>
          <a href="/post-candidate">Post a Candidate</a>
        </button>
      </div>
    </div>
  );
};

export default Home;
