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

  //// Create profile only if user is learner
  // POST => “/users/:id/profile/new”
  app.post('/api/users/:id/profile/new', (req, res) => {
    const userId = req.params.id;
    const roles = req.body.roles;
    if (roles.includes('learner')) {
      const profile = new Profile({
        id_user: userId,
        userinfo: req.body.userinfo,
        education: req.body.education,
        experience: req.body.experience,
        skills: req.body.skills,
        languages: req.body.languages,
        interests: req.body.interests,
        certifications: req.body.certifications,
        projects: req.body.projects,
      });
      console.log(profile);
      profile.save((err, profile) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.send({ message: 'Profile created successfully!' });
      });
    } else {
      res.status(403).send({ message: 'Forbidden' });
    }
  });

  // app.post('/api/users/:id/profile/new', (req, res) => {
  //   const userId = req.params.id;
  //   const profile = new Profile({
  //     id_user: userId,
  //     userinfo: req.body.userinfo,
  //     education: req.body.education,
  //     experience: req.body.experience,
  //     skills: req.body.skills,
  //     languages: req.body.languages,
  //     certifications: req.body.certifications,
  //     projects: req.body.projects,
  //   });
  //   console.log(profile);
  //   profile.save((err, profile) => {
  //     if (err) {
  //       res.status(500).send({ message: err });
  //       return;
  //     }
  //     res.send({ message: 'Profile created successfully!' });
  //   });
  // });

  // app.post('/api/users/:id/profile/new', (req, res) => {s
  //   const userId = req.params.id;
  //   console.log(userId);
  //   res.send({ message: 'Profile created successfully!' });
  // });

  // Update Profile
  //POST => “/users/:id/profile/edit”
  app.post('/api/users/:id/profile/edit', (req, res) => {
    //const userId = req.params.id;
    const profileId = mongoose.Types.ObjectId(req.params.id);
    const userinfo = req.body.userinfo;
    const education = req.body.education;
    const experience = req.body.experience;
    const skills = req.body.skills;
    const languages = req.body.languages;
    const certifications = req.body.certifications;
    const projects = req.body.projects;
    const interests = req.body.interests;
    Profile.findById(profileId, (err, profile) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (profile) {
        profile.userinfo = userinfo;
        profile.education = education;
        profile.experience = experience;
        profile.skills = skills;
        profile.languages = languages;
        profile.certifications = certifications;
        profile.projects = projects;
        profile.interests = interests;
        profile.save((err, profile) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          res.send({ message: 'Profile updated successfully!' });
        });
      } else {
        res.status(404).send({ message: 'Profile not found!' });
      }
    });
  });

  // app.post('/api/users/:id/profile/edit', (req, res) => {
  //   const userId = req.params.id;
  //   console.log(userId);
  //   res.send({ message: 'Profile updated successfully!' });
  // });

  // Add a new project to the profile
  // //POST => “/users/:id/profile/add_project”
  app.post('/api/users/:id/profile/add_project', (req, res) => {
    const profileId = mongoose.Types.ObjectId(req.params.id);
    const project = new Project({
      id_user: profileId,
      name: req.body.name,
      description: req.body.description,
      link: req.body.link,
      image: req.body.image,
    });
    console.log(project);
    Profile.findById(profileId, (err, profile) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      profile.projects.push(project);
      profile.save((err, profile) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.send({ message: 'Project added successfully!' });
      });
    });
  });

  // app.post('/api/users/:id/profile/add_project', (req, res) => {
  //   const userId = mongoose.Types.ObjectId(req.params.id);

  //   console.log('hellooooo', userId);
  //   const project = new Project({
  //     id_user: userId,
  //     id_profile: Profile.id,
  //     name: req.body.name,
  //     description: req.body.description,
  //     link: req.body.link,
  //     image: req.body.image,
  //     date: req.body.date,
  //   });
  //   console.log(project);

  //   Profile.findById('6290c2ef190e534cc49c6b93', (err, profile) => {
  //     if (err) {
  //       res.status(500).send({ message: err });
  //       return;
  //     }
  //     console.log('from the profile', profile);
  //     console.log(err);
  //     profile.projects.push(project);
  //     profile.save((err, profile) => {
  //       if (err) {
  //         res.status(500).send({ message: err });
  //         return;
  //       }
  //       res.send({ message: 'Project added successfully!' });
  //     });
  //   });
  // });
};

//initalize the project
// function initalizeProject(req, res) {
//   const userId = req.params.id;
//   const project = req.body;
//   const newProject = new Project({
//     userId,
//     project,
//   });
//   newProject.save((err, project) => {
//     if (err) {
//       res.status(500).send({ message: err });
//       return;
//     }
//     res.send({ message: 'Project created successfully!' });
//   });
// }
