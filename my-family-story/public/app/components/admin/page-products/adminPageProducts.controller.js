(function () {

  angular
    .module('app')
    .controller('adminPageProductsController', ["$scope", "ProductService", adminPageProductsController]);

  function adminPageProductsController($scope, ProductService) {

    getAllProducts();

    function getAllProducts() {
      ProductService.getProductByCategory('page')
        .then((response) => {
          $scope.allProducts = response;
        })
        .catch((err) => {
          console.log(err)
        });
    };

  };
})();
