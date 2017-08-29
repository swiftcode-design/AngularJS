const app = require('./../server')
  ,db = app.get('db')
  ,jwt = require('jsonwebtoken')
  ,bcrypt = require('bcryptjs')
  ,_ = require('lodash')
  ,config = require('./../config.js');

module.exports = {

  createUser: function(req, res, next){
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.emailaddress;
    var password = req.body.password.toString();

    db.get.email_exists([email], function(err, resp) {
      if(resp.length !== 0){
        if(resp[0].userid === null) {
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
              db.post.user([firstname, lastname, hash], function(err, results) {
                if(err){
                  res.send(err);
                } else {
                  var token = jwt.sign({id: results[0].id.toString()}, config.secret).toString();
                  db.put.add_user_to_email([results[0].id], function(err, response){
                    return res.header('x-auth', token).send(response);
                  })
                }
              })

            })
          })
        }
        else{
          res.send(err);
        }
      }
      else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            db.post.user([firstname, lastname, hash], function(err, results) {
              if(err){
                res.send(err);
              } else {
                var token = jwt.sign({id: results[0].id.toString()}, config.secret).toString();

                db.post.create_user_email([results[0].id, email], function(err, respo){
                  if(err){
                    res.send(err);
                  } else{
                    return res.header('x-auth', token).send(respo);
                  }

                })
              }
            })
          })
        })
      }
    })
  },
  getUser: function(req, res, next) {
    db.get.get_user([req.body.email], function(err, results) {
      // console.log(results);
      if(err){
        res.send(err);
      }
      if(results.length > 0){
        bcrypt.compare(req.body.password, results[0].password, (err, result) => {
          if(err){
            res.send(err);
          }
            else {
            var token = jwt.sign({id: results[0].id.toString()}, config.secret).toString();
            return res.header('x-auth', token).send(result);
          }
        })
      }
      else{
        res.send(false);
      }
    })
  }
};
