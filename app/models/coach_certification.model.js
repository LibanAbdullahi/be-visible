/** @format */

const mongoose = require('mongoose');

const coachCertificationSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  topic: {
    type: String,
  },
  message: {
    type: String,
  },
  badge_picture: {
    type: String,
  },
  id_coach: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
});

const CoachCertification = mongoose.model(
  'CoachCertification',
  coachCertificationSchema
);

// const coachCertification = new CoachCertification({
//   //id: '1',
//   // topic: 'Topic 1',
//   Message: 'Message 1',
//   badge_picture: 'badge_picture 1',
//   //id_profile: '1',
// });
// coachCertification.save();

module.exports = CoachCertification;
