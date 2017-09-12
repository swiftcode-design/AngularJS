(function() {

  angular
    .module('app')
    .service('addressService', addressService);

  function addressService($http) {
    this.getAddress = function(user) {
      return $http.get('/api/address?user=' + user).then(function(res){
        return res.data;
      })
    };


    this.postAddress = function(address) {
      return $http({
        method: "POST",
        url: "/api/address",
        data: address
      })
    }




  };
})();
