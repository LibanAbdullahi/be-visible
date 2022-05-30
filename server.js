/** @format */

const express = require('express');
const cors = require('cors');
const cookieSession = require('cookie-session');

const dbConfig = require('./app/config/db.config');
const mongoose = require('mongoose');
//mongoose.Promise = global.Promise;
const dotenv = require('dotenv');
dotenv.config();

const app = express();

var corsOptions = {
  origin: '*',
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: 'beVisible-session',
    secret: 'COOKIE_SECRET', // should use as secret environment variable
    httpOnly: true,
  })
);

const db = require('./app/models');
const Role = db.role;

db.mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('connected to mongodb'))
  .catch(err => console.log(err));

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to BeVisible.' });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/coaches.routes')(app);
require('./app/routes/learners.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: 'company',
      }).save(err => {
        if (err) {
          console.log('error', err);
        }

        console.log("added 'company' to roles collection");
      });

      new Role({
        name: 'learner',
      }).save(err => {
        if (err) {
          console.log('error', err);
        }

        console.log("added 'Learner' to roles collection");
      });

      new Role({
        name: 'coach',
      }).save(err => {
        if (err) {
          console.log('error', err);
        }

        console.log("added 'coach' to roles collection");
      });
    }
  });
}

// initial();
