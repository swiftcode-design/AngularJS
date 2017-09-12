const mongoose = require('mongoose');
const obj_id = mongoose.Schema.Types.ObjectId;

let book = new mongoose.Schema({

  title: { type: String },
  title_img: { type: String },
  date_started: { type: Date, default: new Date() },
  user: { type: obj_id, ref: "User" },
  print_qty: { type: obj_id, ref: "Product" },
  pages: [{
    text: { type: String },
    page_type: { type: String, default: "Basic" },
    activity_type: { type: String },
    custom_activity: { type: String },
    image_url: { type: String },
    edit_allowed: { type: Boolean },
    page_number: { type: Number }
  }]
});

module.exports = mongoose.model('Book', book);
