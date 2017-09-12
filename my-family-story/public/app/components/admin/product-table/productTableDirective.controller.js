(function () {

  angular
    .module('app')
    .controller('productTableController', ['ProductService', '$scope', productTableController]);

  function productTableController(ProductService, $scope) {

    let ctrl = this;

    $scope.$watch('ctrl.allProducts', (newValue) => {
      if (newValue) ctrl.allProducts = newValue;
    });

    ctrl.submitProductChanges = (product) => {
        ProductService.updateProduct(product)
          .then((res) => {
            ProductService.getProductByCategory(ctrl.productType)
              .then(res => {
                ctrl.allProducts = res;
              })
              .catch((err) => {
                throw err;
              })
          })
          .catch((err) => {
            console.log(err);
          })
      };
    };
})();