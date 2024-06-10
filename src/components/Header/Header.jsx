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
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/employer">Employer</Link>
        </li>
        <li>
          <Link to="/candidate">Jobs</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
