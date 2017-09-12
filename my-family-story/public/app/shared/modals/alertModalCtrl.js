(function(){
   angular
    .module('app')
    .controller('alertModalCtrl', ['$scope', '$uibModalInstance', alertModalCtrl]);

    function alertModalCtrl($scope, $uibModalInstance){
      $scope.cancel = () => {
        $uibModalInstance.close('cancel')
      }
      $scope.confirm = () => {
        $uibModalInstance.close('confirm');
      };
    }
})();