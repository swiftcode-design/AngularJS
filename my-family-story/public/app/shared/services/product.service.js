(function () {

  angular
    .module('app')
    .service('ProductService', ['$http', ProductService]);

  function ProductService($http) {

    this.getProductByName = (name) => {
      return $http({
        method: 'GET',
        url: `/api/product?name=${name}`
      })
        .then((response) => {
          return response.data[0];
        })
        .catch((error) => {
          console.log(error);
          throw error;
        })
    };

    this.getProductByCategory = (category) => {
      return $http({
        method: 'GET',
        url: `/api/product?category=${category}`
      })
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.log(error);
          throw error;
        })
    };

    this.getAllProducts = () => {
      return $http({
        method: 'GET',
        url: `/api/product`
      })
        .then((response) => {
          return response.data
        })
        .catch((error) => {
          console.log(error);
          throw error;
        })
    };

    this.updateProduct = (product) => {
      let _id = product._id
      return $http({
        method: 'PUT',
        url: `/api/product/${_id}`,
        data: JSON.stringify(product)
      })
        .then((response) => {
          return response.data
        })
        .catch((error) => {
          throw error;
        });

    };

  };
})();
