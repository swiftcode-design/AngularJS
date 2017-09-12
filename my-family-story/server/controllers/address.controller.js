const Address = require('../models/address.model.js');

module.exports = {

  createAddress: (req, res, next) => {
    Address.findOne({user: req.user._id}, function(err, address) {
      if (address) {
        Address.findByIdAndUpdate(address._id, req.body, { new: true }, (err, address) => {
          if (err) {
            console.log(err);
            return res.status(500).send(err);
          };
          res.status(200).send(address);
        });
      } else {
        Address.create(req.body, (err, address) => {
          if (err) {
            console.log(err);
            return res.status(500).send(err);
          };
          res.status(200).send(address);
        });
      }
    })
  },

  readAddress: (req, res, next) => {
    Address.find(req.query, (err, address) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      };
      res.status(200).send(address);
    });
  },

  updateAddress: (req, res, next) => {
    Address.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, address) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      };
      res.status(200).send(address);
    });
  },

  deleteAddress: (req, res, next) => {
    Address.findByIdAndRemove(req.params.id, (err, address) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      };
      res.status(200).send(address);
    });
  },


};
