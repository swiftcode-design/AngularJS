(function () {

  angular
    .module('app')
    .directive('s3Uploader', s3Uploader);

  function s3Uploader() {

    return {
      restrict: 'E',
      scope: {
        s3Url: "=",
        repeatId: "="
      },
      templateUrl: './app/shared/directives/s3-uploader/s3-uploader.html',
      controller: 's3Controller',
      bindToController: true,
      controllerAs: 'ctrl',
      link: (scope, elem, attrs, ctrl) => {

        let maxWidth = +(attrs.maxWidth)
          , maxHeight = +(attrs.maxHeight);
        
        ctrl.inputText = attrs.defaultText;
        ctrl.successText = attrs.successText;
 
        let input = angular.element(elem[0].querySelector('[s3-input]'));

        input.on('change', (onChangeEvent) => {
          
          let reader = new FileReader();
          reader.onload = (onLoadEvent) => {

            let imageData = onLoadEvent.target.result;
            let imageExtension = imageData.split(';')[0].split('/')

            imageExtension = imageExtension[imageExtension.length - 1];

            ctrl.resizer(onChangeEvent.target.files[0], imageExtension, maxWidth, maxHeight);
          };
          reader.readAsDataURL(onChangeEvent.target.files[0]);
        }
        );
      }
    };
  };

})();