/** @format */

const mongoose = require('mongoose');
const experienceSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  position: {
    type: String,
  },
  company: {
    type: String,
  },
  duration: {
    type: String,
  },
  image: {
    type: String,
  },
  bulletpoints: [
    {
      type: String,
    },
  ],
});

const Experience = mongoose.model('Experience', experienceSchema);
module.exports = Experience;
