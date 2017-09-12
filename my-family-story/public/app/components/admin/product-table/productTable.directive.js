(function() {
  angular
    .module('app')
    .directive('productTable', productTable);

  function productTable() {

    return {
      restrict: 'A',
      scope: {
        allProducts: '=',
        productType: '@'
      },
      templateUrl: './app/components/admin/product-table/product-table.html',
      controller: 'productTableController',
      bindToController: true,
      controllerAs: 'ctrl',
      link: link
    };

    function link(scope, elem, attrs, ctrl) {

    };

  };
})();