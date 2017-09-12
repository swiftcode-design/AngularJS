(function () {
  angular
    .module('app')
    .directive('bgImg', bgImg);

  function bgImg() {
    return {
      link: (scope, elem, attr) => {
         var url = attr.bgImg;
         elem.css({
            'background-image': `url(${url})`,
            'background-size': 'cover'
         })
      }
    }
  };
})();