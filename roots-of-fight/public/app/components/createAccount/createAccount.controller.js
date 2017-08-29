angular.module('app')
  .controller('CreateAccountController', function($scope, userSvc, $state){
    $scope.createUser = function(user){
      userSvc.createUser(user).then(function(res){
        if(res.data === ''){
          alert('email is already tied to an account');
        }
        else {
          $state.go('home');
        }
      });

    }
  })
