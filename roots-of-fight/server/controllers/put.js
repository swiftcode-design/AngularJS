const app = require('./../server')
  ,db = app.get('db')
  ,jwt = require('jsonwebtoken')
  ,bcrypt = require('bcryptjs')
  ,_ = require('lodash')
  ,config = require('./../config.js');

  module.exports = {
    updateCartQty: function(req, res, next){
      var qty = req.body.qty;
      var orderId = req.body.orderId;
      var token = req.headers.token;
      try {
        decoded = jwt.verify(token, config.secret);
      } catch(error) {
        return Promise.reject(error);
      }

      userId = decoded.id;
      db.put.update_qty([orderId, userId, qty], function(err, updateRes){
        if(err){
          res.send(err);
        }
        else{
          res.send(updateRes);
        }
      })
    }
  };
