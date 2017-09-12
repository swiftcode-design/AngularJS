const mongoose = require('mongoose');
const obj_id = mongoose.Schema.Types.ObjectId;

let address = new mongoose.Schema({

  address1: { type: String },
  address2: { type: String },
  city: { type: String },
  state: {type: String},
  zip: { type: String },
  country: { type: String },
  user: { type: obj_id, ref: "User" }

});

module.exports = mongoose.model('Address', address);
