(function () {

  angular
    .module('app')
    .service('S3Service', ['$http', '$q', S3Service])

  function S3Service($http, $q) {

    this.uploadPhoto = function (photo) {
    
      photo = angular.toJson(photo);

      return $http.post('/api/upload-photos', photo)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
    };

  };
})();