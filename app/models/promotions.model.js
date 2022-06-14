/** @format */

const mongoose = require('mongoose');

//promotion schema
const PromotionSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
    //required: true,
  },
  iteration: {
    type: String,
    // required: false,
  },
  description: {
    type: String,
    // required: true,
  },
  date: {
    type: Date,
    // required: true,
  },
  learners: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Learner' }],
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
    },
  ],
});

const Promotion = mongoose.model('Promotion', PromotionSchema);

module.exports = Promotion;
