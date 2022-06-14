/** @format */
const authJwt = require('../middlewares/authJwt');
const controller = require('../controllers/auth.controller');
const Project = require('../models/projects.model');
const User = require('../models/user.model');
const Profile = require('../models/profile.model');
const Role = require('../models/role.model');
const mongoose = require('mongoose');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
  });

  //// Create profile only if user is learner in the system
  // POST => “/users/:id/profile/new”
  app.post(
    '/api/users/:id/profile/new',
    [authJwt.verifyToken],
    async (req, res) => {
      const user = await User.findById(req.params.id).populate('roles');
      console.log(user);
      if (
        user.roles[0]._id == '62948da8500a9007cf43333a' ||
        user.roles[0]._id == '62948da8500a9007cf43333b'
      ) {
        const profile = await new Profile({
          userinfo: req.body.userinfo,
          education: req.body.education,
          experience: req.body.experience,
          skills: req.body.skills,
          languages: req.body.languages,
          interests: req.body.interests,
          certifications: req.body.certifications,
          projects: req.body.projects,
          id_user: req.params.id,
          contact: req.body.contact,
        });
        try {
          await profile.save();
          user.profile = profile._id;
          await user.save();
          await res.send({
            message: `${profile.userinfo}'s profile has been created `,
          });
        } catch (err) {
          res.status(500).send({ message: err });
        }
      } else {
        res.status(403).send({ message: 'Forbidden' });
      }
    }
  );

  // Update Profile
  //POST => “/users/:id/profile/edit”
  app.post(
    '/api/users/:id/profile/edit',
    [authJwt.verifyToken],
    async (req, res) => {
      const user = await User.findById(req.params.id).populate('roles');
      console.log(user);
      const section = req.body.section;
      const content = req.body.content;

      const profile = await Profile.findOne({ id_user: req.params.id });
      profile[section] = content;
      profile.save((err, profile) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.send({ message: 'Profile updated successfully!' });
      });
    }
  );

  // Add a new project to the profile
  // //POST => “/users/:id/profile/add_project”
  app.post(
    '/api/users/:id/profile/add_project',
    [authJwt.verifyToken],
    (req, res) => {
      const userId = mongoose.Types.ObjectId(req.params.id);
      const project = new Project({
        id_user: userId,
        name: req.body.name,
        description: req.body.description,
        link: req.body.link,
        image: req.body.image,
      });
      Profile.findOne({ id_user: userId }, (err, profile) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        if (profile) {
          profile.projects.push(project);
          profile.save((err, profile) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.send({ message: 'Project added successfully!' });
          });
        } else {
          res.status(404).send({ message: 'Profile not found!' });
        }
      });
    }
  );

  // Get all informations from one profile
  //GET => “/users/:id/profile/ make sure access is protected
  // app.get('/api/users/:id/profile', authJwt.verifyToken, (re

  app.get('/api/users/:id/profile/', [authJwt.verifyToken], (req, res) => {
    const userId = mongoose.Types.ObjectId(req.params.id);
    const profile = Profile.findOne({ id_user: userId }, (err, profile) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (profile) {
        res.send({ profile });
      } else {
        res.status(404).send({ message: 'Profile not found!' });
      }
    });
    console.log(profile);
  });
};
