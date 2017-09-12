(function () {

  angular
    .module('app')
    .directive('printsDropdown', printsDropdown);

  function printsDropdown() {

    return {
      restrict: 'E',
      scope: {
        printsSelection: '='
      },
      templateUrl: './app/shared/directives/prints-dropdown/prints-dropdown.html',
      controller: 'printsDropdownController',
      bindToController: true,
      controllerAs: 'ctrl',
      link: link
    };

    function link(scope, elem, attrs, ctrl) {

    }

  };
})();
