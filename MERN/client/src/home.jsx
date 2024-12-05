// src/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

function Home() {
    return (
        <div className="home-container">
            <h1 className="home-title">Welcome to the Todo Management App</h1>
            <p className="home-description">
                This is your platform to manage and explore various Todo list. 
                You can add list, view existing list .
            </p>
            <div className="home-buttons">
                <Link to="/UploadEvent" className="btn btn-success">Add list</Link> {/* This should match */}
                <Link to="/Events" className="btn btn-warning">View list</Link>
            </div>
        </div>
    );
}

export default Home;
