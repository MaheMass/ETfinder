const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const EmployeeModel = require('./models/Employee');
const EventModel = require('./models/Event');// Import your Event model

const app = express();

app.use(express.json());
app.use(cors());

// Check if uploads directory exists; if not, create it
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.use('/uploads', express.static(uploadDir));

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/employee", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Could not connect to MongoDB:", err));

// Employee Registration Route
app.post('/register', (req, res) => {
  EmployeeModel.create(req.body)
    .then(employee => res.json(employee))
    .catch(err => res.json(err));
});

// Employee Login Route
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  EmployeeModel.findOne({ email: email })
    .then(user => {
      if (user) {
        if (user.password === password) {
          res.json('Success');
        } else {
          res.json('The password is incorrect');
        }
      } else {
        res.json('The user does not exist');
      }
    })
    .catch(err => res.json(err));
});

// Multer configuration for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Event Upload Route
app.post('/api/events', upload.single('poster'), (req, res) => {
  const { name, date, details } = req.body;
  const poster = req.file ? `/uploads/${req.file.filename}` : null;

  const newEvent = new EventModel({
    name,
    date,
    details,
    poster,
  });

  newEvent.save()
    .then(event => res.json(event))
    .catch(err => res.status(400).json({ message: 'Error saving event', error: err }));
});

// Get All Events Route
app.get('/api/events', (req, res) => {
  EventModel.find()
    .then(events => res.json(events))
    .catch(err => res.status(500).json({ message: 'Error fetching events', error: err }));
});

// Delete Event Route
app.delete('/api/events/:id', (req, res) => {
  const { id } = req.params;

  EventModel.findByIdAndDelete(id)
    .then(event => {
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }

      // Delete the associated poster file
      if (event.poster) {
        const filePath = path.join(__dirname, event.poster);
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error('Error deleting file:', err);
            return res.status(500).json({ message: 'Error deleting file' });
          }
          console.log('File deleted successfully');
          return res.json({ message: 'Event deleted successfully' });
        });
      } else {
        res.json({ message: 'Event deleted successfully' });
      }
    })
    .catch(err => res.status(500).json({ message: 'Error deleting event', error: err }));
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
