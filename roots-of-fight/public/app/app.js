angular.module('app', ['ui.router', 'ngAnimate'])
  .config(function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise('/home');
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: './app/components/home/home.html',
        controller: 'HomeController',
      })
      .state('shopCollection', {
        url: '/collections/:id',
        templateUrl: './app/components/collections/collections.html',
        controller: 'CollectionsController'
      })
      .state('productDetails', {
        url: '/collection/:id/:name',
        templateUrl: './app/components/productDetails/productDetails.html',
        controller: 'ProductDetailsController'
      })
      .state('createAccount', {
        url: '/account/register',
        templateUrl: './app/components/createAccount/createAccount.html',
        controller: 'CreateAccountController'
      })
      .state('account', {
        url: '/account',
        templateUrl: './app/components/account/account.html',
        controller: 'AccountController'

      })
      .state('accountLogin', {
        url: '/account/login',
        templateUrl: './app/components/accountLogin/accountLogin.html',
        controller: 'LoginController'
      })
      .state('cart', {
        url: '/cart',
        templateUrl: './app/components/cart/cart.html',
        controller: 'CartController'
      })
    .state('address', {
      url: '/checkout/information',
      templateUrl: './app/components/address/address.html',
      controller: 'addressCtrl'
    })
    .state('payment', {
      url: '/checkout/payment',
      templateUrl: './app/components/payment/payment.html',
      controller: 'paymentCtrl'
    })
    .state("search", {
      url: '/search?search',
      templateUrl: "./app/components/search/search.html",
      controller: "searchCtrl"
    })

  });
