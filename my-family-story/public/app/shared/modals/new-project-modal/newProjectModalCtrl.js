(function(){
   angular
    .module('app')
    .controller('newProjectModalCtrl', ['$scope', 'modalService', '$uibModal', '$uibModalInstance', newProjectModalCtrl]);

    function newProjectModalCtrl($scope, modalService, $uibModal, $uibModalInstance){ 

      let modalCtrl = "alertModalCtrl",
          alertTitle = "Missing Project Title",
          alertBody = "Please provide a title before creating your new project.",
          cancelColor = "white",
          cancelText = "",
          confirmColor = "green",
          confirmText = "OK";

      $scope.createNewBook = () => {
        if(!$scope.newBookTitle){
          modalService.openAlertModal(modalCtrl, alertTitle, alertBody, cancelColor, cancelText, confirmColor, confirmText);
        } else {
          let book = {
            title: $scope.newBookTitle,
            title_img: $scope.titleImg
          }
          $uibModalInstance.close(book);
        }
      }

      $scope.close = () => {
        $uibModalInstance.close('close');
      };
    }
})();
