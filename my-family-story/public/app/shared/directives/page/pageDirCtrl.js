(function(){
  angular
    .module('app')
    .controller('pageDirCtrl', ['$scope', '$uibModal', '$timeout', 'modalService', pageDirCtrl]);

    function pageDirCtrl($scope, $uibModal, $timeout, modalService){

      $scope.page_type = "Basic";
      $scope.activity_type = "Crossword";
      $scope.custom_activity = "";
      $scope.edit_allowed = false;
      $scope.wasPageDeleted = false;


      $scope.pageTypes = [
        {name: "Basic", value: "Basic"},
        {name: "Activity", value: "Activity"},
        {name: "Portrait", value: "Portrait"}
      ]

      $scope.activity_types = [
        {name: "Crossword", value: "Crossword"},
        {name: "Connect the Dots", value: "Connect the Dots"},
        {name: "Maze", value: "Maze"}
      ]

      $scope.allowTypes = [
        {name: "No", value: false},
        {name: "Yes", value: true}
      ]

      let modalCtrl = "alertModalCtrl",
          alertTitle = "Delete this Page?",
          alertBody = "Do you really want to delete this page? This action cannot be undone.",
          cancelColor = "yellow",
          cancelText = "CANCEL",
          confirmColor = "red",
          confirmText = "DELETE";

      $scope.openAlertModal = () => {
        let modalInstance = modalService.openAlertModal(modalCtrl, alertTitle, alertBody, cancelColor, cancelText, confirmColor, confirmText);

        modalInstance.result.then((param) => {
          if(param == 'confirm'){
            $scope.wasPageDeleted = true;
            $timeout(function(){
              $scope.$parent.$parent.removePage($scope.index);
              $scope.wasPageDeleted = false;
            }, 200);
          }
        })
      }
    }
})();
