(function() {

  angular
    .module('app')
    .controller('printsController', ['$scope', '$uibModal', printsController]);

  function printsController($scope, $uibModal, $log, $document) {

    
    $scope.test = 'test';
  };
})();
