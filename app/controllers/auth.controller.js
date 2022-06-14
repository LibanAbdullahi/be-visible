/** @format */

const config = require('../config/auth.config');
const db = require('../models');
const User = db.user;
const Role = db.role;
const Profile = require('../models/profile.model');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const { user } = require('../models');
//const { role } = require('../models');
/*
exports.signup = async (req, res) => {
  const user = await new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    role: req.body.role,
  });

   user.save(req, res) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map((role) => role._id);
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  }
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          user.roles = roles.map((role) => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        user.roles = [role._id];
        user.save(err => {
          if (err) { res.status(500).send({ message: err }); return; }
          res.send({ message: "User was registered successfully!" })
        });
      });
    }
  };
*/

const newProfile = {
  userinfo: {
    name: 'Name',
    position: 'Position',
    location: 'Location',
    otw: false,
    profile_pic: '',
  },
  about: {
    content: 'This is the about section',
  },
  experience: [
    {
      position: 'Position',
      company: 'Company',
      date: '2022-2022',
      bulletpoints: ['New Bullet Point'],
      image: '',
    },
  ],
  education: [
    {
      university: 'University',
      degree: 'Degree',
      date: '2022-2022',
      bulletpoints: ['New Bullet Point'],
      image: '',
    },
  ],
  skills: [],
  projects: [],
  languages: [],
  contact: {
    email: 'email@email.com',
    phone: '32000000000',
    LinkedIn: 'username',
    GitHub: 'username',
    CV: 'link',
  },
};

exports.signup = async (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    Role.find(
      {
        name: { $in: req.body.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        user.roles = roles.map(role => role._id);
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
        });
      }
    );
  });
  const profile = await new Profile({
    userinfo: newProfile.userinfo,
    education: newProfile.education,
    experience: newProfile.experience,
    skills: newProfile.skills,
    languages: newProfile.languages,
    about: newProfile.about,
    // certifications: req.body.certifications,
    id_user: user._id,
    contact: newProfile.contact,
  });
  try {
    await profile.save();
    await res.send({
      message: `User and profile have been created `,
    });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

// sign up route for company
exports.signupCompany = async (req, res) => {
  //check privilege
  const user = await User.findById(req.params.id).populate('roles');
  console.log(user);
  if (user.roles[0]._id == '62948da8500a9007cf43333a') {
    const users = await User.find({ email: req.body.email });
    console.log(users.length);

    if (users.length === 0) {
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
      });

      const role = await Role.findOne({ title: 'company' });
      user.roles[0]._id;
      console.log(user._id);
      await user.save((err, user) => {
        if (err) {
          res.status(500).send({ error: err });
          return;
        }
        res.send({
          message:
            'Company was registered successfully! ' + user._id + ' ' + role,
        });
      });
    } else {
      res.send({ error: 'A user with this email address already exists' });
    }
  } else {
    console.log(admin.role._id);
    res.send({ error: 'you dont have access to this path' });
  }
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    .populate('roles', '-__v')
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: 'User Not found.' });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({ message: 'Invalid Password!' });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push('ROLE_' + user.roles[i].name.toUpperCase());
      }

      req.session.token = token;

      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        token: token,
      });
    });
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};

// 3. Learners Routes
// Create profile

//POST => /users/:id/profile/new
