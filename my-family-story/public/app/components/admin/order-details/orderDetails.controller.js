(function () {

  angular
    .module("app")
    .controller("orderDetailsController", ["$scope", "$stateParams", "AdminService", orderDetailsController]);

  function orderDetailsController($scope, $stateParams, AdminService) {

    getOneOrderById($stateParams.id);
    $scope.abbreviatedId = abbreviateId($stateParams.id)

    function getOneOrderById(orderId) {
      AdminService.getOneOrderById(orderId)
        .then((res) => {
          $scope.order = res;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    function abbreviateId(orderId) {
      return orderId.slice(0, 6)
    };

  };
})();
