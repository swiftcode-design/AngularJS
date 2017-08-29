angular.module('app')
  .service('addressSvc', function($http) {

    this.postAddress = function(address){
      var token = JSON.parse(localStorage.getItem('tokenObj')).token;

      return $http ({
        method: "POST",
        url: "/api/address",
        data: {
          address: address
        },
        headers: {
          "token": token
        }
      })
    }
  })
