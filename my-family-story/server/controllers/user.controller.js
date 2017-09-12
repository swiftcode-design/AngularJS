const User = require('../models/user.model.js');

module.exports = {

  getCurrentUser: (req, res, next) => {
    if (!req.user) {
      return res.status(200).send(null);
    };
    res.status(200).send(req.user);
  },

  readUser: (req, res, next) => {
    User.find(req.query, (err, user) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      };
      res.status(200).send(user);
    });
  },

  createUser: (req, res, next) => {
    User.create(req.body, (err, user) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      };
      res.status(200).send(user);
    });
  },

  updateUser: (req, res, next) => {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, user) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      };
      req.session.passport.user = user;
      res.status(200).send(user);
    });
  }

};
