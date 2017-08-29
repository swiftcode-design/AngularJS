angular.module('app')
  .controller('CollectionsController', function($scope, productsSvc, $stateParams){
    $scope.collectionName = $stateParams.id;
    productsSvc.getProducts($stateParams.id).then(function(res){
      $scope.collectionProducts = res.byName;
    });

  })
