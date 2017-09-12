(function () {

  angular
    .module('app')
    .controller('adminPrintProductsController', ["$scope", "ProductService", adminPrintProductsController]);

  function adminPrintProductsController($scope, ProductService) {

    getAllProducts();

    function getAllProducts() {
      ProductService.getProductByCategory('prints')
        .then((response) => {
          $scope.allProducts = response;
        })
        .catch((err) => {
          console.log(err)
        });
    };

  };
})();
