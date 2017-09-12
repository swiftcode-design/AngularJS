(function () {

  angular
    .module('app')
    .service('StripeService', ['$http', 'stripe', StripeService]);

   function StripeService($http, stripe) {
  //
  //   this.makePayment = function(card, payment) {
  //     return stripe.card.createToken(card)
  //     .then(function (response) {
  //       console.log('token created for card ending in ', response.card.last4);
  //       var payment = angular.copy(payment);
  //       payment.card = void 0;
  //       payment.token = response.id;
  //
  //       return $http({
  //         method: 'POST',
  //         url: '/api/payment',
  //         data: {
  //           amount: $scope.cartTotal * 100,
  //           payment: payment
  //         }
  //       })
  //     })
  //   }


};
})();

// angular.module('app')
//     .service('StripeService', function($http) {
//         this.chargeCard = function(source, amount, email) {
//                 let obj = {
//                     stripeSource: source,
//                     amount: amount,
//                     email: email
//                 }
//                 return $http.post('/rent-charge-card', obj);
//             }
//     });
