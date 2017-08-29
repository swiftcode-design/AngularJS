'use strict';

angular.module('app', ['ui.router', 'ngAnimate']).config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/home');
  $stateProvider.state('home', {
    url: '/home',
    templateUrl: './app/components/home/home.html',
    controller: 'HomeController'
  }).state('shopCollection', {
    url: '/collections/:id',
    templateUrl: './app/components/collections/collections.html',
    controller: 'CollectionsController'
  }).state('productDetails', {
    url: '/collection/:id/:name',
    templateUrl: './app/components/productDetails/productDetails.html',
    controller: 'ProductDetailsController'
  }).state('createAccount', {
    url: '/account/register',
    templateUrl: './app/components/createAccount/createAccount.html',
    controller: 'CreateAccountController'
  }).state('account', {
    url: '/account',
    templateUrl: './app/components/account/account.html',
    controller: 'AccountController'

  }).state('accountLogin', {
    url: '/account/login',
    templateUrl: './app/components/accountLogin/accountLogin.html',
    controller: 'LoginController'
  }).state('cart', {
    url: '/cart',
    templateUrl: './app/components/cart/cart.html',
    controller: 'CartController'
  }).state('address', {
    url: '/checkout/information',
    templateUrl: './app/components/address/address.html',
    controller: 'addressCtrl'
  }).state('payment', {
    url: '/checkout/payment',
    templateUrl: './app/components/payment/payment.html',
    controller: 'paymentCtrl'
  }).state("search", {
    url: '/search?search',
    templateUrl: "./app/components/search/search.html",
    controller: "searchCtrl"
  });
});
'use strict';

angular.module('app').controller('AccountController', function ($scope, $state, userSvc) {

  userSvc.getEmail().then(function (res) {
    $scope.email = res;
  });

  $scope.logOut = function () {
    localStorage.removeItem('tokenObj');
    $state.go('home');
  };
});
'use strict';

angular.module('app').controller('LoginController', function ($scope, userSvc, $state, $timeout) {
  $scope.test = 'test';
  $scope.user = {
    email: "testuser@gmail.com",
    password: '123456'
  };
  $scope.login = function (user) {
    userSvc.login(user).then(function (res) {
      if (res === true) {
        $state.go('home');
      } else {
        alert("Invalid password or email");
      }
    });
  };
});
'use strict';

angular.module('app').directive("accountLogin", function () {
  return {
    restrict: 'A',
    link: function link(scope, elem, attr) {}
  };
});
'use strict';

angular.module('app').controller('addressCtrl', function ($scope, addressSvc, $state) {

  $scope.postAddress = function (address) {
    addressSvc.postAddress(address).then(function (res) {
      if (res.data === true) {
        $state.go('payment');
      }
    });
  };
  $scope.stateArr = ["AK - Alaska", "AL - Alabama", "AR - Arkansas", "AS - American Samoa", "AZ - Arizona", "CA - California", "CO - Colorado", "CT - Connecticut", "DC - District of Columbia", "DE - Delaware", "FL - Florida", "GA - Georgia", "GU - Guam", "HI - Hawaii", "IA - Iowa", "ID - Idaho", "IL - Illinois", "IN - Indiana", "KS - Kansas", "KY - Kentucky", "LA - Louisiana", "MA - Massachusetts", "MD - Maryland", "ME - Maine", "MI - Michigan", "MN - Minnesota", "MO - Missouri", "MS - Mississippi", "MT - Montana", "NC - North Carolina", "ND - North Dakota", "NE - Nebraska", "NH - New Hampshire", "NJ - New Jersey", "NM - New Mexico", "NV - Nevada", "NY - New York", "OH - Ohio", "OK - Oklahoma", "OR - Oregon", "PA - Pennsylvania", "PR - Puerto Rico", "RI - Rhode Island", "SC - South Carolina", "SD - South Dakota", "TN - Tennessee", "TX - Texas", "UT - Utah", "VA - Virginia", "VI - Virgin Islands", "VT - Vermont", "WA - Washington", "WI - Wisconsin", "WV - West Virginia", "WY - Wyoming"];
});
'use strict';

angular.module('app').controller('CartController', function ($scope, productsSvc, cartSvc, $state) {

  $scope.getUserProducts = function () {
    productsSvc.getUserProducts().then(function (res) {
      var products = res;
      var idArr = [];
      for (var x = 0; x < res.length; x++) {
        idArr.push(res[x].product_id);
      }
      productsSvc.getProducts(idArr).then(function (res) {
        var cartProducts = res.cartProducts;

        products.forEach(function (item1) {
          cartProducts.forEach(function (item2) {
            if (item1.product_id == item2.id) {
              item1.name = item2.name;
              item1.price = item2.price * item1.qty;
              item1.color = item2.color;
              item1.img = item2.jsonb_agg;
              item1.qty = parseInt(item1.qty);
            }
          });
        });
        $scope.totalPrice = 0;
        $scope.total = products.map(function (item) {
          $scope.totalPrice += item.price;
        });
        $scope.products = products;
      });
    });
  };
  $scope.getUserProducts();
  $scope.updateQty = function (qty, orderId) {
    cartSvc.updateCartQty(qty, orderId).then(function (res) {});
  };

  $scope.Delete = function (orderId) {
    cartSvc.deleteOrder(orderId).then(function (res) {
      $state.reload();
    });
  };
  $scope.updatedCart = function () {
    $state.reload();
  };

  $scope.checkOut = function (p) {
    // console.log(p);
  };
});
'use strict';

angular.module('app').controller('CollectionsController', function ($scope, productsSvc, $stateParams) {
  $scope.collectionName = $stateParams.id;
  productsSvc.getProducts($stateParams.id).then(function (res) {
    $scope.collectionProducts = res.byName;
  });
});
'use strict';

angular.module('app').controller('CreateAccountController', function ($scope, userSvc, $state) {
  $scope.createUser = function (user) {
    userSvc.createUser(user).then(function (res) {
      if (res.data === '') {
        alert('email is already tied to an account');
      } else {
        $state.go('home');
      }
    });
  };
});
'use strict';

angular.module('app').controller('HomeController', function ($scope, productsSvc, userSvc) {

  $scope.mainImgSlider = ["./assets/images/main/home-slider-slide-4.jpg", "./assets/images/main/home-slider-slide-5.jpg"];

  productsSvc.getNew().then(function (res) {
    $scope.newReleases = res;
    console.log(res);
  });
  // console.log(localStorage);
  // if(localStorage.length > 1)
  $scope.collectionImgs = [{ name: "bruce lee",
    imgUrl: "./assets/images/main/collections_ad/home-widget-image-text-1 (1).jpg"
  }, {
    name: "mike tyson",
    imgUrl: "./assets/images/main/collections_ad/home-widget-image-text-2.jpg"
  }, {
    name: "muhammad ali",
    imgUrl: "./assets/images/main/collections_ad/home-widget-image-text-3.jpg"
  }, {
    name: "baseball",
    imgUrl: "./assets/images/main/collections_ad/home-widget-image-text-4.jpg"
  }];
});
'use strict';

angular.module('app').directive('homeDir', function () {
  return {
    restrict: 'A',
    link: function link(scope, elem, attr) {

      function checkWidth() {
        var windowsize = $(window).width();
        var transX = 0;
        var checker = 0;
        if (windowsize > 768) {
          $('.home-product-slider-li').css('transform', 'translateX(0%)');

          $('.img-i-1').on('click', function () {
            $('.img-div-li').css('transform', 'translateX(-100%)');
          });
          $('.img-i-2').on('click', function () {
            $('.img-div-li').css('transform', 'translateX(0)');
          });
          $('#img-slider-control-2').on('click', function () {
            $('.home-product-slider-li').css('transform', 'translateX(-300%)');
          });
          $('#img-slider-control-1').on('click', function () {
            $('.home-product-slider-li').css('transform', 'translateX(0%)');
          });
        }
        if (windowsize <= 768) {
          $('.home-product-slider-li').css('transform', 'translateX(0%)');
          transX = 0;
          checker = 0;
          $('#img-slider-control-2').on('click', function () {
            if (checker <= 4) {
              transX += -100;
              checker += 1;
              $('.home-product-slider-li').css('transform', 'translateX(' + transX + '%)');
            }
          });
          $('#img-slider-control-1').on('click', function () {
            if (checker > 0) {
              transX += 100;
              checker -= 1;
              $('.home-product-slider-li').css('transform', 'translateX(' + transX + '%)');
            }
          });
        }
      }

      checkWidth();

      $(window).resize(checkWidth);

      var transXm = 0;
      var checkerM = 0;
      $("#img-slider-control-2-mobile").on("click", function () {
        if (checkerM < 7) {
          checkerM++;
          transXm -= 100;
          $(".home-product-slider-li-mobile").css("transform", 'translateX(' + transXm + '%)');
        }
      });
      $("#img-slider-control-1-mobile").on("click", function () {
        if (checkerM > 0) {
          checkerM--;
          transXm += 100;
          $(".home-product-slider-li-mobile").css("transform", 'translateX(' + transXm + '%)');
        }
      });
    }
  };
});
'use strict';

angular.module('app').controller('paymentCtrl', function ($scope, userSvc, productsSvc, $state) {
  $scope.credit = {
    cardNum: 4242424242424242,
    name: "TestName",
    mm: "11/19",
    cvv: 333
  };
  userSvc.getAdderess().then(function (res) {
    $scope.state = res.state.slice(4);
    $scope.address = res.street + ' ' + res.city + $scope.state;
  });

  $scope.postOrder = function (credit) {
    productsSvc.completeOrder(credit).then(function (res) {
      $state.go("home");
    });
  };
});
'use strict';

angular.module('app').controller('ProductDetailsController', function ($scope, productsSvc, $stateParams, $state) {
  $scope.productCollection = $stateParams.id;
  $scope.productName = $stateParams.name;
  $scope.sizeUl = [{ size: "Small" }, { size: "Medium" }, { size: "large" }, { size: "X-Large" }, { size: "XX-Large" }, { size: "XXX-Large" }];

  productsSvc.getProducts($scope.productName).then(function (res) {
    $scope.product = res.productDetails;
    $scope.mainImg = res.productDetails[0].jsonb_agg[0];
  });
  $scope.test = function (img) {
    $scope.mainImg = img;
  };

  $scope.addToCart = function (product, pSize, qty) {
    if (localStorage.length >= 1) {
      var orderDetails = {
        id: product,
        size: pSize.size,
        qty: qty
      };
      productsSvc.addToOrders(orderDetails).then(function (res) {
        $state.reload();
      });
    } else {
      $state.go("accountLogin");
    }
  };
});
"use strict";

angular.module("app").controller("searchCtrl", function ($scope, $stateParams, productsSvc) {
  console.log($stateParams.search);
  var search = $stateParams.search;

  productsSvc.getProducts(search).then(function (res) {
    $scope.searchProducts = res.byName;
    console.log($scope.searchProducts);
  });
});
'use strict';

angular.module('app').service('addressSvc', function ($http) {

  this.postAddress = function (address) {
    var token = JSON.parse(localStorage.getItem('tokenObj')).token;

    return $http({
      method: "POST",
      url: "/api/address",
      data: {
        address: address
      },
      headers: {
        "token": token
      }
    });
  };
});
'use strict';

angular.module('app').service('productsSvc', function ($http) {
  this.cartLength = function () {
    var token = JSON.parse(localStorage.getItem('tokenObj')).token;

    return $http({
      method: "GET",
      url: "/api/cart",
      headers: {
        "token": token
      }
    }).then(function (res) {
      var products = res.data;
      products = products.filter(function (product) {
        if (product.completed_date === null) {
          return product;
        }
      });
      var amount = products.length;
      return amount;
    });
  };

  this.getProducts = function (param) {
    return $http({
      method: "Get",
      url: "/api/products"
    }).then(function (res) {
      var productObj = res.data;
      var newReleases = productObj.filter(function (obj) {
        return obj.collections.includes('new') ? obj.collections : null;
      });
      var byName = productObj.filter(function (obj) {
        return obj.collections.includes(param) ? obj.collections : obj.type.includes(param) ? obj.type : null;
      });
      var productDetails = productObj.filter(function (obj) {
        return obj.name.includes(param) ? obj.name : null;
      });

      var cartProducts = param;

      if (localStorage.getItem("tokenObj") != null) {
        cartProducts = productObj.filter(function (obj) {
          return cartProducts.includes(obj.id);
        });
      }

      var resObj = {
        newReleases: newReleases,
        byName: byName,
        productDetails: productDetails,
        cartProducts: cartProducts
      };
      return resObj;
    });
  };
  this.getNew = function () {
    return $http({
      method: "Get",
      url: "/api/products"
    }).then(function (res) {
      var productObj = res.data;

      var newReleases = productObj.filter(function (obj) {
        return obj.collections.includes('new') ? obj.collections : null;
      });

      return newReleases;
    });
  };
  this.addToOrders = function (orderDetails) {
    var token = localStorage.getItem('tokenObj');
    return $http({
      method: "POST",
      url: "/api/products",
      data: {
        orderDetails: orderDetails,
        token: token
      }
    }).then(function (res) {
      return res;
    });
  };

  this.getUserProducts = function () {
    var token = JSON.parse(localStorage.getItem('tokenObj')).token;
    return $http({
      method: "GET",
      url: '/api/userProducts',
      headers: {
        "token": token
      }
    }).then(function (res) {
      var order = res.data;
      order = order.filter(function (product) {
        if (product.completed_date === null) {
          return product;
        }
      });
      return order;
    });
  };
  this.completeOrder = function (credit) {
    var token = JSON.parse(localStorage.getItem('tokenObj')).token;
    return $http({
      method: "POST",
      url: "/api/completeOrder",
      headers: {
        "token": token
      }
    });
  };
});
'use strict';

angular.module('app').service('cartSvc', function ($http) {
  // var token = JSON.parse(localStorage.getItem('tokenObj')).token;


  this.updateCartQty = function (qty, orderId) {
    var token = JSON.parse(localStorage.getItem('tokenObj')).token;
    return $http({
      method: "PUT",
      url: '/api/orders',
      data: {
        qty: qty,
        orderId: orderId
      },
      headers: {
        "token": token
      }
    }).then(function (res) {
      return res;
    });
  };

  this.deleteOrder = function (orderId) {
    var token = JSON.parse(localStorage.getItem('tokenObj')).token;
    return $http({
      method: "DELETE",
      url: '/api/orders/' + orderId,
      headers: {
        "token": token
      }
    }).then(function (res) {
      return res;
    });
  };
});
'use strict';

angular.module('app').service('userSvc', function ($http) {

  this.createUser = function (user) {
    return $http({
      method: 'POST',
      url: 'api/users',
      data: {
        firstname: user.firstname,
        lastname: user.lastname,
        emailaddress: user.emailaddress,
        password: user.password
      }
    }).then(function (res) {
      console.log("create user", res);
      var token = res.headers()['x-auth'];
      var tokenObj = { 'token': token };
      localStorage.setItem('tokenObj', JSON.stringify(tokenObj));
      return res;
    });
  };
  this.login = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/login',
      data: {
        email: user.email,
        password: user.password
      }
    }).then(function (res) {
      if (res.data === true) {
        var token = res.headers()['x-auth'];
        var tokenObj = { 'token': token };
        localStorage.setItem('tokenObj', JSON.stringify(tokenObj));
      }

      return res.data;
    });
  };

  this.getEmail = function () {
    var token = JSON.parse(localStorage.getItem('tokenObj')).token;
    return $http({
      method: "GET",
      url: "/api/users/email",
      headers: {
        "token": token
      }
    }).then(function (res) {
      // var user = {
      //   email: res.data[0].email,
      //   firstname: res.data[0].firstname,
      //   lastname: res.data[0].lastname,
      //   address: res.data[0].street + ' ' +  res.data[0].city + ' ' + res.data[0].state + ' ' +  res.data[0].zipcode + ' ' +  res.data[0].country,
      //   phone: res.data[0].phone
      // }
      // return user;
      return res.data[0].email;
    });
  };
  this.getAdderess = function () {
    var token = JSON.parse(localStorage.getItem('tokenObj')).token;
    return $http({
      method: "GET",
      url: "/api/users/address",
      headers: {
        "token": token
      }
    }).then(function (res) {
      return res.data[0];
    });
  };
});
"use strict";
'use strict';

angular.module('app').directive('footerDir', function () {
  return {
    restrict: '',
    templateUrl: './app/shared/directives/footer/footer.html'
  };
});
'use strict';

angular.module('app').controller('navCtrl', function ($scope, $state, productsSvc) {
  $scope.searchCollection = "";
  $scope.goToSearch = function (searchCollection) {
    $state.go("search", { "search": searchCollection });
  };
  $scope.display = {
    div: 1
  };
  $scope.toggle = false;
  var listObj = {
    "SHOP": ["- SHOP ALL -", "CARDIGANS", "TEES", "TANKS", "SWEATSHIRTS", "SWEATPANTS", "SHORTS", "HATS", "JACKETS", "WOMEN'S", "GIFT CARDS"],
    "BOXING": ["- ALL BOXING -", "MUHAMMAD ALI", "MIKE TYSON", "JULIO CESAR CHAVEZ", "JOE FRAZIER", "ROCKY MARCIANO"],
    "MARTIAL ARTS": ["- ALL MARTIAL ARTS -", "BRUCE LEE", "CHUCK LIDDELL", "ROYCE GRACIE"],
    "BASEBALL": ["- ALL BASEBALL -", "JACKIE ROBINSON", "BABE RUTH"],
    "BASKETBALL": ["- ALL BASKETBALL -", "ALLEN IVERSON", "SHAQ"],
    "FOOTBALL": ["- ALL FOOTBALL -", "WALTER PAYTON", "BARRY SANDERS"],
    "COLLECTIONS": ["PROFESSIONAL WRESTLING", "THRILLA IN MANILA", "MMA LEGENDS"]
  };
  $scope.goToAccount = function () {
    if (localStorage.length >= 1) {
      $state.go("account");
    } else {
      $state.go("accountLogin");
    }
  };
  $scope.goToCart = function () {
    if (localStorage.length >= 1) {
      $state.go("cart");
    } else {
      $state.go("accountLogin");
    }
  };
  $scope.getList = function (param) {
    $scope.menuList = listObj[param];
  };
  $scope.getList();
  var token;
  if (localStorage.length >= 1) {
    productsSvc.cartLength().then(function (res) {
      var length = res;
      $scope.cartLength = '(' + length + ')';
    });
  } else {
    $scope.cartLength = "";
  }
});
'use strict';

angular.module('app').directive('navDir', function () {
  return {
    restrict: '',
    templateUrl: './app/shared/directives/nav/nav.html',
    controller: 'navCtrl',
    link: function link(scope, elem, attr) {
      var token;
      if (localStorage.length >= 1) {
        token = true;
      } else {
        token = false;
      }
      var listChecker;

      $('.main-account-account').on('click', function () {
        if (token === false) {
          // $(this).css("display", "none");
          $(".main-account-nav").css("display", "none");
          $("#login-signup").css("display", "flex");
        }
        if (token === true) {
          $("#view-account-logout").css("display", "flex");
          $(".main-account-nav").css("display", "none");
        }
      });
      $(".main-account-search").on("click", function () {
        $(".main-account-nav").css("display", "none");
        $(".main-account-search-input").css("display", "flex");
      });
      $("#nav-search-x").on("click", function () {
        $(".main-account-nav").css("display", "inline");
        $(".main-account-search-input").css("display", "none");
      });

      $("#nav-account-x").on("click", function () {
        $(".main-account-nav").css("display", "inline");
        $(".main-account-login").css("display", "none");
      });
      $("#nav-account-xx").on("click", function () {
        $(".main-account-nav").css("display", "inline");
        $(".main-account-login").css("display", "none");
      });

      $('.web-li').on('click', function () {
        var list = scope.menuList;
        if (list === undefined || listChecker === list) {
          $('.web-li-dropdown').css('height', '0');
          listChecker = [];
        } else {
          $('.web-li-dropdown').css('height', '30' * scope.menuList.length + 'px');
          listChecker = scope.menuList;
        }
      });
      // mobile-collection-dropdown
      $("#nav-collections-ham-container").on("click", function () {

        $("#nav-collections-ham-container").toggleClass("anime");

        if ($(".mobile-collection-div").height() == "0") {
          $(".mobile-collection-div").css("height", "auto");
          $(".mobile-collection-div").css("display", "flex");
        } else {
          $(".mobile-collection-div").css("height", "0");
          $(".mobile-collection-div").css("display", "none");
        }
      });
      $(window).resize(function () {
        if ($(this).width() > 768) {
          $(".mobile-collection-div").css("height", "0");
          $("#nav-collections-ham-container").removeClass("anime");
        }
      });

      $("#searchlogo-mobile").on("click", function () {
        $(".responsive-li").css("display", "none");
        $(".responsive-li-search").css("display", "inline-block");
      });
      $("#account-x-mobile-search").on("click", function () {
        $(".responsive-li").css("display", "inline-block");
        $(".responsive-li-search").css("display", "none");
      });
      $(window).resize(function () {
        if ($(this).width() > 768) {
          $(".responsive-li").css("display", "none");
          $(".responsive-li-search").css("display", "none");
        }
        if ($(this).width() <= 767) {
          $(".responsive-li").css("display", "inline-block");
          $(".responsive-li-search").css("display", "none");
        }
      });
    }
  };
});
'use strict';

angular.module('app').controller('orderController', function ($scope, productsSvc) {
  $scope.getUserProducts = function () {
    productsSvc.getUserProducts().then(function (res) {
      var products = res;
      var idArr = [];
      for (var x = 0; x < res.length; x++) {
        idArr.push(res[x].product_id);
      }
      productsSvc.getProducts(idArr).then(function (res) {
        var cartProducts = res.cartProducts;
        products.forEach(function (item1) {
          cartProducts.forEach(function (item2) {
            if (item1.product_id == item2.id) {
              item1.name = item2.name;
              item1.price = item2.price * item1.qty;
              item1.color = item2.color;
              item1.img = item2.jsonb_agg;
              item1.qty = parseInt(item1.qty);
            }
          });
        });
        // console.log(products);
        $scope.totalPrice = 0;
        $scope.total = products.map(function (item) {
          $scope.totalPrice += item.price;
        });

        $scope.products = products;
      });
    });
  };
  $scope.getUserProducts();
});
'use strict';

angular.module('app').directive('orderDir', function () {
  return {
    restrict: '',
    templateUrl: './app/shared/directives/orderSummary/orderSummary.html',
    controller: 'orderController',
    link: function link(scope, elem, attr) {}
  };
});
//# sourceMappingURL=maps/app_bundle.js.map
