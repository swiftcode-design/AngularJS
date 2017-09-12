(function() {

  angular
    .module('app')
    .controller('homeController', ['$scope', homeController]);

  function homeController($scope) {

    $scope.howItWorks = [
      {
        imgUrl: '../../../assets/images/HIW1.png',
        desc: 'Customize your coloring book and tell your family\'s story. Select the number and type of pages and submit your text.<br /><a class="underline-link about-link" href="/#!/start"><em>Learn more</em></a>'
      },
      {
        imgUrl: '../../../assets/images/HIW2.png',
        desc: 'We\'ll draw the perfect pictures to correspond with your text and preferences for each page.<br /><a class="underline-link about-link" href="/#!/start"><em>Learn more</em></a>'
      },
      {
        imgUrl: '../../../assets/images/HIW3.png',
        desc: 'You\'ll receive your custom coloring book as a digital file, or choose to have it printed and delivered to your door.<br /><a class="underline-link about-link" href="/#!/start"><em>Learn more</em></a>'
      }
    ];

  };
})();
