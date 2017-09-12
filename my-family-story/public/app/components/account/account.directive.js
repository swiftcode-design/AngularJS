(function () {

  angular
    .module('app')
    .directive('accountDir', accountDir);

  function accountDir() {

    return {
      restrict: 'A',
      link: (scope, elem, attrs) => {
        // var length = $(elem).attr('placeholder').split('.')[1].split('');
        // length.splice(-2)
        // var keyName = length.join('');
        // $(elem).css('width', scope.user[keyName].length * 8 + 20 + 'px');
        $('.accountInfoBtn').on('click', function(){
          $('#accountSavedAlert').addClass('alertSave');
          setTimeout(function(){
            $('#accountSavedAlert').removeClass('alertSave');
          }, 1500)
        })
        $('.accountInfoBtn2').on('click', function(){
          $('#accountSavedAlert2').addClass('alertSave');
          setTimeout(function(){
            $('#accountSavedAlert2').removeClass('alertSave');
          }, 1500)
        })
      }
    }
  };
})();
