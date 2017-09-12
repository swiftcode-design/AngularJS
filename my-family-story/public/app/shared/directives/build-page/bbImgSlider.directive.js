(function () {

  angular
    .module('app')
    .directive('bbImgSliderDir', bbImgSliderDir);

  function bbImgSliderDir() {

      return {
        restrict: 'A',
        link: (scope, elem, attrs) => {
          var transX = 0;
          var transXM = 0;
          var transTotal = scope.userBooks.length;
          var checker = 0;
          var checkerM = 0;
          var lengthSaver = scope.userBooks.length;
          // scope.$watch('userBooks.length', function(newValue, oldValue){
          //   else if(scope.deletedIndex > 1){
          //
          //     if(scope.userBooks.length < lengthSaver){
          //       console.log(transXM);
          //       transXM += 185;
          //       checkerM --;
          //       transTotal -= 1;
          //       console.log(transXM);
          //       $('.imgSliderAbs2').css("transform", "translateX(" + transXM + "px)");
          //     }
          //   }
          //   else if(scope.deletedIndex === 1){
          //     console.log('why');
          //     transXM = 0;
          //     checkerM = 0;
          //     transTotal -= 1;
          //     $('.imgSliderAbs2').css("transform", "translateX(" + transXM + "px)");
          //   }
          //     lengthSaver = scope.userBooks.length;
          // })

          scope.$watch('userBooks.length', function(newValue, oldValue){
            if(scope.deletedIndex > 2 && $('.imgSliderAbs').is(":visible")){
              if(scope.userBooks.length < lengthSaver){
                transX += 150;
                checker --;
                transTotal -= 1;
                $('.imgSliderAbs').css("transform", "translateX(" + transX + "px)");
              }
            }
             if(scope.deletedIndex <= 2 && $('.imgSliderAbs').is(":visible")){
              transX = 0;
              checker = 0;
              transTotal -= 1;
              $('.imgSliderAbs').css("transform", "translateX(" + transX + "px)");
            }
            if(scope.deletedIndex > 1){

              if(scope.userBooks.length < lengthSaver && $('.imgSliderAbs2').is(":visible")){
                transXM += 185;
                checkerM --;
                transTotal -= 1;
                $('.imgSliderAbs2').css("transform", "translateX(" + transXM + "px)");
              }
            }
            if(scope.deletedIndex <= 1 && $('.imgSliderAbs2').is(":visible")){
              transXM = 0;
              checkerM = 0;
              transTotal -= 1;
              $('.imgSliderAbs2').css("transform", "translateX(" + transXM + "px)");
            }
              lengthSaver = scope.userBooks.length;
          })
// window Resize========================================
          $(window).resize(function(){
            if($(window).width() <= 562){
              transX = 0;
              checker = 0;
              $('.imgSliderAbs2').css("transform", "translateX(" + transX + "px)");
            }
            if($(window).width() > 562){
              transX = 0;
              checker = 0;
              $('.imgSliderAbs').css("transform", "translateX(" + transX + "px)");
            }
          })
// ====mobile=======================================
        // scope.$watch('userBooks.length', function(newValue, oldValue){
        //   if(scope.deletedIndex > 1){
        //
        //     if(scope.userBooks.length < lengthSaver){
        //       console.log(transXM);
        //       transXM += 185;
        //       checkerM --;
        //       transTotal -= 1;
        //       console.log(transXM);
        //       $('.imgSliderAbs2').css("transform", "translateX(" + transXM + "px)");
        //     }
        //   }
        //   else if(scope.deletedIndex === 1){
        //     console.log('why');
        //     transXM = 0;
        //     checkerM = 0;
        //     transTotal -= 1;
        //     $('.imgSliderAbs2').css("transform", "translateX(" + transXM + "px)");
        //   }
        //     lengthSaver = scope.userBooks.length;
        // })


      $('#imgSliderTest12').on('click', function(){
        if(checkerM < transTotal - 1){
          checkerM ++;
          transXM -= 185;
          $('.imgSliderAbs2').css("transform", "translateX(" + transXM + "px)");
        }
      })
          $('#imgSliderTest22').on('click', function(){
            if(checkerM > 0){
              checkerM --;
              transXM += 185;
              $('.imgSliderAbs2').css("transform", "translateX(" + transXM + "px)");
            }
          })

// ====mobile====================

          $('#imgSliderTest1').on('click', function(){
            if(checker < transTotal - 3){
              checker ++;
              transX -= 150;
              $('.imgSliderAbs').css("transform", "translateX(" + transX + "px)");
            }
          })
          $('#imgSliderTest2').on('click', function(){
            if(checker > 0){
              checker --;
              transX += 150;
              $('.imgSliderAbs').css("transform", "translateX(" + transX + "px)");
            }
          })
        }
      };
    };
})();
// else if(scope.deletedIndex <= 2 && transX === 0){
//   if($('.imgSliderAbs').hasClass('imgSliderAnime')){
//     $('.imgSliderAbs').removeClass('imgSliderAnime');
//   }
//   transTotal -= 1;
//   $('.imgSliderAbs').addClass('imgSliderAnime');
// }
