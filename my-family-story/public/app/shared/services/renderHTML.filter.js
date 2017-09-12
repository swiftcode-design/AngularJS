(function() {

  angular
    .module('app')
    .filter('renderHTML', ['$sce', renderHTML]);

  function renderHTML($sce) {
      return function(string) {
        return $sce.trustAsHtml(string)
      }
    };

})();