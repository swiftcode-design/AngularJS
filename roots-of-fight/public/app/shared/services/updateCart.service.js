angular.module('app')
  .service('cartSvc', function($http) {
    // var token = JSON.parse(localStorage.getItem('tokenObj')).token;


    this.updateCartQty = function(qty, orderId){
      var token = JSON.parse(localStorage.getItem('tokenObj')).token;
      return $http({
        method: "PUT",
        url: '/api/orders',
        data: {
          qty: qty,
          orderId: orderId,
        },
        headers: {
          "token": token
        }
      }).then(function(res){
        return res;
      })
    };

    this.deleteOrder = function(orderId){
      var token = JSON.parse(localStorage.getItem('tokenObj')).token;
      return $http({
        method: "DELETE",
        url: `/api/orders/${orderId}`,
        headers: {
          "token": token
        }
      }).then(function(res){
        return res;
      })
    }
  });
