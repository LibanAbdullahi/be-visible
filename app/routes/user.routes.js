/** @format */

const { authJwt } = require('../middlewares');
const controller = require('../controllers/user.controller');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
  });

  app.get('/api/users/all', controller.allAccess);

  app.get(
    '/api/users/:id/profile',
    [authJwt.verifyToken],
    controller.userBoard
  );

  app.get(
    '/api/test/mod',
    [authJwt.verifyToken, authJwt.isLearner],
    controller.learnerBoard
  );
};

// app.get(
//   '/api/promotions/new',
//   [authJwt.verifyToken, authJwt.isAdmin],
//   controller.adminBoard
// ) };

// 3. Learners Routes
// Create profile

//POST => /users/:id/profile/new
/*
app.post('/users/:id/profile/new', (req, res) => {
  const userId = req.params.id;
  const profile = req.body;
  const newProfile = new Profile({
    userId,
    profile,
  });
  newProfile.save((err, profile) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({ message: 'Profile created successfully!' });
  });
});
*
/*app.post(
  '/users/:id/profile/new',
  [authJwt.verifyToken],
  controller.profileBoard
); */
