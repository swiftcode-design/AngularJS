(function () {
  angular
    .module('app')
    .controller('paymentModalController', ['$scope', 'stripe', '$http', '$state', '$uibModalInstance', 'cartTotal', 'orderId', 'CartService', 'StripeService', paymentModalController]);

  function paymentModalController($scope, stripe, $http, $state, $uibModalInstance, cartTotal, orderId, CartService, StripeService) {

    $scope.cartTotal = cartTotal;

    const unique_order_id = orderId;

    $scope.putShipAddress = function (orderId) {
      CartService.putShipAddress(unique_order_id, $scope.ship_info)
    }

    $scope.charge = function (orderId) {
      return stripe.card.createToken($scope.payment.card)
        .then(function (response) {
          var payment = angular.copy($scope.payment);
          payment.card = void 0;
          payment.token = response.id;

          return $http({
            method: 'POST',
            url: '/api/payment',
            data: {
              amount: $scope.cartTotal * 100,
              payment: payment,
              orderId: unique_order_id
            }
          })
        })
        .then(function (payment) {
          $uibModalInstance.close('cancel');
          $state.go('thanks');
        })
        .catch(function (err) {
          if (err.type && /^Stripe/.test(err.type)) {
            console.log('Stripe error: ', err.message);
            alert(err.message)
          } else {
            console.log('Other error occurred, possibly with your API', err.message);
            alert(err.message)
          }
        });
    };

    $scope.cancel = function () {
      $uibModalInstance.close('cancel');
    }

    $scope.validateNumber = function (value) {
      if (value) {
        if ($scope.payment.card.number.validateCardNumber(value)) {
          $scope.numberError = false;
          $scope.cardInfoForm.number.$setValidity("number", true);
          $scope.cardType = Stripe.card.cardType(value);
        } else {
          $scope.numberError = true;
          $scope.cardInfoForm.number.$setValidity("number", false);
        }
      }
    }
    $scope.validateExpiry = function (month, year) {
      if (month && year) {
        let exp = month + ' ' + year;
        if (Stripe.card.validateExpiry(exp)) {
          $scope.expiryError = false;
          $scope.cardInfoForm.month.$setValidity("month", true);
        } else {
          $scope.expiryError = true;
          $scope.cardInfoForm.month.$setValidity("month", false);
        }
      }
    }
    $scope.validateCVC = function (value) {
      if (value) {
        if (Stripe.card.validateCVC(value)) {
          $scope.cvcError = false;
          $scope.cardInfoForm.cvc.$setValidity("cvc", true);
        } else {
          $scope.cvcError = true;
          $scope.cardInfoForm.cvc.$setValidity("cvc", false);
        }
      }
    }
  }

})();
