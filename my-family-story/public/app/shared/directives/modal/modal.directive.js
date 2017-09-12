(function () {
  angular
    .module('app')
    .directive('alertModalDirective', ['$uibModal' ,modalDirective]);

  function modalDirective($uibModal) {
    return {
      restrict: 'EA',
      template: '<a ng-click="open()">ALERT</a>',
      scope: {
        alertTitle: '@',
        alertBody: '@'
      },
      link: function(scope, elem, attrs){
        scope.open = function(){
          var modalInstance = $uibModal.open({
            animation: true,
            template: `<div class="modal-header">
                          <h3>${scope.alertTitle}</h3>
                        </div>
                        <div class="modal-body">
                          <p>${scope.alertBody}</p>
                        </div>
                        <div class="modal-footer">
                          <button class="btn btn-green" ng-click="ok()">OK</button>
                        </div>`,
            controller: 'modalController',
            size: 'sm'
          })
          modalInstance.result.then( function(res) {
            console.log(res)
          })
        }
      }
    }
  }
})();
