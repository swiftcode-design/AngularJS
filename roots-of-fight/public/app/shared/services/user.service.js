angular.module('app')
  .service('userSvc', function($http){


    this.createUser = function(user){
      return $http({
        method: 'POST',
        url: 'api/users',
        data: {
          firstname: user.firstname,
          lastname: user.lastname,
          emailaddress: user.emailaddress,
          password: user.password
        }
      }).then(function(res){
        console.log("create user", res);
        var token = res.headers()['x-auth'];
        var tokenObj = {'token': token}
        localStorage.setItem('tokenObj', JSON.stringify(tokenObj));
        return res;
      })
    }
    this.login = function(user){
      return $http({
        method: 'POST',
        url: `/api/users/login`,
        data: {
          email: user.email,
          password: user.password
        }
      }).then(function(res) {
        if(res.data === true){
          var token = res.headers()['x-auth'];
          var tokenObj = {'token': token}
          localStorage.setItem('tokenObj', JSON.stringify(tokenObj));
        }

        return res.data;
      })
    }

    this.getEmail = function(){
      var token = JSON.parse(localStorage.getItem('tokenObj')).token;
      return $http({
        method: "GET",
        url: "/api/users/email",
        headers: {
          "token": token
        }
      }).then(function(res){
        // var user = {
        //   email: res.data[0].email,
        //   firstname: res.data[0].firstname,
        //   lastname: res.data[0].lastname,
        //   address: res.data[0].street + ' ' +  res.data[0].city + ' ' + res.data[0].state + ' ' +  res.data[0].zipcode + ' ' +  res.data[0].country,
        //   phone: res.data[0].phone
        // }
        // return user;
        return res.data[0].email;

      })
    }
    this.getAdderess = function(){
      var token = JSON.parse(localStorage.getItem('tokenObj')).token;
      return $http({
        method: "GET",
        url: "/api/users/address",
        headers: {
          "token": token
        }
      }).then(function(res){
        return res.data[0];
      })
    }


  })
