(function() {

  angular
    .module('app')
    .controller('modalController', ['$scope', '$uibModalInstance', modalController]);

  function modalController($scope, $uibModalInstance, $log, $document) {
    $scope.ok = () => {
        $uibModalInstance.close('ok');
      }
  };
})();
