const app = require('./../server')
  ,db = app.get('db')
  ,jwt = require('jsonwebtoken')
  ,bcrypt = require('bcryptjs')
  ,_ = require('lodash')
  ,config = require('./../config.js');

module.exports = {
  getProducts: function(req, res, next){
    db.get.get_products([], function(err, results) {
      if(err){
        res.send(err);
      } else {
        res.send(results);
      }
    })
  },
  getUserProducts: function(req, res, next) {
    var token = req.headers.token;
    var decoded;
    var userId;

    try {
      decoded = jwt.verify(token, config.secret);
    } catch(error) {
      return Promise.reject(error);
    }
    userId = decoded.id;
    db.get.get_cart_products([userId], function(err, results) {
      if(err){
        res.send(err);
      } else {
        res.send(results);

      }
    })
  },
  getEmail: function(req, res, next){
    var token = req.headers.token;
    var decoded;
    var userId;

    try {
      decoded = jwt.verify(token, config.secret);
    } catch(error) {
      return Promise.reject(error);
    }
    userId = decoded.id;


    db.get.email([userId], function(err, emailResult){
      if(err){
        res.send(err);
      } else {
        res.send(emailResult);
      }
    })
  },
  cartLength: function(req, res, next) {
    var token = req.headers.token;
    var decoded;
    var userId;

    try {
      decoded = jwt.verify(token, config.secret);
    } catch(error) {
      return Promise.reject(error);
    }
    userId = decoded.id;
    db.get.get_cart_products([userId], function(err, getRes){
      if(err){
        res.send(err);
      } else {
        res.send(getRes);
      }
    })
  },
  getAddress: function(req, res, next){
    var token = req.headers.token;
    var decoded;
    var userId;

    try {
      decoded = jwt.verify(token, config.secret);
    } catch ( error ) {
      return Promise.reject( error );
    }

    userId = decoded.id;
    console.log(userId);
    db.get.address([userId], function(err , addressRes){
      if(err) {
        res.send(err);
      } else {
        res.send(addressRes);
      }
    })
  }

  // cartLength: function(req, res, next){
  //   console.log(req.headers);
  //   var token = req.headers.token;
  //   var userId;
  //   // db.get_cart_products([userId], function(err, getRes){
  //   //   if(err){
  //   //     res.send(err);
  //   //   } else {
  //   //
  //   //   }
  //   // })
  // }
  // createUser: function(req, res, next){
  //   console.log(req.body);
  //   var secret = "34";
  //   var password = req.body.password;
  //   var user = req.body.id;
  //
  //   var token = jwt.sign({id: user.toString()}, secret).toString();
  //   console.log(token);
  //
  //   var decoded;
  //
  //   try {
  //     decoded = jwt.verify(token, secret);
  //     console.log('verified?');
  //   } catch(e) {
  //     return Promise.reject();
  //   }
  //   decoded.user;
  //   console.log(decoded);
  //
  //
  //
  //   bcrypt.genSalt(10, (err, salt) => {
  //     bcrypt.hash(password, salt, (err, hash) => {
  //       console.log('hash', hash)
  //     })
  //   })
  //
  //
  //   var token = jwt.sign(req.body.id, '34');
  //   console.log('token', token);
  //
  //   var decoded = jwt.verify(token, '34');
  //   console.log('decoded', decoded);
  //   console.log('hello');
  //
  // }
};
