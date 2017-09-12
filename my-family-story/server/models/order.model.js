const mongoose = require('mongoose');
const obj_id = mongoose.Schema.Types.ObjectId;

let order = new mongoose.Schema({

  books: [{ type: obj_id, ref: "Book"}],
  user: { type: obj_id, ref: "User"},
  subtotal: {type: Number},
  tax: {type: Number},
  ship_cost: {type: Number},
  ship_address: {
    ship_name: {type: String},
    ship_address1: {type: String},
    ship_address2: {type: String},
    ship_city: {type: String},
    ship_state: {type: String},
    ship_zip: {type: String},
    ship_country: {type: String}
  },
  completed: {
    stripe_transaction_id: { type: String },
    date: { type: Date },
    total: { type: Number }
  },
  archived: { type: Boolean }

});

module.exports = mongoose.model('Order', order);
