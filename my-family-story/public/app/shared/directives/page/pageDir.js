(function () {

  angular
    .module('app')
    .directive('bookPage', bookPage);

  function bookPage() {
    return {
      restrict: 'E',
      scope: {
        page: '=',
        index: '='
      },
      templateUrl: './app/shared/directives/page/pageTmpl.html',
      controller: 'pageDirCtrl',
      link: (scope, elem, attrs) => {


        scope.$watch('wasPageDeleted' ,function(newValue, oldValue){
          if(newValue){
            if($('.con' + scope.index).hasClass('pageinitial')){
              $('.con' + scope.index).removeClass('pageinitial');
            }
            $('.con' + scope.index).addClass('page-anime');
            setTimeout(function(){
              $('.con' + scope.index).removeClass('page-anime');
            }, 550);
          }
        })
      }
    }
  };
})();
