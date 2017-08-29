const app = require('./../server')
  ,db = app.get('db')
  ,jwt = require('jsonwebtoken')
  ,bcrypt = require('bcryptjs')
  ,_ = require('lodash')
  ,config = require('./../config.js');



  module.exports = {
    deleteOrder: function(req, res, next){
      var orderId = req.params.id;
      var token = req.headers.token;
      var decoded;
      var userId;

      try {
        decoded = jwt.verify(token, config.secret);
      } catch(err) {
        return Promise.reject(err);
      }
      userId = decoded.id;
      db.delete.delete_order([userId, orderId], function(err, deleteRes) {
        if(err){
          res.send(err);
        }
        else {
          res.send(deleteRes);
        }
      })





    }
  }
