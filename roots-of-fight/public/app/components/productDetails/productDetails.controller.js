angular.module('app')
  .controller('ProductDetailsController', function($scope, productsSvc, $stateParams, $state){
    $scope.productCollection = $stateParams.id;
    $scope.productName = $stateParams.name;
    $scope.sizeUl = [{size: "Small"},{size: "Medium"},{size: "large"},{size: "X-Large"},{size: "XX-Large"},{size: "XXX-Large"}];

    productsSvc.getProducts($scope.productName).then(function(res){
      $scope.product = res.productDetails;
      $scope.mainImg = res.productDetails[0].jsonb_agg[0];
    });
    $scope.test = function(img){
      $scope.mainImg = img;
    }

    $scope.addToCart = function(product, pSize, qty){
      if(localStorage.length >= 1){
        var orderDetails = {
          id: product,
          size: pSize.size,
          qty: qty
        };
        productsSvc.addToOrders(orderDetails).then(function(res){
          $state.reload();
        });
      } else {
        $state.go("accountLogin");
      }

    }
  })
