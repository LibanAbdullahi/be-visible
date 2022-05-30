/** @format */

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require('./user.model');
db.role = require('./role.model');

db.ROLES = ['coach', 'learner', 'company'];

module.exports = db;

// const coach = await User.findById(req.body.id).populate('role');
// if (coach.roles[0]._id == '62948da8500a9007cf43333b') {
//   const users = await User.find({ email: req.body.email });
//   console.log(users.length);

//   if (users.length === 0) {
//     const user = new User({
//       email: req.body.email,
//       password: bcrypt.hashSync(req.body.password, 8),
//     });

//     const role = await Role.findOne({ title: 'company' });
//     user.role = role._id;
//     console.log(user._id);
//     await user.save((err, user) => {
//       if (err) {
//         res.status(500).send({ error: err });
//         return;
//       }
//       res.send({
//         message:
//           'Company was registered successfully! ' + user._id + ' ' + role,
//       });
//     });
//   } else {
//     res.send({ error: 'A user with this email address already exists' });
//   }
// } else {
//   console.log(admin.role._id);
//   res.send({ error: 'you dont have the sufficent rank to use this route' });
// }
