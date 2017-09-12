(function () {

  angular
    .module('app')
    .directive('parallax', parallax);
  
  function parallax() {

      return {
        restrict: 'C',
        link: (scope, elem, attrs) => {

          $(window).scroll(() => {
            let winScroll = $(window).scrollTop();
            $(elem)
              .css('transform', `translateY(-${winScroll / 6}%)`);

          })
        }
      };
    };
})();

