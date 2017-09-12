const mongoose = require('mongoose');

let product = new mongoose.Schema({

  name: { type: String },
  description: { type: String },
  price: { type: Number },
  image1: { type: String },
  category: { type: String }

});

module.exports = mongoose.model('Product', product);
