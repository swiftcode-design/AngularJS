(function () {
  angular
    .module('app')
    .directive('footerDirective', [footerDirective]);

  function footerDirective() {

    return {
      restrict: 'E',
      templateUrl: './app/shared/directives/footer/footer.html',
      link: link
    }

    function link(scope, elem, attr) {

    };

  };
})();
