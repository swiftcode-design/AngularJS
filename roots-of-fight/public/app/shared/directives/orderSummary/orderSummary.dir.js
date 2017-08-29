angular.module('app')
  .directive('orderDir', function() {
    return {
      restrict: '',
      templateUrl: './app/shared/directives/orderSummary/orderSummary.html',
      controller: 'orderController',
      link: function(scope, elem, attr){

      }
    }
  })
