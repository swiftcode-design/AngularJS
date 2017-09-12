(function () {

  angular
    .module('app')
    .controller('adminArchiveController', ['$scope', 'AdminService', adminArchiveController]);

  function adminArchiveController($scope, AdminService) {

    getAllArchivedOrders();

    function getAllArchivedOrders() {
      AdminService.getAllArchivedOrders()
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
