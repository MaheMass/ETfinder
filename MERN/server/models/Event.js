const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  details: { type: String, required: true },
  poster: { type: String },
});

const EventModel = mongoose.model('Event', EventSchema);

module.exports = EventModel;
