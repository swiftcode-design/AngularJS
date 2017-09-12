(function () {
  angular
    .module('app')
    .controller('printsModalCtrl', ['$scope', '$http', 'bookService', 'CartService', '$uibModal', '$uibModalInstance', 'modalService', printsModalCtrl]);

  function printsModalCtrl($scope, $http, bookService, CartService, $uibModal, $uibModalInstance, modalService) {

    let modalCtrl = "alertModalCtrl",
      alertTitle = "Prints Not Specified",
      alertBody = "Please select a print quantity before sending the project to the cart.",
      cancelColor = "white",
      cancelText = "",
      confirmColor = "green",
      confirmText = "OK";

    $scope.sendToCart = function () {
      let defaultPrints = {
        _id: "58dc1f62162e4201e1aa2d98",
        name: "PDF",
        description: "free digital copy",
        price: 0,
        category: "prints",
        image1: ""
      }
      if ($scope.printBool) {
        $uibModalInstance.close(defaultPrints);
      } else if (!$scope.printBool && !$scope.selectedPrints) {
        modalService.openAlertModal(modalCtrl, alertTitle, alertBody, cancelColor, cancelText, confirmColor, confirmText);
      } else if (!$scope.printBool && $scope.selectedPrints) {
        $uibModalInstance.close($scope.selectedPrints)
      } else {
        modalService.openAlertModal(modalCtrl, alertTitle, alertBody, cancelColor, cancelText, confirmColor, confirmText);
      }

    };

    $scope.cancel = function () {
      $uibModalInstance.close('cancel');
    }
  }
})();