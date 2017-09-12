(function () {

  angular
    .module('app')
    .directive('orderDetailsBookPage', [orderDetailsBookPage]);

  function orderDetailsBookPage() {

    return {
      restrict: 'A',
      templateUrl: './app/components/admin/order-details/order-details-book-directive/order-details-book-page-directive/order-details-book-page.html',
      scope: true,
      link: link
    }

    function link(scope, elem, attrs) {

      let page = scope.page

    }

  };
})();