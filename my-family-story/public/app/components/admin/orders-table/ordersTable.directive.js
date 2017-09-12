(function() {
  angular
    .module('app')
    .directive('ordersTable', ordersTable);

  function ordersTable() {

    return {
      restrict: 'A',
      scope: {
        allOrders: '=',
        toggleSwitch: '@',
        filterPredicate: '=',
        orderPredicate: '='
      },
      templateUrl: './app/components/admin/orders-table/orders-table.html',
      controller: 'ordersTableController',
      bindToController: true,
      controllerAs: 'ctrl',
      link: link
    };

    function link(scope, elem, attrs, ctrl) {
      
    };
  };
})();