(function () {

  angular
    .module('app')
    .directive('orderDetailsBook', [orderDetailsBook]);

  function orderDetailsBook() {

    return {
      restrict: 'A',
      templateUrl: './app/components/admin/order-details/order-details-book-directive/order-details-book.html',
      scope: true,
      link: link
    };

    function link(scope, elem, attrs) {

      scope.bookNumber = +attrs.bookNumber;

    }

  };
})();