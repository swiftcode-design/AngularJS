const Product = require('../models/product.model.js');

module.exports = {

  createProduct: (req, res, next) => {
    Product.create(req.body, (err, product) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      };
      res.status(200).send(product);
    });
  },

  readProduct: (req, res, next) => {
    Product.find(req.query, (err, product) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      };
      res.status(200).send(product);
    });
  },

  updateProduct: (req, res, next) => {
    Product.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, product) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      };
      res.status(200).send(product);
    });
  },

  deleteProduct: (req, res, next) => {
    Product.findByIdAndRemove(req.params.id, (err, product) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      };
      res.status(200).send(product);
    });
  }

};
