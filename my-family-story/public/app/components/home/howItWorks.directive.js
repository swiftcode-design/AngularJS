(function () {

  angular
    .module('app')
    .directive('howItWorks', howItWorks);

  function howItWorks() {

    return {
      restrict: 'E',
      scope: {
        imgUrl: "=",
        desc: "="
      },
      template: '<div><img ng-src="{{imgUrl}}"></div><br /><div class="divider"></div><br /><div ng-bind-html="desc | renderHTML"></div>',
      link: (scope, elem, attrs) => {
        $(window).scroll(function(){
          if($(this).scrollTop() > 250){
            $('#howItWorksSpan').addClass('homeScrollanime');
          }
          if($(this).scrollTop() > 500){
            // $('.howItWorks').fadeIn('4000');
            $('.how-it-works').addClass('homeScrollanime');
          }
          if($(this).scrollTop() > 700){
            // $('.howItWorks').fadeIn('4000');
            $('.homeBottomCon').addClass('homeScrollanime');
          }
        })
      }
    }
  };
})();
