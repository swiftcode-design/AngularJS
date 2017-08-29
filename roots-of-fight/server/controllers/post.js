const app = require('./../server')
  ,db = app.get('db')
  ,jwt = require('jsonwebtoken')
  ,bcrypt = require('bcryptjs')
  ,_ = require('lodash')
  ,config = require('./../config.js');

  module.exports = {
    postToOrder: function(req, res, next) {
      var productId = req.body.orderDetails["id"];
      var size = req.body.orderDetails["size"];
      var qty = req.body.orderDetails["qty"];
      var token = JSON.parse(req.body.token).token;
      var decoded;
      var userId;
      try {
        decoded = jwt.verify(token, config.secret);
      } catch(e) {
        return Promise.reject(e);
      }
      userId = decoded["id"];

      db.get.check_order([userId], function(err, orderRes) {
        if(err) {
          res.send(err);
        }
        if(orderRes.length === 0){

          db.post.products_to_order([userId, productId, size, qty], function(err, pToORes){
            if(err){
              res.send(err);
            }
            else {
              res.send(pToORes);
            }

          })
        }
        if (orderRes.length > 0) {
          var orderId = orderRes.order_id;
          db.get.update_order_check([userId, productId], function(err, updateOrderRes){
            if(err) {
              res.send(err);
            }
            else if(updateOrderRes.length === 0){
              db.post.products_to_order([userId, productId, size, qty], function(err, newPostRes) {
                if(err){
                  res.send(err);
                }
                else {
                  res.send(newPostRes);
                }
              })
            }
            else {
              db.get.match_size([userId, productId, size], function(err, matchSizeRes) {
                if(err){
                  res.send(err);
                }
                if(matchSizeRes.length === 0) {
                  db.post.products_to_order([userId, productId, size, qty], function(err, newPostRes) {
                    if(err){
                      res.send(err);
                    }
                    else {
                      res.send(newPostRes);
                    }
                  })
                }
                else{
                  var orderId = matchSizeRes[0].order_id;
                   var updatedQty = JSON.parse(matchSizeRes[0].qty) + qty;
                  db.put.update_order([orderId, updatedQty], function(err, update_orderRes) {
                    if(err){
                      res.send(err);
                    }
                    else{
                      res.send(update_orderRes);
                    }
                  })
                }
              })
            }
          })
        }
      })

    },
    postAddress: function(req, res, next){
      var token = req.headers.token;

      var street = req.body.address.street;
      var city = req.body.address.city;
      var state = req.body.address.state;
      var country = req.body.address.country;
      var zip = req.body.address.zipcode;
      var phone = req.body.address.phone;
      var first = req.body.address.name;
      var last = req.body.lastname;
      var company = req.body.company;
      var apt = req.body.apt;

      var decoded;
      var userId;
      try {
        decoded = jwt.verify(token, config.secret);
      } catch(err) {
        return Promise.reject(err);
      }
      userId = decoded.id;
       db.get.address([userId], function(err, addressRes){
         if(err){
           res.send(err);
         } else {
           if(addressRes.length === 0 ){
             db.post.address([userId, street, city, state, country, zip, phone, first, last, company, apt], function(err, postRes){
               if(err){
                 res.send(err);
               } else{
                 res.send(true);
               }
             })
           } else {
             db.put.address([userId, street, city, state, country, zip, phone, first, last, company, apt], function(err, putAddress){
               if(err){
                 res.send(err);
               } else {
                 res.send(true);
               }
             })
           }
         }
       })

    },
    completeOrder: function(req, res, next) {
      var token = req.headers.token;
      console.log(token);

      var decoded;
      var userId;
      try {
        decoded = jwt.verify(token, config.secret);
      } catch(err) {
        return Promise.reject(err);
      }
      userId = decoded.id;
      console.log(userId);
      var timestamp = new Date();
      timestamp = timestamp.toLocaleDateString();
      console.log(timestamp);
      db.put.order([userId, timestamp], function(err, orderRes) {
        if(err) {
          res.send(err);
        } else {
          console.log(orderRes);
          res.send(orderRes);
        }
      })
    }
  };
