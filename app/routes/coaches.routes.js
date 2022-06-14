/** @format */
const authJwt = require('../middlewares/authJwt');
const controller = require('../controllers/auth.controller');
const User = require('../models/user.model');
const Role = require('../models/role.model');
const Promotion = require('../models/promotions.model');
// const req = require('express/lib/request');
const Certification = require('../models/coach_certification.model');
const Profile = require('../models/profile.model');
const mongoose = require('mongoose');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
  });

  // coach can create a new certification
  // /api/certifications/new',
  app.post(
    '/api/certifications/new',
    [authJwt.verifyToken],
    async (req, res) => {
      const user = await User.findById(req.body.id).populate('roles');
      console.log(user);
      if (user.roles[0]._id == '62948da8500a9007cf43333b') {
        const certification = new Certification({
          //user: req.body.id,
          topic: req.body.topic,
          message: req.body.message,
        });
        await certification.save();
        res.send(certification);
      } else {
        res.send('You are not a coach');
      }
    }
  );

  // coach can add certification to profile
  //api/users/:id/addCertification
  app.post(
    '/api/users/:id/addCertification',
    [authJwt.verifyToken],
    async (req, res) => {
      const coach = await User.findById(req.params.id).populate('roles');
      console.log('coach', coach);

      if (coach.roles[0]._id == '62948da8500a9007cf43333b') {
        let foundProfile;

        try {
          const certification = await Certification.findById(
            req.body.certificationId
          );
          console.log('certification', certification);

          Profile.findOne({ id_user: req.body.userId }, (err, profile) => {
            foundProfile = profile;
            console.log('profile', profile);
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            if (profile) {
              profile.certifications.push(certification);
              profile.save();
              res.send({ message: 'Learner added to certification' });
            } else {
              res.send({ message: 'Learner already has a certification' });
            }
          });
        } catch (error) {
          res.send({ error: error, profile: foundProfile });
        }
      } else {
        res.send({ error: 'You are not a coach' });
      }
    }
  );

  // check if user is a coach in the database to create a new promotion
  app.post('/api/promotions/new', [authJwt.verifyToken], async (req, res) => {
    const user = await User.findById(req.body.id).populate('roles');
    console.log(user);
    if (user.roles[0]._id == '62948da8500a9007cf43333b') {
      // save promotion to database
      console.log(req.body);
      let promotion = new Promotion({
        name: req.body.name,
        description: req.body.description,
        // iteration: req.body.iteration,
      });

      try {
        promotion.save();
        res.send({
          success: 'New promo has been created | promotion id:' + promotion.id,
        });
      } catch (error) {
        res.send({ error: error });
      }
    } else {
      console.log(user.roles[0]._id);
      res.send({ error: 'you are not a coach' });
    }
  });

  // check if user is a coach in the database to create a new promotion
  // POST => “/users/:id/addUserToPromo/promotion/:id”
  app.post(
    '/api/users/:id/addUserToPromo/promotion',
    [authJwt.verifyToken],
    async (req, res) => {
      const coach = await User.findById(req.params.id).populate('roles');
      console.log('coach', coach);

      if (coach.roles[0]._id == '62948da8500a9007cf43333b') {
        let foundProfile;

        try {
          const promotion = await Promotion.findById(req.body.promotionId);
          console.log('promotion', promotion);

          Profile.findOne({ id_user: req.body.userId }, (err, profile) => {
            foundProfile = profile;
            console.log('profile', profile);
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            if (profile) {
              profile.promotions.push(promotion);
              profile.save();
              res.send({ message: 'Learner added to promotion' });
            } else {
              res.send({ message: 'Learner already has a promotion' });
            }
          });
        } catch (error) {
          res.send({ error: error, profile: foundProfile });
        }
      } else {
        res.send({ error: 'You are not a coach' });
      }
    }
  );

  // check if user is a coach in the database to create a new company user

  // Coach can Create a new company user
  //POST => users/company/new
  //     app.post(
  //       '/api/users/company/new',

  //       async (req, res) => {
  //         //check privilege
  //         const user = await User.findById(req.params.id).populate('roles');
  //         console.log(user);
  //         if (user.roles[0]._id == '62948da8500a9007cf43333a') {
  //           const users = await User.find({ email: req.body.email });
  //           console.log(users.length);

  //           if (users.length === 0) {
  //             const user = new User({
  //               email: req.body.email,
  //               roles: req.body.roles,
  //               password: bcrypt.hashSync(req.body.password, 8),
  //             });
  //             user.save((err, user) => {
  //               if (err) {
  //                 res.status(500).send({ message: err });
  //                 return;
  //               }
  //               res.send({ message: 'User created successfully!' });
  //             });
  //           } else {
  //             res.status(400).send({ message: 'User already exists!' });
  //           }
  //         } else {
  //           res
  //             .status(401)
  //             .send({ message: 'You are not authorized to create a user.' });
  //         }
  //       }
  //     );
  //   }
  // );

  //  // Get all profiles from the app
  // GET => “/user/all” for all users from the app
  app.get('/api/users/all', async (req, res) => {
    //query profile
    try {
      const learner = await User.findById(req.body.id)
        .populate('profile')
        .populate('role');
      const profile = await Profile.findById(learner.profile.id)
        .populate('certifications')
        .populate('projects');
      console.log(profile);
      console.log(profile.certifications);
      res.status(200).send({
        data: student.profile,
        role: student.role,
        certification: profile.certifications,
        projects: profile.projects,
      });
    } catch (error) {
      res.send({ error: error });
    }
  });
};
