angular.module('app')
  .directive('creditCardModal', function() {
    return {
        restrict: 'E',
        templateUrl: './js/directives/credit-card-modal/credit-card-modal.html',
        scope: {
            model: '=',
            payRent: '&',
            chargeAmount: '='
        },
        link: function(scope, elem, attrs) {

        }
    };
});
