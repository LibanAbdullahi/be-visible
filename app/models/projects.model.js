/** @format */

const mongoose = require('mongoose');

// project schema
const ProjectSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  },
  date: {
    type: Date,
  },
  id_profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
  },
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
