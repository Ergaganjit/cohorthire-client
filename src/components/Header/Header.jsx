import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss'; // Import your SCSS file

const Header = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">CohortHire</Link>
      </div>
      <ul className="navbar-menu">
        <li>
          <Link to="/post-job">Post a Job</Link>
        </li>
        <li>
          <Link to="/jobs">Job Listings</Link>
        </li>
        <li>
          <Link to="/candidates">Candidate Listings</Link>
        </li>
        <li>
          <Link to="/post-candidate">Post a Candidate</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
