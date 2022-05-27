/** @format */

exports.allAccess = (req, res) => {
  res.status(200).send('Public Content.');
};

exports.userBoard = (req, res) => {
  res.status(200).send('User Content.');
};

exports.coachBoard = (req, res) => {
  res.status(200).send('Coach Content.');
};

exports.learnerBoard = (req, res) => {
  res.status(200).send('learner Content.');
};

// create profile
exports.profileBoard = (req, res) => {
  res.status(200).send('Profile Content.');
};
