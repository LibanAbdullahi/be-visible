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

  app.post('/api/certifications/new', (req, res) => {
    const certificationId = req.params.id;
    const roles = req.body.roles;
    if (roles.includes('coach')) {
      const certification = new Certification({
        certificationId,
        //certification: req.body.certification,
        topic: req.body.topic,
        message: req.body.message,
        date: req.body.date,
        badge_picture: req.body.badge_picture,
        id_coach: req.body.id_coach,
      });
      console.log(certification);
      certification.save((err, certification) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.send({ message: 'Certification created successfully!' });
      });
    } else {
      res.status(403).send({ message: 'Forbidden' });
    }
  });

  // coach can add certification to profile
  //api/users/:id/addCertification
  app.post('/api/users/:id/addCertification', (req, res) => {
    const profileId = mongoose.Types.ObjectId(req.params.id);
    const certificationId = req.body.certificationId;
    const roles = req.body.roles;
    Certification.findById(certificationId, (err, certification) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (roles.includes('coach')) {
        Profile.findById(profileId, (err, profile) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          profile.certifications.push(certification);
          profile.save((err, profile) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.send({ message: 'Certification added successfully!' });
          });
        });
      } else {
        res.status(403).send({ message: 'Forbidden' });
      }
    });
  });

  // app.post('/api/users/:id/addCertification', (req, res) => {
  //   const userId = req.params.id;
  //   const certificationId = req.body.id_certification;
  //   User.findById(userId, (err, user) => {
  //     if (err) {
  //       return res.status(500).send({ message: err });
  //     }
  //     if (!user) {
  //       return res.status(404).send({ message: 'User not found.' });
  //     }
  //     user.id_certification = certificationId;
  //     user.save((err, user) => {
  //       if (err) {
  //         return res.status(500).send({ message: err });
  //       }
  //       return res
  //         .status(200)
  //         .send({ message: 'User added to certification successfully.' });
  //     });
  //   });
  // });

  // check if user is a coach to create a new promotion
  app.post('/api/promotions/new', (req, res) => {
    const promotionId = req.params.id;
    const roles = req.body.roles;
    if (roles.includes('coach')) {
      const promotion = new Promotion({
        promotionId,
        promotion: req.body.promotion,
        name: req.body.name,
        description: req.body.description,
        date: req.body.date,
        badge_picture: req.body.badge_picture,
        id_coach: req.body.id_coach,
      });
      console.log(promotion);
      promotion.save((err, promotion) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.send({ message: 'Promotion created successfully!' });
      });
    } else {
      res
        .status(401)
        .send({ message: 'You are not authorized to create a promotion.' });
    }
  });

  // only coach can create a new promotion
  // app.post('/api/promotions/new', (req, res) => {
  //   const promotionId = req.params.id;
  //   const promotion = new Promotion({
  //     promotionId,
  //     promotion: req.body.promotion,
  //     name: req.body.name,
  //     description: req.body.description,
  //     date: req.body.date,
  //     image: req.body.image,
  //     id_coach: req.body.id_coach,
  //   });
  //   console.log(promotion);
  //   promotion.save((err, promotion) => {
  //     if (err) {
  //       res.status(500).send({ message: err });
  //       return;
  //     }
  //     res.send({ message: 'Promotion created successfully!' });
  //   });
  // });

  // Assign learner That does not have a promotion yet to promotion
  // POST => “/users/:id/addUserToPromo/promotion/:id

  /* this is the old code and it works but it is not the best way to do it*/
  // POST => “/users/:id/addUserToPromo/promotion/:id”
  app.post('/api/users/:id/addUserToPromo/promotion/:id', (req, res) => {
    const userId = req.params.id;
    const roles = req.body.roles;
    const promotionId = req.body.promotionId;
    Promotion.findById(promotionId, (err, Promotion) => {
      if (roles.includes('coach')) {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        if (!Promotion) {
          res.status(404).send({ message: 'Promotion not found!' });
          return;
        }
        User.findById(userId, (err, user) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          if (!user) {
            res.status(404).send({ message: 'User not found!' });
            return;
          }
          Promotion.learners.push(user._id).userId;
          Promotion.save((err, promotion) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.send({ message: 'User added to promotion successfully!' });
          });
        });
      } else {
        res.status(401).send({
          message: 'You are not authorized to add user to a promotion.',
        });
      }
    });

    //Create a company Account
    //POST => users/company/new
    app.post('/api/users/company/new', (req, res) => {
      const userId = req.params.id;
      const company = new User({
        userId,
        company: req.body.company,
        email: req.body.email,
        password: req.body.password,
        // id_role: req.body.id_role,
      });
      console.log(company);
      company.save((err, company) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.send({ message: 'Company created successfully!' });
      });
    });
  });
};
