(function(){
   angular
    .module('app')
    .controller('reviewModalCtrl', ['$scope', 'modalService', '$uibModal', '$uibModalInstance', reviewModalCtrl]);

    function reviewModalCtrl($scope, modalService, $uibModal, $uibModalInstance){ 
      $scope.close = () => {
        $uibModalInstance.close('close');
      };
    }
})();
