(function () {

  angular
    .module('app')
    .directive('bookbuilderDir', bookbuilderDir);

  function bookbuilderDir() {

      return {
        restrict: 'A',
        link: (scope, elem, attrs) => {

          $('.descrowtrigger').on('click', function(){
            $('.descrow').toggleClass('trigger');
            if($('#bookbuilderHideSpan').html() === 'Hide'){
              $('#bookbuilderHideSpan').html('Review');
            }else{
              $('#bookbuilderHideSpan').html('Hide');
            }
          })
          $('#bbPencil').on('click', function() {
            $('.upperInput').addClass('bb-title-input');
            $('.upperInput').select();
            $('.upper').addClass('bb-title-disappear');
            $('#bbPencil').addClass('bb-title-disappear');

          })
          $(document).keypress(function(e){
            if(e.which == 13) {
              $('.upperInput').removeClass('bb-title-input');
              $('.upper').removeClass('bb-title-disappear');
              $('#bbPencil').removeClass('bb-title-disappear');
            }
          })
          $('.upperInput').focusout(function(){
            $('.upperInput').removeClass('bb-title-input');
            $('.upper').removeClass('bb-title-disappear');
            $('#bbPencil').removeClass('bb-title-disappear');
          })
        }
      };
    };
})();
