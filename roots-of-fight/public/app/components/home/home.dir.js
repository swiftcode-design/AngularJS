angular.module('app')
  .directive('homeDir', function(){
    return {
      restrict: 'A',
      link: function(scope, elem, attr){

        function checkWidth() {
          var windowsize = $(window).width();
          var transX = 0;
          var checker = 0;
          if(windowsize > 768) {
            $('.home-product-slider-li').css('transform', 'translateX(0%)');

            $('.img-i-1').on('click', function() {
              $('.img-div-li').css('transform', 'translateX(-100%)');
            })
            $('.img-i-2').on('click', function() {
              $('.img-div-li').css('transform', 'translateX(0)');
            })
            $('#img-slider-control-2').on('click', function(){
              $('.home-product-slider-li').css('transform', 'translateX(-300%)');
            })
            $('#img-slider-control-1').on('click', function(){
              $('.home-product-slider-li').css('transform', 'translateX(0%)');
            })
          }
          if(windowsize <= 768){
            $('.home-product-slider-li').css('transform', 'translateX(0%)');
            transX = 0;
            checker = 0;
            $('#img-slider-control-2').on('click', function(){
              if(checker <= 4){
                transX += -100;
                checker += 1;
                $('.home-product-slider-li').css('transform', 'translateX(' + transX + '%)');
              }
            })
            $('#img-slider-control-1').on('click', function(){
              if(checker > 0){
                transX += 100;
                checker -= 1;
                $('.home-product-slider-li').css('transform', 'translateX(' + transX + '%)');
              }
            })
          }
        }

        checkWidth();

        $(window).resize(checkWidth);


        var transXm = 0;
        var checkerM = 0;
        $("#img-slider-control-2-mobile").on("click", function(){
          if(checkerM < 7){
            checkerM ++;
            transXm -= 100;
          $(".home-product-slider-li-mobile").css("transform", `translateX(${transXm}%)`);
        }
        })
        $("#img-slider-control-1-mobile").on("click", function(){
          if(checkerM > 0){
            checkerM --;
            transXm += 100;
          $(".home-product-slider-li-mobile").css("transform", `translateX(${transXm}%)`);
        }
        })



      }
    }
  })
