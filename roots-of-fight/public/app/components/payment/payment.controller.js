angular.module('app')
  .controller('paymentCtrl', function($scope, userSvc, productsSvc, $state){
    $scope.credit = {
      cardNum: 4242424242424242,
      name: "TestName",
      mm: "11/19",
      cvv: 333
    }
    userSvc.getAdderess().then(function(res){
      $scope.state = res.state.slice(4);
      $scope.address = res.street + ' ' + res.city + $scope.state;
    })

    $scope.postOrder = function(credit){
      productsSvc.completeOrder(credit).then(function(res){
        $state.go("home");
      })
    }
  })
