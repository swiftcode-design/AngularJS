angular.module('app')
  .controller('orderController', function($scope, productsSvc){
    $scope.getUserProducts = function() {
      productsSvc.getUserProducts().then(function(res) {
        var products = res;
        var idArr = [];
        for(var x = 0; x < res.length; x ++){
          idArr.push(res[x].product_id);
        }
        productsSvc.getProducts(idArr).then(function(res) {
          var cartProducts = res.cartProducts;
          products.forEach(item1 => {
            cartProducts.forEach(item2 => {
              if(item1.product_id == item2.id){
                item1.name = item2.name;
                item1.price = item2.price * item1.qty;
                item1.color = item2.color;
                item1.img = item2.jsonb_agg;
                item1.qty = parseInt(item1.qty);
              }
            })
          })
          // console.log(products);
          $scope.totalPrice = 0;
          $scope.total = products.map(function(item){
            $scope.totalPrice += item.price;
          })

          $scope.products = products;
        })
      })
    }
    $scope.getUserProducts();
  })
