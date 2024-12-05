// src/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ isLoggedIn, handleLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Todo List
        </Link>
        <div className="navbar-nav ml-auto">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="btn btn-primary m-2">Login</Link>
              <Link to="/register" className="btn btn-secondary m-2">Register</Link>
            </>
          ) : (
            <>
              <Link to="/upload-event" className="btn btn-primary m-2">Upload Event</Link>
              <Link to="/event-list" className="btn btn-secondary m-2">Event List</Link>
              <button onClick={handleLogout} className="btn btn-danger m-2">Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
