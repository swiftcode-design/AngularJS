const Book = require('../models/book.model.js');
const User = require('../models/user.model.js');


module.exports = {

  getBooksByUser: (req, res, next) => {
    Book
      .find({user: req.params.id})
      .exec((err, books) => {
        if (err) {
          return res.status(500).send(err);
        }
        return res.status(200).send(books);
    })
  }

};
