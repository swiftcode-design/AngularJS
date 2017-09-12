(function() {

  angular
    .module('app')
    .service('UserService', ['$http', UserService]);

  function UserService($http) {
    this.getUser = function() {
      return $http.get('/api/auth/me').then(function(res){
        return res.data;
      })
    };
    this.updateUser = function(user){
      return $http({
        method: 'PUT',
        url: '/api/user/' + user._id,
        data: user
      })
    }

  };
})();
