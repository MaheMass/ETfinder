import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    axios.get('http://localhost:3001/api/events')
      .then(response => setEvents(response.data))
      .catch(error => console.error('Error fetching events:', error));
  };

  const handleDelete = (eventId) => {
    axios.delete(`http://localhost:3001/api/events/${eventId}`)
      .then(response => {
        console.log('Event deleted:', response.data);
        fetchEvents(); // Refresh the event list after deletion
      })
      .catch(error => console.error('Error deleting event:', error));
  };

  return (
    <div className="container mt-4">
      <h2>Uploaded Events</h2>
      <Link to="/UploadEvent" className="btn btn-success mb-3">Add Event</Link>
      <div className="row">
        {events.map(event => (
          <div className="col-md-4 mb-3" key={event.id}>
            <div className="card">
              <img 
                src={`http://localhost:3001${event.poster}`} 
                alt={event.name} 
                className="card-img-top" 
                style={{ height: '200px', objectFit: 'cover' }} 
              />
              <div className="card-body">
                <h5 className="card-title">{event.name}</h5>
                <p className="card-text"><strong>Date:</strong> {event.date}</p>
                <p className="card-text">{event.details}</p>
                
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
