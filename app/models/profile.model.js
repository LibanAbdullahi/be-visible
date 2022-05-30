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
  },

  education: [
    {
      type: String,
      detail: {
        major: String,
        degree: String,
        grade: String,
        startdate: Date,
        enddate: Date,
        remarks: String,
      },
    },
  ],
  experience: [
    {
      type: String,
      detail: {
        position: String,
        company: String,
        dateofjoin: String,
        dateofretire: String,
        location: String,
        responsibilities: [{ type: String }],
        description: String,
      },
    },
  ],
  skills: [
    {
      type: String,
      detail: {
        skill: String,
        level: String,
      },
    },
  ],
  certifications: [
    {
      type: String,
      detail: {
        certification: String,
        date: String,
        issuer: String,
      },
    },
  ],
  languages: [
    {
      type: String,
      detail: {
        language: String,
        level: String,
      },
    },
  ],
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
  interests: [
    {
      type: String,
      detail: {
        interest: String,
        level: String,
      },
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
