(function () {
  angular
    .module('app')
    .directive('animateFade', [animateFade]);

  function animateFade(){
    return {
      restrict: 'A',
      scope: {
        condition: '=',
        text: '&'
      },
      link: function(scope, elem, attrs){
        // $(elem).on('click', function(){
        //   if(scope.condition === false){
        //     $(elem).switchClass("btn-yellow", "btn-green", 300, 'linear')
        //     scope.condition = true
        //   } else {
        //     $(elem).switchClass("btn-green", "btn-yellow", 300, 'linear')
        //     scope.condition = false
        //   }
        // })
      }
    }
  }
})()
