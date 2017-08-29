angular.module('app')
  .controller('AccountController', function($scope, $state, userSvc) {

    userSvc.getEmail().then(function(res){
      $scope.email = res;
      
    })

    $scope.logOut = function(){
      localStorage.removeItem('tokenObj');
      $state.go('home');
    }
  })
