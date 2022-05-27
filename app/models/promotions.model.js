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
// // const promotion = new Promotion({
// //   id: '1',
// //   name: 'Johnson-7',
// //   // iteration: '1',
// // });
// promotion.save();

module.exports = Promotion;

// POST => “/users/:id/addUserToPromo/promotion/:id”
//  app.post('/api/users/:id/addUserToPromo/promotion/:id', (req, res) => {
//   const userId = req.params.id;
//   const promotionId = req.body.promotionId;
//   Promotion.findById(promotionId, (err, Promotion) => {
//     if (err) {
//       res.status(500).send({ message: err });
//       return;
//     }
//     if (!Promotion) {
//       res.status(404).send({ message: 'Promotion not found!' });
//       return;
//     }
//     User.findById(userId, (err, user) => {
//       if (err) {
//         res.status(500).send({ message: err });
//         return;
//       }
//       if (!user) {
//         res.status(404).send({ message: 'User not found!' });
//         return;
//       }
//       Promotion.learners.push(user._id);
//       Promotion.save((err, Promotion) => {
//         if (err) {
//           res.status(500).send({ message: err });
//           return;
//         }
//         res.send({ message: 'User added to promotion successfully!' });
//       });
//     });
//   });
