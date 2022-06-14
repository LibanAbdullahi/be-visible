/** @format */

const { authJwt } = require('../middlewares');
const controller = require('../controllers/user.controller');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
  });

  // app.get('/api/users/all', controller.allAccess);
  app.get('/api/users/all', [authJwt.verifyToken], controller.allAccess);
  app.get('/api/users/:id', [authJwt.verifyToken], controller.userProfile);
};
