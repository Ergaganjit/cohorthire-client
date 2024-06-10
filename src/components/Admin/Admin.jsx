import React from 'react';
import { Link } from 'react-router-dom';


const Admin = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-menu">
        <li>
          <Link to="/candidates-list">Candidate Listings</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Admin;
