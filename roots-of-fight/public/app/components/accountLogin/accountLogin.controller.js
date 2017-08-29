angular.module('app')
  .controller('LoginController', function($scope, userSvc, $state, $timeout){
    $scope.test = 'test';
    $scope.user = {
      email: "testuser@gmail.com",
      password: '123456'
    }
    $scope.login = function(user) {
      userSvc.login(user).then(function(res) {
          if(res === true){
            $state.go('home');
          } else {
            alert("Invalid password or email")
          }
      })
    }







  })
