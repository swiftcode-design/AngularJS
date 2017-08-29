angular.module('app')
  .controller('HomeController', function($scope, productsSvc, userSvc) {

    $scope.mainImgSlider = [
      "./assets/images/main/home-slider-slide-4.jpg",
      "./assets/images/main/home-slider-slide-5.jpg"
    ];


    productsSvc.getNew().then(function(res){
        $scope.newReleases = res;
        console.log(res);
    })
    // console.log(localStorage);
    // if(localStorage.length > 1)
    $scope.collectionImgs = [
      {name: "bruce lee",
      imgUrl: "./assets/images/main/collections_ad/home-widget-image-text-1 (1).jpg"
    },
    {
      name: "mike tyson",
      imgUrl: "./assets/images/main/collections_ad/home-widget-image-text-2.jpg"
    },
    {
      name: "muhammad ali",
      imgUrl: "./assets/images/main/collections_ad/home-widget-image-text-3.jpg"
    },
    {
      name: "baseball",
      imgUrl:  "./assets/images/main/collections_ad/home-widget-image-text-4.jpg"
    }]
  })
