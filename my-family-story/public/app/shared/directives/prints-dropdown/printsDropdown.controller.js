(function () {

  angular
    .module('app')
    .controller('printsDropdownController', ['$scope', 'ProductService', printsDropdownController]);

  function printsDropdownController($scope, ProductService) {

    let ctrl = this;

    ctrl.prints = [
      'loading options'
    ];

    ProductService.getProductByCategory("prints")
      .then((res) => {
        if (res) ctrl.prints = res
      })

    ctrl.setSelection = (option) => {
      ctrl.printsSelection = option;
    }

  };

})();
