(function () {

  angular
    .module('app')
    .service('AuthService', ['$http', '$rootScope', '$state', '$location', '$window', AuthService]);

  function AuthService($http, $rootScope, $state, $location, $window) {

    this.logout = () => {
      return $http({
        method: 'GET',
        url: '/api/logout'
      })
        .then((res) => {
          $rootScope.$emit('user', null);
          $state.go('home');
          return res;
        })
        .catch((err) => {
          console.log(err);
        })
    }

    this.checkUser = () => {
      return $http({
        method: 'GET',
        url: '/api/auth/me'
      })
        .then((res) => {
          console.log('authservice checkuser', res.data)
          $rootScope.$emit('user', res.data)
          return res.data;
        })
        .catch((err) => {
          $rootScope.$emit('user', null)
          throw err;
        })
    };

    this.login = (stateOption) => {
      let state = $state.current.name;
      if (stateOption) {
        state = stateOption;
      };
      location.href = `/api/auth?state=${state}`;
    };

  };
})();


