(function () {

  angular
    .module('app')
    .controller('navController', ['AuthService', 'CartService', '$rootScope', '$state', navController]);

  function navController(AuthService, CartService, $rootScope, $state) {

    let ctrl = this;

    this.login = AuthService.login;
    this.logout = AuthService.logout;

    $rootScope.$on('user', (event, user) => {
      ctrl.user = user;
      checkCartNum();
    })

    $rootScope.$on('updateOrder', (event) => {
      checkCartNum();
    })

    let checkCartNum = () => {
      if (!ctrl.user) {
        ctrl.cartNum = 0;
      } else {
        CartService.getActiveOrder(ctrl.user._id)
          .then((res) => {
            if (res.books && res.books.length > 0) {
              ctrl.cartNum = res.books.length;
            } else {
              ctrl.cartNum = 0;
            }
          })
          .catch((err) => {
            throw err;
          })
      };
    };
  };
})();