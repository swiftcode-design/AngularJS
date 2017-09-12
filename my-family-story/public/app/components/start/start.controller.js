(function () {

  angular
    .module('app')
    .controller('startController', ['$scope', '$state', 'ProductService', 'AuthService', 'user', startController]);

  function startController($scope, $state, ProductService, AuthService, user) {

    getProductByCategory('page');

    $scope.user = user;
    $scope.login = (stateOption) => {
      AuthService.login(stateOption);
    };
    $scope.goToState = (state) => {
      $state.go(state)
    };

    function getProductByCategory(category) {
      ProductService.getProductByCategory(category)
        .then((response) => { $scope.pageTypes = response })
        .catch((error) => console.log(error))
    };

  };
})();