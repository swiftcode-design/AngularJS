(function () {

  angular
    .module('app')
    .controller('adminOrdersController', ["$scope", "AdminService", adminOrdersController]);

  function adminOrdersController($scope, AdminService) {

    getAllActiveOrders();

    function getAllActiveOrders() {
      AdminService.getAllActiveOrders()
        .then((res) => {
          if (!Array.isArray(res)) {
            $scope.allOrders = [];
            return;
          } else {
            $scope.allOrders = res;
          };
        })
        .catch((err) => {
          console.log(err);
        });
    };

  };
})();
