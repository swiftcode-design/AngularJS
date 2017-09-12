const Book = require('../models/book.model.js');

module.exports = {

  createBook: (req, res, next) => {
    Book.create(req.body, (err, book) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      };
      res.status(200).send(book);
    });
  },

  readBook: (req, res, next) => {
    Book.find(req.query, (err, book) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      };
      res.status(200).send(book);
    });
  },

  readBookById: (req, res, next) => {
    Book.findById(req.params.id, (err, book) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      };
      res.status(200).send(book);
    });
  },

  updateBook: (req, res, next) => {
    Book.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, book) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      };
      res.status(200).send(book);
    });
  },

  deleteBook: (req, res, next) => {
    Book.findByIdAndRemove(req.params.id, (err, book) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      };
      res.status(200).send(book);
    });
  }

};
