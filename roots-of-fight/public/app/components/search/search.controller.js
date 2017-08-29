angular.module("app")
  .controller("searchCtrl", function($scope, $stateParams, productsSvc){
    console.log($stateParams.search);
    var search = $stateParams.search;

    productsSvc.getProducts(search).then(function(res){
      $scope.searchProducts = res.byName;
      console.log($scope.searchProducts);
    })

  })
