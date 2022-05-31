/** @format */

const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  userinfo: {
    name: String,
    position: String,
    location: String,
    profile_pic: String,
    otw: Boolean,
  },
  about: {
    content: String,
  },

  education: [
    {
      degree: String,
      university: String,
      date: String,
      bulletpoints: [String],
      image: String,
    },
  ],
  experience: [
    {
      position: String,
      company: String,
      date: String,
      bulletpoints: [String],
      image: String,
    },
  ],
  skills: [
    {
      type: String,
    },
  ],
  certifications: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'CoachCertification' },
  ],
  languages: [
    {
      type: String,
    },
  ],
  projects: [
    {
      name: String,
      description: String,
      link: String,
      image: String,
    },
  ],
  id_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  contact: {
    email: String,
    phone: String,
    GitHub: String,
    LinkedIn: String,
    CV: String,
  },
});

// const profileSchema = new mongoose.Schema({
//   id: {
//     type: String,
//     required: true,
//   },
//   name: {
//     type: String,
//     required: true,
//   },
//   about: {
//     type: String,
//     required: true,
//   },
//   image: {
//     type: String,
//     required: true,
//   },
//   link: {
//     type: String,
//     required: true,
//   },
//   date: {
//     type: Date,
//     required: true,
//   },
//   id_user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//   },
// });

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;
