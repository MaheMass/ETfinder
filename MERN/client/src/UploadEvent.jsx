import React, { useState } from 'react';
import axios from 'axios';

const UploadEvent = () => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventDetails, setEventDetails] = useState('');
  const [eventPoster, setEventPoster] = useState(null);
  const [successMessage, setSuccessMessage] = useState(''); // State for success message

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', eventName);
    formData.append('date', eventDate);
    formData.append('details', eventDetails);
    formData.append('poster', eventPoster);

    try {
      const response = await axios.post('http://localhost:3001/api/events', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Event uploaded successfully:', response.data);
      setSuccessMessage('Event uploaded successfully!'); // Set success message
      // Clear the form fields after successful upload
      setEventName('');
      setEventDate('');
      setEventDetails('');
      setEventPoster(null);
    } catch (error) {
      console.error('Error uploading event:', error);
      setSuccessMessage('Error uploading event. Please try again.'); // Set error message
    }
  };

  return (
    <div className="container mt-4">
      <h2>Upload Event</h2>
      {successMessage && <div className="alert alert-info">{successMessage}</div>} {/* Display success message */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="eventName" className="form-label">Event Name</label>
          <input
            type="text"
            id="eventName"
            className="form-control"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="eventDate" className="form-label">Event Date</label>
          <input
            type="date"
            id="eventDate"
            className="form-control"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="eventDetails" className="form-label">Event Details</label>
          <textarea
            id="eventDetails"
            className="form-control"
            value={eventDetails}
            onChange={(e) => setEventDetails(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="eventPoster" className="form-label">Event Poster</label>
          <input
            type="file"
            id="eventPoster"
            className="form-control"
            onChange={(e) => setEventPoster(e.target.files[0])}
            accept="image/*"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit Event</button>
      </form>
    </div>
  );
};

export default UploadEvent;
