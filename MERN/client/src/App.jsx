// src/App.js
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Home from './Home';
import EventList from './EventList';
import UploadEvent from './UploadEvent';
import Navbar from './Navbar'; // Import Navbar component
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

  const handleLogout = () => {
    setIsLoggedIn(false); // Reset login status
  };

  return (
    <div className="app-container"> {/* Add this container */}
      <BrowserRouter>
        <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} /> {/* Use Navbar */}
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/UploadEvent" element={<UploadEvent />} />
        <Route path="/Events" element={<EventList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
