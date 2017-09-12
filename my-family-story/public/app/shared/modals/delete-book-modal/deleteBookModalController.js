(function(){
   angular
    .module('app')
    .controller('deleteBookModalCtrl', ['$scope', '$uibModalInstance', 'userBooks', 'index', deleteBookModalCtrl]);

    function deleteBookModalCtrl($scope, $uibModalInstance, userBooks, index){
      
      $scope.preTitle = userBooks[index].title;

      if($scope.preTitle === undefined){
        $scope.title = "untitled";
      } else {
        $scope.title = $scope.preTitle;
      }

      $scope.delete = () => {
        $uibModalInstance.close('delete');
      }

      $scope.cancel = () => {
        $uibModalInstance.close('cancel');
      }

    }
})();
