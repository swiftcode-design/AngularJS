(function() {

  angular
    .module('app')
    .controller('accountController', ['$scope', 'bookService', 'addressService', 'UserService', 'user', accountController]);

  function accountController($scope, BookService, addressService, UserService, user) {

    $scope.user = user;
    // addressService.user = $scope.user;

    BookService.getUserBooks(user._id).then(function(res){
      $scope.userBooks = res;
    })

    addressService.getAddress(user._id).then(function(res){
      $scope.userAddress = res[0];
    })

    $scope.updateUser = function(update){
      if(address){
        update._id = user._id;
        console.log(update);
        UserService.updateUser(update);
      }
    }


    $scope.CreateAddress = function(address){

      if(address !== undefined){
        address.user = $scope.user._id;
        addressService.postAddress(address);
        console.log(address);
      }
    }
    var input = document.querySelectorAll('input');
    for(var x = 0; x < input.length; x++){
      input[x].setAttribute('size', input[x].getAttribute('placeholder').length);
    }


  };


})();
