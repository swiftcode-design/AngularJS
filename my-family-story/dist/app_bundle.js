'use strict';

(function () {

  angular.module('app', ['ui.router', 'ui.bootstrap', 'ngAnimate', 'angular-stripe']);
})();
'use strict';

(function () {

  angular.module('app').config(['$stateProvider', '$urlRouterProvider', 'stripeProvider', config]).run(['$rootScope', '$window', scrollFix]);

  function config($stateProvider, $urlRouterProvider, stripeProvider) {

    stripeProvider.setPublishableKey('pk_test_yN68NiS92cu5tu6yrxsKiyxu');

    $urlRouterProvider.when('/admin', '/admin/orders');

    var getUser = function getUser($state, AuthService) {
      return AuthService.checkUser().then(function (res) {
        return res;
      });
    };

    var limitUser = function limitUser($state, AuthService) {
      return AuthService.checkUser().then(function (res) {
        if (!res) $state.go('home');
        return res;
      }).catch(function (err) {
        $state.go('home');
      });
    };

    var limitAdmin = function limitAdmin($state, AuthService) {
      return AuthService.checkUser().then(function (res) {
        if (!res || res.privilege !== "admin") {
          $state.go('home');
        };
        return res;
      }).catch(function (err) {
        $state.go('home');
      });
    };

    $stateProvider.state('home', {
      url: '/home',
      controller: 'homeController',
      templateUrl: './app/components/home/home.html',
      resolve: {
        user: getUser
      }
    }).state('about', {
      url: '/about',
      controller: 'aboutController',
      templateUrl: './app/components/about/about.html',
      resolve: {
        user: getUser
      }
    }).state('start', {
      url: '/start',
      templateUrl: './app/components/start/start.html',
      controller: 'startController',
      resolve: {
        user: getUser
      }
    }).state('book-builder', {
      url: '/book-builder',
      controller: 'bookBuilderController',
      templateUrl: './app/components/book-builder/book-builder.html',
      resolve: {
        user: limitUser
      }
    }).state('prints', {
      url: '/prints',
      controller: 'printsController',
      templateUrl: './app/components/prints/prints.html',
      resolve: {
        user: limitUser
      }
    }).state('cart', {
      url: '/cart',
      controller: 'cartController',
      templateUrl: './app/components/cart/cart.html',
      resolve: {
        user: limitUser
      }
    }).state('account', {
      url: '/account',
      controller: 'accountController',
      templateUrl: './app/components/account/account.html',
      resolve: {
        user: limitUser
      }
    }).state('sandbox', {
      url: '/sandbox',
      controller: 'sandboxController',
      templateUrl: './app/components/sandbox/sandbox.html'
    }).state('admin', {
      url: '/admin',
      controller: 'adminController',
      templateUrl: './app/components/admin/admin.html',
      resolve: {
        user: limitAdmin
      }
    }).state('admin.page-products', {
      url: '/page-products',
      templateUrl: './app/components/admin/page-products/page-products.html',
      controller: 'adminPageProductsController'
    }).state('admin.print-products', {
      url: '/print-products',
      templateUrl: './app/components/admin/print-products/print-products.html',
      controller: 'adminPrintProductsController'
    }).state('admin.orders', {
      url: '/orders',
      templateUrl: './app/components/admin/orders/orders.html',
      controller: 'adminOrdersController'
    }).state('admin.archive', {
      url: '/archive',
      templateUrl: './app/components/admin/archive/archive.html',
      controller: 'adminArchiveController'
    }).state('admin.order-details', {
      url: '/order-details/:id',
      templateUrl: './app/components/admin/order-details/order-details.html',
      controller: 'orderDetailsController'
    }).state('thanks', {
      url: '/thanks',
      templateUrl: './app/components/thanks/thanks.html'
    });
    // .state('place-order', {
    //   url: '/place-order',
    //   controller: 'placeOrderController',
    //   templateUrl: './components/place-order/place-order.html'
    // })
    // .state('confirmation', {
    //   url: '/confirmation',
    //   controller: 'confirmationController',
    //   templateUrl: './components/confirmation/confirmation.html'
    // })

    $urlRouterProvider.otherwise('/home');
  };

  function scrollFix($rootScope, $window) {
    $rootScope.$on('$stateChangeSuccess', function () {
      $window.scrollTo(0, 0);
    });
  };
})();
'use strict';

(function () {

  angular.module('app').controller('aboutController', ['$scope', aboutController]);

  function aboutController($scope) {};
})();
'use strict';

(function () {

  angular.module('app').controller('accountController', ['$scope', 'bookService', 'addressService', 'UserService', 'user', accountController]);

  function accountController($scope, BookService, addressService, UserService, user) {

    $scope.user = user;
    // addressService.user = $scope.user;
    console.log(user);

    BookService.getUserBooks(user._id).then(function (res) {
      $scope.userBooks = res;
      console.log($scope.userBooks);
    });

    addressService.getAddress(user._id).then(function (res) {
      $scope.userAddress = res[0];
      console.log(res[0], 'addressCtrl');
    });

    $scope.updateUser = function (update) {
      if (address) {
        update._id = user._id;
        console.log(update);
        UserService.updateUser(update);
      }
    };

    $scope.CreateAddress = function (address) {
      if (address !== undefined) {
        address.user = $scope.user._id;
        addressService.postAddress(address);
        console.log(address);
      }
    };
    var input = document.querySelectorAll('input');
    for (var x = 0; x < input.length; x++) {
      input[x].setAttribute('size', input[x].getAttribute('placeholder').length);
    }
  };
})();
'use strict';

(function () {

  angular.module('app').directive('accountDir', accountDir);

  function accountDir() {

    return {
      restrict: 'A',
      link: function link(scope, elem, attrs) {
        // var length = $(elem).attr('placeholder').split('.')[1].split('');
        // length.splice(-2)
        // var keyName = length.join('');
        // $(elem).css('width', scope.user[keyName].length * 8 + 20 + 'px');
        $('.accountInfoBtn').on('click', function () {
          $('#accountSavedAlert').addClass('alertSave');
          setTimeout(function () {
            $('#accountSavedAlert').removeClass('alertSave');
          }, 1500);
        });
        $('.accountInfoBtn2').on('click', function () {
          $('#accountSavedAlert2').addClass('alertSave');
          setTimeout(function () {
            $('#accountSavedAlert2').removeClass('alertSave');
          }, 1500);
        });
      }
    };
  };
})();
'use strict';

(function () {
  angular.module('app').controller('adminController', ['$scope', 'ProductService', adminController]);

  function adminController($scope, ProductService) {};
})();
'use strict';

(function () {
  angular.module('app').controller('bookBuilderController', ['$scope', '$state', '$uibModal', '$timeout', 'user', 'bookService', 'modalService', 'CartService', bookBuilderController]);

  function bookBuilderController($scope, $state, $uibModal, $timeout, user, bookService, modalService, CartService) {

    $scope.saved = false;
    $scope.userBooks;
    $scope.user = user;

    $scope.getActiveOrder = function () {
      CartService.getActiveOrder(user._id).then(function (res) {
        $scope.activeOrder = res;
      });
    };
    $scope.getActiveOrder();

    var resetPages = function resetPages() {
      $scope.pages = [];
    };

    $scope.getUserBooks = function () {
      bookService.getUserBooks(user._id).then(function (res) {
        $scope.userBooks = res;
      });
    };

    $scope.createNewBook = function (title, img, user) {
      if ($scope.userBooks.length === 0 && !title) {
        $scope.openAlertModal();
      } else {
        resetPages();
        $scope.addNewPage();
        var book = {
          title: title,
          title_img: img,
          user: user,
          pages: $scope.pages
        };
        bookService.createNewBook(book).then(function (res) {
          $scope.currentBook = res.data;
          $scope.fillBookInfo($scope.currentBook);
          $scope.getUserBooks();
        }).catch(function (err) {
          console.error("Book creation failed!", err);
        });
      }
    };

    $scope.initialLoad = function () {
      bookService.getUserBooks(user._id).then(function (res) {
        $scope.userBooks = res;
        if ($scope.userBooks.length > 0) {
          $scope.fillBookInfo($scope.userBooks[$scope.userBooks.length - 1]);
        } else {
          //Provide HTML for new project
        }
      }).catch(function (err) {
        console.error(err);
      });
    };
    $scope.initialLoad();

    $scope.fillBookInfo = function (book) {
      resetPages();
      $scope.currentBook = book;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = book.pages[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var i = _step.value;

          $scope.fillPage(i);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    };

    $scope.fillPage = function (i) {
      $scope.pages.push({
        text: i.text,
        page_type: i.page_type,
        activity_type: i.activity_type,
        custom_activity: i.custom_activity,
        image_url: i.image_url,
        edit_allowed: i.edit_allowed,
        page_number: i.page_number
      });
    };

    $scope.addNewPage = function () {
      $scope.pages.push({
        text: "",
        page_type: "Basic",
        activity_type: "",
        custom_activity: "",
        image_url: "",
        edit_allowed: false,
        page_number: $scope.pages.length + 1
      });
      $scope.saved = false;
    };

    var updatePageNums = function updatePageNums(arr) {
      for (var i = 0; i < arr.length; i++) {
        arr[i].page_number = i + 1;
      }
    };

    $scope.removePage = function (i) {
      if ($scope.pages.length > 1) {
        $timeout(function () {
          $scope.pages.splice(i, 1);
          updatePageNums($scope.pages);
        }, 250);
      }
      $scope.saved = false;
    };

    $scope.saveBook = function () {
      $scope.currentBook.pages = $scope.pages;
      bookService.saveBook($scope.currentBook).then(function (res) {
        $scope.saved = true;
      });
    };
    $scope.openViewProjectsModal = function () {
      var m = modalService.openViewProjectsModal(user, $scope.userBooks);
      m.result.then(function (data) {

        $scope.getUserBooks();
        if (data.message == "closed") {
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = data.deleted[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var i = _step2.value;

              if ($scope.currentBook._id === i) {
                $scope.fillBookInfo($scope.userBooks[$scope.userBooks.length - 1]);
                break;
              }
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        } else {
          $scope.fillBookInfo(data);
        }
      });
    };

    $scope.openNewProjectModal = function () {
      var m = modalService.openNewProjectModal();
      m.result.then(function (data) {
        if (data !== "close") {
          $scope.createNewBook(data.title, data.title_img, user._id);
          $scope.getUserBooks();
        }
      });
    };

    $scope.openReviewModal = function () {
      var m = modalService.openReviewModal();
    };

    $scope.openAlertModal = function () {
      var modalInstance = $uibModal.open({
        animation: true,
        size: 'sm',
        templateUrl: '/app/components/book-builder/project-view-modal/open-alert-modal/alertModal.html',
        controller: 'alertModalCtrl'
      });
    };

    $scope.selectPrints = function () {
      var m = modalService.openPrintsModal();
      m.result.then(function (data) {
        if (data !== 'cancel') {
          $scope.currentBook.print_qty = data;
          $scope.saveBook();
          $scope.saveToOrder($scope.currentBook, user);
        }
      });
    };

    $scope.saveToOrder = function (book, user) {
      if (!$scope.activeOrder._id) {
        CartService.createNewOrder(book._id, user._id).then(function (res) {
          $state.go('cart');
        });
      } else {
        var bookArray = $scope.activeOrder.books;
        // Check for duplicates and replace if duplicate
        for (var i in bookArray) {
          if (book._id == bookArray[i]) {
            bookArray.splice(i, 1);
          }
        }
        bookArray.push(book._id);
        CartService.addBookToOrder($scope.activeOrder._id, bookArray).then(function (res) {
          $state.go('cart');
        }).catch(function (err) {
          console.log(err);
        });
      }
    };
  }
})();
'use strict';

(function () {

  angular.module('app').directive('bookbuilderDir', bookbuilderDir);

  function bookbuilderDir() {

    return {
      restrict: 'A',
      link: function link(scope, elem, attrs) {

        $('.descrowtrigger').on('click', function () {
          $('.descrow').toggleClass('trigger');
          if ($('#bookbuilderHideSpan').html() === 'Hide') {
            $('#bookbuilderHideSpan').html('Review');
          } else {
            $('#bookbuilderHideSpan').html('Hide');
          }
        });
        $('#bbPencil').on('click', function () {
          $('.upperInput').addClass('bb-title-input');
          $('.upperInput').select();
          $('.upper').addClass('bb-title-disappear');
          $('#bbPencil').addClass('bb-title-disappear');
        });
        $(document).keypress(function (e) {
          if (e.which == 13) {
            $('.upperInput').removeClass('bb-title-input');
            $('.upper').removeClass('bb-title-disappear');
            $('#bbPencil').removeClass('bb-title-disappear');
          }
        });
        $('.upperInput').focusout(function () {
          $('.upperInput').removeClass('bb-title-input');
          $('.upper').removeClass('bb-title-disappear');
          $('#bbPencil').removeClass('bb-title-disappear');
        });
      }
    };
  };
})();
'use strict';

(function () {

  angular.module('app').controller('cartController', ['user', '$scope', 'CartService', cartController]);

  function cartController(user, $scope, CartService) {

    $scope.showCart = false;
    $scope.defaultMessage = "Loading...";

    getActiveOrder(user._id);

    $scope.$watch('order', function (newVal, oldVal) {
      if (newVal !== oldVal) {
        messageHandler(newVal);
      }
    });

    function getActiveOrder(userId) {
      CartService.getActiveOrder(userId).then(function (res) {
        var orderId = res._id;
        CartService.getOrderDetails(orderId).then(function (res) {
          $scope.order = res;
          messageHandler(res);
        }).catch(function (err) {
          messageHandler(err);
          console.log(err);
        });
      }).catch(function (err) {
        messageHandler(err);
        console.log(err);
      });
    };

    function messageHandler(order) {
      if (!order || !order.cart || order.cart.length < 1) {
        $scope.defaultMessage = "Your cart is currently empty";
      } else {
        $scope.showCart = true;
      }
    };
  };
})();
'use strict';

(function () {

  angular.module('app').controller('homeController', ['$scope', homeController]);

  function homeController($scope) {

    $scope.howItWorks = [{
      imgUrl: '../../../assets/images/HIW1.png',
      desc: 'Customize your coloring book and tell your family\'s story. Select the number and type of pages and submit your text.<br /><a class="underline-link about-link" href="/#!/start"><em>Learn more</em></a>'
    }, {
      imgUrl: '../../../assets/images/HIW2.png',
      desc: 'We\'ll draw the perfect pictures to correspond with your text and preferences for each page.<br /><a class="underline-link about-link" href="/#!/start"><em>Learn more</em></a>'
    }, {
      imgUrl: '../../../assets/images/HIW3.png',
      desc: 'You\'ll receive your custom coloring book as a digital file, or choose to have it printed and delivered to your door.<br /><a class="underline-link about-link" href="/#!/start"><em>Learn more</em></a>'
    }];
  };
})();
'use strict';

(function () {

  angular.module('app').directive('howItWorks', howItWorks);

  function howItWorks() {

    return {
      restrict: 'E',
      scope: {
        imgUrl: "=",
        desc: "="
      },
      template: '<div><img ng-src="{{imgUrl}}"></div><br /><div class="divider"></div><br /><div ng-bind-html="desc | renderHTML"></div>',
      link: function link(scope, elem, attrs) {
        $(window).scroll(function () {
          if ($(this).scrollTop() > 250) {
            $('#howItWorksSpan').addClass('homeScrollanime');
          }
          if ($(this).scrollTop() > 500) {
            // $('.howItWorks').fadeIn('4000');
            $('.how-it-works').addClass('homeScrollanime');
          }
          if ($(this).scrollTop() > 700) {
            // $('.howItWorks').fadeIn('4000');
            $('.homeBottomCon').addClass('homeScrollanime');
          }
        });
      }
    };
  };
})();
'use strict';

(function () {

  angular.module('app').directive('parallax', parallax);

  function parallax() {

    return {
      restrict: 'C',
      link: function link(scope, elem, attrs) {

        $(window).scroll(function () {
          var winScroll = $(window).scrollTop();
          $(elem).css('transform', 'translateY(-' + winScroll / 6 + '%)');
        });
      }
    };
  };
})();
'use strict';

(function () {

  angular.module('app').controller('printsController', ['$scope', '$uibModal', printsController]);

  function printsController($scope, $uibModal, $log, $document) {

    $scope.test = 'test';
  };
})();
'use strict';

(function () {

  angular.module('app').controller('startController', ['$scope', '$state', 'ProductService', 'AuthService', 'user', startController]);

  function startController($scope, $state, ProductService, AuthService, user) {

    getProductByCategory('page');

    $scope.user = user;
    $scope.login = function (stateOption) {
      AuthService.login(stateOption);
    };
    $scope.goToState = function (state) {
      $state.go(state);
    };

    function getProductByCategory(category) {
      ProductService.getProductByCategory(category).then(function (response) {
        $scope.pageTypes = response;
      }).catch(function (error) {
        return console.log(error);
      });
    };
  };
})();
'use strict';

(function () {
  angular.module('app').directive('bgImg', bgImg);

  function bgImg() {
    return {
      link: function link(scope, elem, attr) {
        var url = attr.bgImg;
        elem.css({
          'background-image': 'url(' + url + ')',
          'background-size': 'cover'
        });
      }
    };
  };
})();
'use strict';

(function () {
  angular.module('app').controller('alertModalCtrl', ['$scope', '$uibModalInstance', alertModalCtrl]);

  function alertModalCtrl($scope, $uibModalInstance) {
    $scope.cancel = function () {
      $uibModalInstance.close('cancel');
    };
    $scope.confirm = function () {
      $uibModalInstance.close('confirm');
    };
  }
})();
'use strict';

(function () {

  angular.module('app').service('addressService', addressService);

  function addressService($http) {
    this.getAddress = function (user) {
      return $http.get('/api/address?user=' + user).then(function (res) {
        return res.data;
      });
    };

    this.postAddress = function (address) {
      return $http({
        method: "POST",
        url: "/api/address",
        data: address
      });
    };
  };
})();
'use strict';

(function () {

  angular.module('app').service('AdminService', ['$http', AdminService]);

  function AdminService($http) {

    this.getAllActiveOrders = function () {
      return $http({
        method: 'GET',
        url: '/api/allactiveorders'
      }).then(function (res) {
        if (res === 'No active orders') {
          console.log(res);
        } else {
          return res.data;
        }
      }).catch(function (err) {
        throw err;
      });
    };

    this.getAllArchivedOrders = function () {
      return $http({
        method: 'GET',
        url: '/api/allarchivedorders'
      }).then(function (res) {
        return res.data;
      }).catch(function (err) {
        console.log(err);
        throw err;
      });
    };

    this.getOneOrderById = function (orderId) {
      return $http({
        method: 'GET',
        url: '/api/order/' + orderId
      }).then(function (res) {
        return res.data;
      }).catch(function (err) {
        console.log(err);
        throw err;
      });
    };

    this.updateOrder = function (orderId, update) {

      return $http({
        method: 'PUT',
        url: '/api/order/' + orderId,
        data: update
      }).then(function (res) {
        return res.data;
      }).catch(function (err) {
        console.log(err);
        throw err;
      });
    };
  };
})();
'use strict';

(function () {

  angular.module('app').service('AuthService', ['$http', '$rootScope', '$state', '$location', '$window', AuthService]);

  function AuthService($http, $rootScope, $state, $location, $window) {

    this.logout = function () {
      return $http({
        method: 'GET',
        url: '/api/logout'
      }).then(function (res) {
        $rootScope.$emit('user', null);
        $state.go('home');
        return res;
      }).catch(function (err) {
        console.log(err);
      });
    };

    this.checkUser = function () {
      return $http({
        method: 'GET',
        url: '/api/auth/me'
      }).then(function (res) {
        console.log('authservice checkuser', res.data);
        $rootScope.$emit('user', res.data);
        return res.data;
      }).catch(function (err) {
        $rootScope.$emit('user', null);
        throw err;
      });
    };

    this.login = function (stateOption) {
      var state = $state.current.name;
      if (stateOption) {
        state = stateOption;
      };
      location.href = '/api/auth?state=' + state;
    };
  };
})();
'use strict';

(function () {

  angular.module('app').service('bookService', bookService);

  function bookService($http) {

    this.getUserBooks = function (user) {
      return $http.get('/api/book?user=' + user).then(function (res) {
        return res.data;
      }).catch(function (err) {
        console.error(err);
      });
    };

    this.createNewBook = function (book) {
      return $http.post('/api/book', book).then(function (res) {
        return res;
      }).catch(function (err) {
        console.error(err);
      });
    };

    this.saveBook = function (book) {
      return $http.put('/api/book/' + book._id, book).then(function (res) {
        return res;
      }).catch(function (err) {
        console.error(err);
      });
    };

    this.deleteBook = function (book) {
      return $http.delete('/api/book/' + book._id).then(function (res) {
        return res.data;
      }).catch(function (err) {
        console.error(err);
      });
    };
  };
})();
'use strict';

(function () {

  angular.module('app').service('CartService', ['$http', 'CleanseCartService', CartService]);

  function CartService($http, CleanseCartService) {

    this.createNewOrder = function (bookId, userId) {
      var order = {
        books: [bookId],
        user: userId
      };
      return $http.post('/api/order', order).then(function (res) {
        return res.data;
      }).catch(function (err) {
        console.log("Error creating order: ", err);
      });
    };

    this.addBookToOrder = function (orderId, bookArr) {
      return $http.put('/api/order/' + orderId, { 'books': bookArr }).then(function (res) {
        return res.data;
      }).catch(function (err) {
        console.log("Error adding book to order: ", err);
      });
    };

    this.getActiveOrder = function (userId) {
      return $http({
        method: 'GET',
        url: '/api/activeorder/' + userId
      }).then(function (res) {
        if (res === 'No active orders') {
          console.log(res);
        } else {
          return res.data[0];
        }
      }).catch(function (err) {
        throw err;
      });
    };

    this.getOrderDetails = function (orderId) {
      return $http({
        method: 'GET',
        url: '/api/order/' + orderId
      }).then(function (res) {
        return CleanseCartService.cleanseOrder(res.data);
      }).catch(function (err) {
        throw err;
      });
    };

    this.updateCart = function (updatedOrder) {
      var orderId = updatedOrder._id;
      var newOrderData = {
        books: updatedOrder.cart.map(function (book) {
          return book._id;
        })
      };
      return $http({
        method: 'PUT',
        url: '/api/order/' + orderId,
        data: newOrderData
      }).then(function (res) {
        return CleanseCartService.cleanseOrder(res.data);
      }).catch(function (err) {
        throw err;
      });
    };

    // this.markOrderComplete = function(param) {
    //
    // }

    this.putShipAddress = function (orderId, shipping) {
      return $http({
        method: 'PUT',
        url: '/api/order/' + orderId,
        data: { ship_address: shipping }
      });
    };
  };
})();
'use strict';

(function () {

  angular.module('app').service('CleanseCartService', ['ProductService', '$q', CleanseCartService]);

  function CleanseCartService(ProductService, $q) {

    this.cleanseOrder = function (resData) {
      var order = {
        _id: resData._id,
        cart: []
      };

      var deferred = $q.defer();

      function asyncLoop(i) {
        if (i >= resData.books.length) return asyncFin();

        var book = resData.books[i];
        var bookItem = {};
        var pageProducts = [{
          page_type: 'Basic',
          subtotal: 0
        }, {
          page_type: 'Activity',
          subtotal: 0
        }, {
          page_type: 'Portrait',
          subtotal: 0
        }];

        bookItem._id = book._id;
        bookItem.title = book.title;
        bookItem.print_qty = book.print_qty;
        bookItem.pageProducts = pageProducts.filter(function (product) {
          product.quantity = countPageType(book, product.page_type);
          return product.quantity !== 0;
        });

        getSubtotals().then(function (response) {
          response.forEach(function (elem) {
            if (elem.name == 'Basic') {
              pageProducts[0].subtotal += elem.price * pageProducts[0].quantity;
            } else if (elem.name == 'Activity') {
              pageProducts[1].subtotal += elem.price * pageProducts[1].quantity;
            } else if (elem.name == 'Portrait') {
              pageProducts[2].subtotal += elem.price * pageProducts[2].quantity;
            }
          });
          order.cart.push(bookItem);
          asyncLoop(i + 1);
        });
      };

      function asyncFin() {
        deferred.resolve(order);
      };

      asyncLoop(0);

      return deferred.promise;
    };

    function countPageType(book, page_type) {
      var count = 0;
      book.pages.forEach(function (elem) {
        if (elem.page_type == page_type) count++;
      });
      return count;
    };

    function getSubtotals() {
      return ProductService.getProductByCategory("page").then(function (response) {
        return response;
      }).catch(function (error) {
        throw error;
      });
    };
  };
})();
'use strict';

(function () {

  angular.module('app').service('modalService', ['$uibModal', modalService]);

  function modalService($uibModal) {

    this.openViewProjectsModal = function (_user, _userBooks) {
      return $uibModal.open({
        animation: true,
        templateUrl: '/app/shared/modals/view-projects-modal/viewProjectsModal.html',
        controller: 'viewProjectModalCtrl',
        resolve: {
          user: function user() {
            return _user;
          },
          userBooks: function userBooks() {
            return _userBooks;
          }
        }
      });
    };

    this.openDeleteBookModal = function (_userBooks2, _index) {
      return $uibModal.open({
        animation: true,
        size: 'sm',
        templateUrl: '/app/shared/modals/delete-book-modal/deleteBookModal.html',
        controller: 'deleteBookModalCtrl',
        resolve: {
          userBooks: function userBooks() {
            return _userBooks2;
          },
          index: function index() {
            return _index;
          }
        }
      });
    };

    this.openNewProjectModal = function (user) {
      return $uibModal.open({
        animation: true,
        templateUrl: '/app/shared/modals/new-project-modal/newProjectModal.html',
        controller: 'newProjectModalCtrl'
      });
    };

    this.openReviewModal = function () {
      return $uibModal.open({
        animation: true,
        templateUrl: '/app/shared/modals/review-modal/reviewModal.html',
        controller: 'reviewModalCtrl'
      });
    };

    this.openAlertModal = function (modalController, alertTitle, alertBody, cancelBtnCol, cancelBtnTxt, confirmBtnCol, confirmBtnTxt) {
      return $uibModal.open({
        animation: true,
        size: 'sm',
        template: '<div class="modal-header">\n                          <h3>' + alertTitle + '</h3>\n                        </div>\n                        <div class="modal-body">\n                          <p>' + alertBody + '</p>\n                        </div>\n                        <div class="modal-footer">\n                          <button class="btn btn-' + cancelBtnCol + '" ng-click="cancel()">' + cancelBtnTxt + '</button>\n                          <button class="btn btn-' + confirmBtnCol + '" ng-click="confirm()">' + confirmBtnTxt + '</button>\n                        </div>',
        controller: '' + modalController
      });
    };

    this.openPrintsModal = function (_user2) {
      return $uibModal.open({
        animation: true,
        size: "lg",
        templateUrl: '/app/shared/modals/prints-modal/printsModal.html',
        controller: 'printsModalCtrl',
        resolve: {
          user: function user() {
            return _user2;
          }
        }
      });
    };
  }
})();
'use strict';

(function () {

  angular.module('app').service('ProductService', ['$http', ProductService]);

  function ProductService($http) {

    this.getProductByName = function (name) {
      return $http({
        method: 'GET',
        url: '/api/product?name=' + name
      }).then(function (response) {
        return response.data[0];
      }).catch(function (error) {
        console.log(error);
        throw error;
      });
    };

    this.getProductByCategory = function (category) {
      return $http({
        method: 'GET',
        url: '/api/product?category=' + category
      }).then(function (response) {
        return response.data;
      }).catch(function (error) {
        console.log(error);
        throw error;
      });
    };

    this.getAllProducts = function () {
      return $http({
        method: 'GET',
        url: '/api/product'
      }).then(function (response) {
        return response.data;
      }).catch(function (error) {
        console.log(error);
        throw error;
      });
    };

    this.updateProduct = function (product) {
      var _id = product._id;
      return $http({
        method: 'PUT',
        url: '/api/product/' + _id,
        data: JSON.stringify(product)
      }).then(function (response) {
        return response.data;
      }).catch(function (error) {
        throw error;
      });
    };
  };
})();
'use strict';

(function () {

  angular.module('app').filter('renderHTML', ['$sce', renderHTML]);

  function renderHTML($sce) {
    return function (string) {
      return $sce.trustAsHtml(string);
    };
  };
})();
'use strict';

(function () {

  angular.module('app').service('S3Service', ['$http', '$q', S3Service]);

  function S3Service($http, $q) {

    this.uploadPhoto = function (photo) {

      photo = angular.toJson(photo);

      return $http.post('/api/upload-photos', photo).then(function (res) {
        return res.data;
      }).catch(function (err) {
        console.log(err);
        return err;
      });
    };
  };
})();
'use strict';

(function () {

  angular.module('app').service('StripeService', ['$http', 'stripe', StripeService]);

  function StripeService($http, stripe) {
    //
    //   this.makePayment = function(card, payment) {
    //     return stripe.card.createToken(card)
    //     .then(function (response) {
    //       console.log('token created for card ending in ', response.card.last4);
    //       var payment = angular.copy(payment);
    //       payment.card = void 0;
    //       payment.token = response.id;
    //
    //       return $http({
    //         method: 'POST',
    //         url: '/api/payment',
    //         data: {
    //           amount: $scope.cartTotal * 100,
    //           payment: payment
    //         }
    //       })
    //     })
    //   }


  };
})();

// angular.module('app')
//     .service('StripeService', function($http) {
//         this.chargeCard = function(source, amount, email) {
//                 let obj = {
//                     stripeSource: source,
//                     amount: amount,
//                     email: email
//                 }
//                 return $http.post('/rent-charge-card', obj);
//             }
//     });
'use strict';

(function () {

  angular.module('app').service('UserService', ['$http', UserService]);

  function UserService($http) {
    this.getUser = function () {
      return $http.get('/api/auth/me').then(function (res) {
        console.log(res.data);
        return res.data;
      });
    };
    this.updateUser = function (user) {
      return $http({
        method: 'PUT',
        url: '/api/user/' + user._id,
        data: user
      });
    };
  };
})();
'use strict';

(function () {

  angular.module('app').controller('adminArchiveController', ['$scope', 'AdminService', adminArchiveController]);

  function adminArchiveController($scope, AdminService) {

    getAllArchivedOrders();

    function getAllArchivedOrders() {
      AdminService.getAllArchivedOrders().then(function (res) {
        if (!Array.isArray(res)) {
          console.log(res);
          $scope.allOrders = [];
          return;
        } else {
          $scope.allOrders = res;
        };
      }).catch(function (err) {
        console.log(err);
      });
    };
  };
})();
"use strict";

(function () {

  angular.module("app").controller("orderDetailsController", ["$scope", "$stateParams", "AdminService", orderDetailsController]);

  function orderDetailsController($scope, $stateParams, AdminService) {

    getOneOrderById($stateParams.id);
    $scope.abbreviatedId = abbreviateId($stateParams.id);

    function getOneOrderById(orderId) {
      AdminService.getOneOrderById(orderId).then(function (res) {
        $scope.order = res;
        console.log($scope.order);
      }).catch(function (err) {
        console.log(err);
      });
    };

    function abbreviateId(orderId) {
      return orderId.slice(0, 6);
    };
  };
})();
'use strict';

(function () {

  angular.module('app').controller('adminOrdersController', ["$scope", "AdminService", adminOrdersController]);

  function adminOrdersController($scope, AdminService) {

    getAllActiveOrders();

    function getAllActiveOrders() {
      AdminService.getAllActiveOrders().then(function (res) {
        if (!Array.isArray(res)) {
          console.log(res);
          $scope.allOrders = [];
          return;
        } else {
          console.log(res);
          $scope.allOrders = res;
        };
      }).catch(function (err) {
        console.log(err);
      });
    };
  };
})();
'use strict';

(function () {
  angular.module('app').directive('ordersTable', ordersTable);

  function ordersTable() {

    return {
      restrict: 'A',
      scope: {
        allOrders: '=',
        toggleSwitch: '@',
        filterPredicate: '=',
        orderPredicate: '='
      },
      templateUrl: './app/components/admin/orders-table/orders-table.html',
      controller: 'ordersTableController',
      bindToController: true,
      controllerAs: 'ctrl',
      link: link
    };

    function link(scope, elem, attrs, ctrl) {};
  };
})();
'use strict';

(function () {

  angular.module('app').controller('ordersTableController', ['$scope', 'AdminService', ordersTableController]);

  function ordersTableController($scope, AdminService) {

    var ctrl = this;

    $scope.$watch('ctrl.allOrders', function (newValue) {
      if (newValue) {
        ctrl.allOrders = newValue;
      }
    });

    ctrl.countTotalPages = function (order) {
      var total = 0;
      if (order && order.books && order.books.length > 0) {
        order.books.forEach(function (book) {
          if (book.pages && book.pages.length > 0) {
            book.pages.forEach(function (page) {
              total++;
            });
          };
        });
      };
      return total;
    };

    ctrl.toggleArchived = function (order, toggle) {
      var orderId = order._id;
      var data = {};
      if (toggle === "archive") {
        data.archived = true;
        archiveOrder(orderId, data);
      } else if (toggle === "unarchive") {
        data.archived = false;
        unarchiveOrder(orderId, data);
      };
    };

    function archiveOrder(orderId, data) {
      AdminService.updateOrder(orderId, data).then(function (res) {
        AdminService.getAllActiveOrders().then(function (res) {
          if (!Array.isArray(res)) {
            console.log(res);
            ctrl.allOrders = [];
            return;
          } else {
            ctrl.allOrders = res;
          };
        }).catch(function (err) {
          console.log(err);
          throw err;
        });
      }).catch(function (err) {
        console.log(err);
      });
    }

    function unarchiveOrder(orderId, data) {
      AdminService.updateOrder(orderId, data).then(function (res) {
        AdminService.getAllArchivedOrders().then(function (res) {
          if (!Array.isArray(res)) {
            console.log(res);
            ctrl.allOrders = [];
            return;
          } else {
            ctrl.allOrders = res;
          };
        }).catch(function (err) {
          console.log(err);
          throw err;
        });
      }).catch(function (err) {
        console.log(err);
      });
    }
  };
})();
'use strict';

(function () {

  angular.module('app').controller('adminPageProductsController', ["$scope", "ProductService", adminPageProductsController]);

  function adminPageProductsController($scope, ProductService) {

    getAllProducts();

    function getAllProducts() {
      ProductService.getProductByCategory('page').then(function (response) {
        $scope.allProducts = response;
      }).catch(function (error) {
        console.log(error);
      });
    };
  };
})();
'use strict';

(function () {

  angular.module('app').controller('adminPrintProductsController', ["$scope", "ProductService", adminPrintProductsController]);

  function adminPrintProductsController($scope, ProductService) {

    getAllProducts();

    function getAllProducts() {
      ProductService.getProductByCategory('prints').then(function (response) {
        $scope.allProducts = response;
      }).catch(function (error) {
        console.log(error);
      });
    };
  };
})();
'use strict';

(function () {
  angular.module('app').directive('productTable', productTable);

  function productTable() {

    return {
      restrict: 'A',
      scope: {
        allProducts: '=',
        productType: '@'
      },
      templateUrl: './app/components/admin/product-table/product-table.html',
      controller: 'productTableController',
      bindToController: true,
      controllerAs: 'ctrl',
      link: link
    };

    function link(scope, elem, attrs, ctrl) {};
  };
})();
'use strict';

(function () {

  angular.module('app').controller('productTableController', ['ProductService', '$scope', productTableController]);

  function productTableController(ProductService, $scope) {

    var ctrl = this;

    $scope.$watch('ctrl.allProducts', function (newValue) {
      if (newValue) ctrl.allProducts = newValue;
    });

    ctrl.submitProductChanges = function (product) {
      ProductService.updateProduct(product).then(function (res) {
        ProductService.getProductByCategory(ctrl.productType).then(function (res) {
          ctrl.allProducts = res;
        }).catch(function (err) {
          throw err;
        });
      }).catch(function (err) {
        console.log(err);
      });
    };
  };
})();
'use strict';

(function () {
  angular.module('app').controller('projectModalController', ['$scope', '$http', 'user', 'userBooks', 'bookService', '$uibModal', '$uibModalInstance', projectModalController]);

  function projectModalController($scope, $http, user, userBooks, bookService, $uibModal, $uibModalInstance) {

    $scope.userBooks = userBooks;
    $scope.checkBookLength = false;
    if ($scope.userBooks.length < 3) {
      $scope.checkBookLength = true;
    }
    if ($scope.userBooks.length >= 3) {
      $scope.checkBookLength = false;
    }

    $scope.openBook = function (book) {
      $uibModalInstance.close(book);
    };

    $scope.openDeleteBookModal = function (_index) {
      var modalInstance = $uibModal.open({
        animation: true,
        size: 'sm',
        templateUrl: '/app/components/book-builder/project-view-modal/delete-book-modal/deleteBookModal.html',
        controller: 'deleteBookModalController',
        resolve: {
          userBooks: function userBooks() {
            return $scope.userBooks;
          },
          index: function index() {
            return _index;
          }
        }
      });
      modalInstance.result.then(function (res) {
        $scope.deletedIndex = _index;
        if (res === 'delete') {
          $scope.deleteBook(userBooks[_index]);
          $scope.userBooks.splice(_index, 1);
          if ($scope.userBooks.length < 3) {
            $scope.checkBookLength = true;
          }
          if ($scope.userBooks.length >= 3) {
            $scope.checkBookLength = false;
          }
        }
      });
    };

    $scope.openAlertModal = function () {
      var modalInstance = $uibModal.open({
        animation: true,
        size: 'sm',
        templateUrl: '/app/components/book-builder/project-view-modal/open-alert-modal/alertModal.html',
        controller: 'alertModalCtrl'
      });
    };

    $scope.deleteBook = function (book) {
      bookService.deleteBook(book).then(function (res) {
        console.log(res);
      }).catch(function (err) {
        console.error(err);
      });
    };

    $scope.createNewBook = function () {
      if (!$scope.newBookTitle) {
        $scope.openAlertModal();
      } else {
        var book = {
          title: $scope.newBookTitle,
          title_img: $scope.titleImg,
          user: user._id
        };
        $uibModalInstance.close(book);
      }
    };

    $scope.close = function () {
      $uibModalInstance.close('close');
    };
  }
})();
'use strict';

(function () {

  angular.module('app').directive('cart', cart);

  function cart() {

    return {
      restrict: 'E',
      scope: {
        order: '=',
        cartTotal: '='
      },
      templateUrl: './app/components/cart/cart-directive/cart-directive.html',
      controller: 'cartDirectiveController',
      bindToController: true,
      controllerAs: 'ctrl',
      link: link
    };

    function link(scope, elem, attrs, ctrl) {

      ctrl.removeItem = function (bookId) {
        $('.cart-item-' + bookId).slideUp(150, function () {
          ctrl.deleteBook(bookId);
        });
      };
    };
  };
})();
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {

  angular.module('app').controller('cartDirectiveController', ['$scope', '$uibModal', 'CartService', '$rootScope', cartDirectiveController]);

  function cartDirectiveController($scope, $uibModal, CartService, $rootScope) {

    var ctrl = this;

    $scope.$watch('ctrl.order', function (newVal) {
      "fired";

      if (newVal) ctrl.cartTotal = getCartTotal(newVal["cart"]);
    });
    // UNNECESSARY?

    ctrl.deleteBook = function (bookId) {
      ctrl.order.cart = ctrl.order.cart.filter(function (elem) {
        return elem._id !== bookId;
      });
      ctrl.cartTotal = getCartTotal(ctrl.order.cart);

      CartService.updateCart(ctrl.order).then(function (res) {
        ctrl.order = res;
        $rootScope.$emit('updateOrder');
      }).catch(function (err) {
        ctrl.order = {};
        console.log(err);
      });
    };

    function getCartTotal(cart) {
      var total = 0;
      cart.forEach(function (book) {
        if (book.print_qty) {
          console.log(_typeof(book.print_qty.price), book.print_qty.price);
          total += book.print_qty.price;
        }
        book.pageProducts.forEach(function (pageProduct) {
          total += pageProduct.subtotal;
        });
      });
      console.log("cart-total", total);
      return total;
    };

    ctrl.openPaymentModal = function () {
      console.log("Cart Directive says: ", ctrl.order);
      var modalInstance = $uibModal.open({
        animation: true,
        size: 'lg',
        templateUrl: 'app/components/cart/payment-modal/payment-modal.html',
        controller: 'paymentModalController',
        resolve: {
          cartTotal: function cartTotal() {
            return ctrl.cartTotal;
          },
          orderId: function orderId() {
            return ctrl.order._id;
          }
        }
      });
      modalInstance.result.then(function (param) {
        if (param == 'success') {
          console.log("From cartDirectiveController: Successful payment");
        }
        if (param == 'cancel') {
          console.log("Cancelled");
        }
      });
    };
  };
})();
'use strict';

(function () {
  angular.module('app').controller('paymentModalController', ['$scope', 'stripe', '$http', '$state', '$uibModalInstance', 'cartTotal', 'orderId', 'CartService', 'StripeService', paymentModalController]);

  function paymentModalController($scope, stripe, $http, $state, $uibModalInstance, cartTotal, orderId, CartService, StripeService) {

    $scope.cartTotal = cartTotal;

    var unique_order_id = orderId;

    $scope.putShipAddress = function (orderId) {
      CartService.putShipAddress(unique_order_id, $scope.ship_info);
    };

    $scope.charge = function (orderId) {
      return stripe.card.createToken($scope.payment.card).then(function (response) {
        console.log('token created for card ending in ', response.card.last4);
        var payment = angular.copy($scope.payment);
        payment.card = void 0;
        payment.token = response.id;
        console.log(unique_order_id);

        return $http({
          method: 'POST',
          url: '/api/payment',
          data: {
            amount: $scope.cartTotal * 100,
            payment: payment,
            orderId: unique_order_id
          }
        });
      }).then(function (payment) {
        console.log('successfully submitted payment for $', payment);
        $uibModalInstance.close('cancel');
        $state.go('thanks');
      }).catch(function (err) {
        if (err.type && /^Stripe/.test(err.type)) {
          console.log('Stripe error: ', err.message);
          alert(err.message);
        } else {
          console.log('Other error occurred, possibly with your API', err.message);
          alert(err.message);
        }
      });
    };

    $scope.cancel = function () {
      $uibModalInstance.close('cancel');
    };

    $scope.validateNumber = function (value) {
      if (value) {
        if ($scope.payment.card.number.validateCardNumber(value)) {
          $scope.numberError = false;
          $scope.cardInfoForm.number.$setValidity("number", true);
          $scope.cardType = Stripe.card.cardType(value);
        } else {
          $scope.numberError = true;
          $scope.cardInfoForm.number.$setValidity("number", false);
        }
      }
    };
    $scope.validateExpiry = function (month, year) {
      if (month && year) {
        var exp = month + ' ' + year;
        if (Stripe.card.validateExpiry(exp)) {
          $scope.expiryError = false;
          $scope.cardInfoForm.month.$setValidity("month", true);
        } else {
          $scope.expiryError = true;
          $scope.cardInfoForm.month.$setValidity("month", false);
        }
      }
    };
    $scope.validateCVC = function (value) {
      if (value) {
        if (Stripe.card.validateCVC(value)) {
          $scope.cvcError = false;
          $scope.cardInfoForm.cvc.$setValidity("cvc", true);
        } else {
          $scope.cvcError = true;
          $scope.cardInfoForm.cvc.$setValidity("cvc", false);
        }
      }
    };
  }
})();
'use strict';

(function () {
  angular.module('app').directive('animateFade', [animateFade]);

  function animateFade() {
    return {
      restrict: 'A',
      scope: {
        condition: '=',
        text: '&'
      },
      link: function link(scope, elem, attrs) {
        // $(elem).on('click', function(){
        //   if(scope.condition === false){
        //     $(elem).switchClass("btn-yellow", "btn-green", 300, 'linear')
        //     scope.condition = true
        //   } else {
        //     $(elem).switchClass("btn-green", "btn-yellow", 300, 'linear')
        //     scope.condition = false
        //   }
        // })
      }
    };
  }
})();
'use strict';

(function () {

  angular.module('app').directive('bbImgSliderDir', bbImgSliderDir);

  function bbImgSliderDir() {

    return {
      restrict: 'A',
      link: function link(scope, elem, attrs) {
        var transX = 0;
        var transXM = 0;
        var transTotal = scope.userBooks.length;
        var checker = 0;
        var checkerM = 0;
        var lengthSaver = scope.userBooks.length;
        // scope.$watch('userBooks.length', function(newValue, oldValue){
        //   else if(scope.deletedIndex > 1){
        //
        //     if(scope.userBooks.length < lengthSaver){
        //       console.log(transXM);
        //       transXM += 185;
        //       checkerM --;
        //       transTotal -= 1;
        //       console.log(transXM);
        //       $('.imgSliderAbs2').css("transform", "translateX(" + transXM + "px)");
        //     }
        //   }
        //   else if(scope.deletedIndex === 1){
        //     console.log('why');
        //     transXM = 0;
        //     checkerM = 0;
        //     transTotal -= 1;
        //     $('.imgSliderAbs2').css("transform", "translateX(" + transXM + "px)");
        //   }
        //     lengthSaver = scope.userBooks.length;
        // })

        scope.$watch('userBooks.length', function (newValue, oldValue) {
          if (scope.deletedIndex > 2 && $('.imgSliderAbs').is(":visible")) {
            console.log(scope.deletedIndex, 'deletedIndex');
            if (scope.userBooks.length < lengthSaver) {
              transX += 150;
              checker--;
              transTotal -= 1;
              $('.imgSliderAbs').css("transform", "translateX(" + transX + "px)");
              console.log(transTotal, 'transTotal');
            }
          }
          if (scope.deletedIndex <= 2 && $('.imgSliderAbs').is(":visible")) {
            transX = 0;
            checker = 0;
            transTotal -= 1;
            $('.imgSliderAbs').css("transform", "translateX(" + transX + "px)");
            console.log(scope.deletedIndex, 'deletedIndex');
          }
          if (scope.deletedIndex > 1) {

            if (scope.userBooks.length < lengthSaver && $('.imgSliderAbs2').is(":visible")) {
              console.log(transXM);
              transXM += 185;
              checkerM--;
              transTotal -= 1;
              console.log(transXM);
              $('.imgSliderAbs2').css("transform", "translateX(" + transXM + "px)");
            }
          }
          if (scope.deletedIndex <= 1 && $('.imgSliderAbs2').is(":visible")) {
            console.log('why');
            transXM = 0;
            checkerM = 0;
            transTotal -= 1;
            $('.imgSliderAbs2').css("transform", "translateX(" + transXM + "px)");
          }
          lengthSaver = scope.userBooks.length;
        });
        // window Resize========================================
        $(window).resize(function () {
          if ($(window).width() <= 562) {
            transX = 0;
            checker = 0;
            $('.imgSliderAbs2').css("transform", "translateX(" + transX + "px)");
          }
          if ($(window).width() > 562) {
            transX = 0;
            checker = 0;
            $('.imgSliderAbs').css("transform", "translateX(" + transX + "px)");
          }
          console.log(scope.deletedIndex);
        });
        // ====mobile=======================================
        // scope.$watch('userBooks.length', function(newValue, oldValue){
        //   if(scope.deletedIndex > 1){
        //
        //     if(scope.userBooks.length < lengthSaver){
        //       console.log(transXM);
        //       transXM += 185;
        //       checkerM --;
        //       transTotal -= 1;
        //       console.log(transXM);
        //       $('.imgSliderAbs2').css("transform", "translateX(" + transXM + "px)");
        //     }
        //   }
        //   else if(scope.deletedIndex === 1){
        //     console.log('why');
        //     transXM = 0;
        //     checkerM = 0;
        //     transTotal -= 1;
        //     $('.imgSliderAbs2').css("transform", "translateX(" + transXM + "px)");
        //   }
        //     lengthSaver = scope.userBooks.length;
        // })


        $('#imgSliderTest12').on('click', function () {
          if (checkerM < transTotal - 1) {
            checkerM++;
            transXM -= 185;
            $('.imgSliderAbs2').css("transform", "translateX(" + transXM + "px)");
          }
        });
        $('#imgSliderTest22').on('click', function () {
          if (checkerM > 0) {
            checkerM--;
            transXM += 185;
            $('.imgSliderAbs2').css("transform", "translateX(" + transXM + "px)");
          }
        });

        // ====mobile====================

        $('#imgSliderTest1').on('click', function () {
          if (checker < transTotal - 3) {
            checker++;
            transX -= 150;
            $('.imgSliderAbs').css("transform", "translateX(" + transX + "px)");
          }
        });
        $('#imgSliderTest2').on('click', function () {
          if (checker > 0) {
            checker--;
            transX += 150;
            $('.imgSliderAbs').css("transform", "translateX(" + transX + "px)");
          }
        });
      }
    };
  };
})();
// else if(scope.deletedIndex <= 2 && transX === 0){
//   if($('.imgSliderAbs').hasClass('imgSliderAnime')){
//     $('.imgSliderAbs').removeClass('imgSliderAnime');
//   }
//   transTotal -= 1;
//   $('.imgSliderAbs').addClass('imgSliderAnime');
// }
'use strict';

(function () {
  angular.module('app').directive('footerDirective', [footerDirective]);

  function footerDirective() {

    return {
      restrict: 'E',
      templateUrl: './app/shared/directives/footer/footer.html',
      link: link
    };

    function link(scope, elem, attr) {};
  };
})();
'use strict';

(function () {

  angular.module('app').controller('modalController', ['$scope', '$uibModalInstance', modalController]);

  function modalController($scope, $uibModalInstance, $log, $document) {
    $scope.ok = function () {
      $uibModalInstance.close('ok');
    };
  };
})();
'use strict';

(function () {
  angular.module('app').directive('alertModalDirective', ['$uibModal', modalDirective]);

  function modalDirective($uibModal) {
    return {
      restrict: 'EA',
      template: '<a ng-click="open()">ALERT</a>',
      scope: {
        alertTitle: '@',
        alertBody: '@'
      },
      link: function link(scope, elem, attrs) {
        scope.open = function () {
          var modalInstance = $uibModal.open({
            animation: true,
            template: '<div class="modal-header">\n                          <h3>' + scope.alertTitle + '</h3>\n                        </div>\n                        <div class="modal-body">\n                          <p>' + scope.alertBody + '</p>\n                        </div>\n                        <div class="modal-footer">\n                          <button class="btn btn-green" ng-click="ok()">OK</button>\n                        </div>',
            controller: 'modalController',
            size: 'sm'
          });
          modalInstance.result.then(function (res) {
            console.log(res);
          });
        };
      }
    };
  }
})();
'use strict';

(function () {

  angular.module('app').controller('navController', ['AuthService', 'CartService', '$rootScope', '$state', navController]);

  function navController(AuthService, CartService, $rootScope, $state) {

    var ctrl = this;

    this.login = AuthService.login;
    this.logout = AuthService.logout;

    $rootScope.$on('user', function (event, user) {
      ctrl.user = user;
      checkCartNum();
    });

    $rootScope.$on('updateOrder', function (event) {
      checkCartNum();
    });

    var checkCartNum = function checkCartNum() {
      if (!ctrl.user) {
        ctrl.cartNum = 0;
      } else {
        CartService.getActiveOrder(ctrl.user._id).then(function (res) {
          ctrl.cartNum = res.books.length;
        });
      }
    };
  };
})();
'use strict';

(function () {
  angular.module('app').directive('navDirective', navDirective);

  function navDirective() {
    return {
      restrict: 'E',
      scope: true,
      templateUrl: './app/shared/directives/nav/nav.html',
      controller: 'navController',
      bindToController: true,
      controllerAs: 'ctrl',
      link: function link(scope, elem, attr) {

        $(window).scroll(function () {
          var winScroll = $(window).scrollTop();
          if (winScroll > 110) {
            $(elem).addClass('sticky-nav');

            $('#navLogo').addClass("sticky-nav");
            $('#hamDropDownUl').addClass("hamDropDownUlWinScroll");
          } else {
            $(elem).removeClass('sticky-nav');

            $('#navLogo').removeClass("sticky-nav");
            $('#hamDropDownUl').removeClass("hamDropDownUlWinScroll");
          }
        });
        $('.navBurger').on('click', function () {
          $(this).toggleClass('ham-anime');
          $('.hamDropdownContainer').toggleClass('hamDropdownAnime');
        });
        $(window).scroll(function () {
          $('.hamDropdownContainer').removeClass('hamDropdownAnime');
          $('.navBurger').removeClass('ham-anime');
        });
        $(window).resize(function () {
          $('.hamDropdownContainer').removeClass('hamDropdownAnime');
          $('.navBurger').removeClass('ham-anime');
        });
      }
    };
  };
})();
'use strict';

(function () {

  angular.module('app').directive('bookPage', bookPage);

  function bookPage() {
    return {
      restrict: 'E',
      scope: {
        page: '=',
        index: '='
      },
      templateUrl: './app/shared/directives/page/pageTmpl.html',
      controller: 'pageDirCtrl',
      link: function link(scope, elem, attrs) {

        scope.$watch('wasPageDeleted', function (newValue, oldValue) {
          if (newValue) {
            if ($('.con' + scope.index).hasClass('pageinitial')) {
              $('.con' + scope.index).removeClass('pageinitial');
            }
            $('.con' + scope.index).addClass('page-anime');
            setTimeout(function () {
              $('.con' + scope.index).removeClass('page-anime');
            }, 550);
          }
        });
      }
    };
  };
})();
'use strict';

(function () {
  angular.module('app').controller('pageDirCtrl', ['$scope', '$uibModal', '$timeout', 'modalService', pageDirCtrl]);

  function pageDirCtrl($scope, $uibModal, $timeout, modalService) {

    $scope.page_type = "Basic";
    $scope.activity_type = "Crossword";
    $scope.custom_activity = "";
    $scope.edit_allowed = false;
    $scope.wasPageDeleted = false;

    $scope.pageTypes = [{ name: "Basic", value: "Basic" }, { name: "Activity", value: "Activity" }, { name: "Portrait", value: "Portrait" }];

    $scope.activity_types = [{ name: "Crossword", value: "Crossword" }, { name: "Connect the Dots", value: "Connect the Dots" }, { name: "Maze", value: "Maze" }, { name: "Custom", value: "Custom" }];

    $scope.allowTypes = [{ name: "No", value: false }, { name: "Yes", value: true }];

    var modalCtrl = "alertModalCtrl",
        alertTitle = "Delete this Page?",
        alertBody = "Do you really want to delete this page? This action cannot be undone.",
        cancelColor = "yellow",
        cancelText = "CANCEL",
        confirmColor = "red",
        confirmText = "DELETE";

    $scope.openAlertModal = function () {
      var modalInstance = modalService.openAlertModal(modalCtrl, alertTitle, alertBody, cancelColor, cancelText, confirmColor, confirmText);

      modalInstance.result.then(function (param) {
        if (param == 'confirm') {
          $scope.wasPageDeleted = true;
          $timeout(function () {
            $scope.$parent.$parent.removePage($scope.index);
            $scope.wasPageDeleted = false;
          }, 200);
        }
      });
    };
  }
})();
'use strict';

angular.module('app').directive('cardModalTrigger', function () {
    return {
        restrict: 'A',
        scope: {
            htmlID: '@cardModalTrigger'
        },
        link: function link(scope, elem, attrs) {
            elem.on('click', function (event) {
                event.preventDefault();
                var id = '#' + scope.htmlID;
                $(id).modal('show');
            });
        }
    };
});
'use strict';

angular.module('app').directive('creditCardModal', function () {
    return {
        restrict: 'E',
        templateUrl: './js/directives/credit-card-modal/credit-card-modal.html',
        scope: {
            model: '=',
            payRent: '&',
            chargeAmount: '='
        },
        link: function link(scope, elem, attrs) {}
    };
});
'use strict';

angular.module('app').controller('RentPay', function ($scope, user, moment, UserService, StripeService) {
    UserService.getUserById(user._id).then(function (res) {
        $scope.user = res;

        if (!$scope.user.rentPaid && todayIsInTimeFrame($scope.user.rentDueDate)) {
            $scope.needToPayRent = true;
            $scope.lateFees = calculateFees($scope.user.rentDueDate);
            $scope.totalRentAmount = $scope.user.rentAmount + $scope.lateFees;
        } else {
            $scope.needToPayRent = false;
        }
    }, function (err) {
        console.log(err);
    });

    /*********************** PAY RENT ***********************/
    $scope.payRentBank = function () {
        Stripe.setPublishableKey('pk_test_GfjALqHyZhwYmd38SfJANoe4');
        Stripe.bankAccount.createToken({
            country: 'US',
            currency: 'USD',
            routing_number: $scope.accountInfo.routingNumber,
            account_number: $scope.accountInfo.accountNumber,
            account_holder_name: $scope.accountInfo.name,
            account_holder_type: 'individual'
        }, function (status, response) {
            if (response.error) {
                console.log('ERROR', response.error);
            } else {
                var token = response.id;
                StripeService.chargeBank(token, $scope.totalRentAmount, $scope.user.email).then(function (res) {
                    console.log(res);
                    if (res.status === 200) {
                        // console.log('Bank Charge went through');
                        addPaymentToUser();
                    } else {
                        console.log('Payment did not go through');
                    }
                }, function (err) {
                    console.log(err);
                });
            }
        });
    };

    /*********************** PAY RENT ***********************/
    $scope.payRentCard = function () {
        var rentAmount = $scope.totalRentAmount + ($scope.totalRentAmount * 0.029 + 0.3);
        Stripe.setPublishableKey('pk_test_GfjALqHyZhwYmd38SfJANoe4');
        Stripe.source.create({
            type: 'card',
            card: {
                number: $scope.cardInfo.number,
                cvc: $scope.cardInfo.cvc,
                exp_month: $scope.cardInfo.month,
                exp_year: $scope.cardInfo.year
            },
            owner: {
                address: {
                    postal_code: $scope.cardInfo.zip
                }
            }
        }, function (status, response) {
            if (response.error) {
                console.log('ERROR', response.error);
            } else {
                var source = response.id;
                StripeService.chargeCard(source, rentAmount, $scope.user.email).then(function (res) {
                    console.log(res);
                    if (res.status === 200) {
                        // console.log('Card charge went through');
                        addPaymentToUser();
                    } else {
                        console.log('Payment did not go through');
                    }
                }, function (err) {
                    console.log(err);
                });
            }
        });
    };

    /*********************** ADD PAYMENT TO USER ***********************/
    function addPaymentToUser() {
        var payment = {
            amount: $scope.totalRentAmount,
            date: new Date(),
            email: $scope.user.email,
            userid: $scope.user._id
        };

        $scope.user.rentDueDate = incrementDueDate($scope.user.rentDueDate);
        $scope.user.rentPaid = true;

        UserService.updateUser($scope.user._id, $scope.user).then(function (res) {
            UserService.payRent($scope.user._id, payment).then(function (res) {
                $scope.user = res;
                $scope.needToPayRent = false;
                $state.go('payment-success');
            }, function (err) {
                console.log(err);
            });
        }, function (err) {
            console.log(err);
        });
    }

    /*********************** TODAY IS IN TIME FRAME ***********************/
    function todayIsInTimeFrame(date) {
        var dueDate = moment(date);
        // let dueDate = moment().add(7, 'days');
        var today = moment();
        var difference = today.diff(dueDate, 'days');

        if (difference > -7) {
            return true;
        } else {
            return false;
        }
    }
    /*********************** CALCULATE FEES ***********************/
    function calculateFees(date) {
        var dueDate = moment(date);
        // let dueDate = moment().subtract(5, 'days');
        var today = moment();
        var difference = today.diff(dueDate, 'days');

        if (difference > 0) {
            return 50 + (difference - 1) * 10;
        } else {
            return 0;
        }
    }
    /*********************** INCREMENT DUE DATE ***********************/
    function incrementDueDate(date) {
        var now = new Date(date);
        if (now.getMonth() == 11) {
            return new Date(now.getFullYear() + 1, 0, 1);
        } else {
            return new Date(now.getFullYear(), now.getMonth() + 1, 1);
        }
    }
});
'use strict';

(function () {

  angular.module('app').controller('printsDropdownController', ['$scope', 'ProductService', printsDropdownController]);

  function printsDropdownController($scope, ProductService) {

    var ctrl = this;

    ctrl.prints = ['loading options'];

    ProductService.getProductByCategory("prints").then(function (res) {
      if (res) ctrl.prints = res;
    });

    ctrl.setSelection = function (option) {
      ctrl.printsSelection = option;
    };
  };
})();
'use strict';

(function () {

  angular.module('app').directive('printsDropdown', printsDropdown);

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

    function link(scope, elem, attrs, ctrl) {}
  };
})();
'use strict';

(function () {

  angular.module('app').controller('s3Controller', ['S3Service', s3Controller]);

  function s3Controller(S3Service) {

    var ctrl = this;

    ctrl.buttonText = "Upload Photo";

    ctrl.submitPhoto = function (photo) {
      S3Service.uploadPhoto(photo).then(function (res) {
        ctrl.inputText = ctrl.successText;
        ctrl.s3Url = res;
        document.getElementById('photo-upload').blur();
      }).catch(function (err) {
        console.log(err);
      });
    };

    ctrl.resizer = function (photo, extension, maxWidth, maxHeight) {

      var photoToResize = photo;

      var img = new Image();
      var reader = new FileReader();
      reader.onload = function (onLoadEvent) {

        img.src = onLoadEvent.target.result;

        var MAX_WIDTH = maxWidth,
            MAX_HEIGHT = maxHeight,
            width = img.width,
            height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        var canvas = document.createElement('canvas');
        canvas.style.visibility = 'hidden';
        document.body.appendChild(canvas);

        canvas.width = width;
        canvas.height = height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        var resizedPhotoBody = canvas.toDataURL('image/' + extension);

        var newImage = {
          imageBody: resizedPhotoBody,
          imageExtension: extension
        };
        ctrl.submitPhoto(newImage);
      };
      reader.readAsDataURL(photoToResize);
    };
  };
})();
'use strict';

(function () {

  angular.module('app').directive('s3Uploader', s3Uploader);

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
      link: function link(scope, elem, attrs, ctrl) {

        var maxWidth = +attrs.maxWidth,
            maxHeight = +attrs.maxHeight;

        ctrl.inputText = attrs.defaultText;
        ctrl.successText = attrs.successText;

        var input = angular.element(elem[0].querySelector('[s3-input]'));

        input.on('change', function (onChangeEvent) {

          var reader = new FileReader();
          reader.onload = function (onLoadEvent) {

            var imageData = onLoadEvent.target.result;
            var imageExtension = imageData.split(';')[0].split('/');

            imageExtension = imageExtension[imageExtension.length - 1];

            ctrl.resizer(onChangeEvent.target.files[0], imageExtension, maxWidth, maxHeight);
          };
          reader.readAsDataURL(onChangeEvent.target.files[0]);
        });
      }
    };
  };
})();
'use strict';

(function () {
  angular.module('app').controller('deleteBookModalCtrl', ['$scope', '$uibModalInstance', 'userBooks', 'index', deleteBookModalCtrl]);

  function deleteBookModalCtrl($scope, $uibModalInstance, userBooks, index) {
    console.log($scope);

    $scope.preTitle = userBooks[index].title;

    if ($scope.preTitle === undefined) {
      $scope.title = "untitled";
    } else {
      $scope.title = $scope.preTitle;
    }

    $scope.delete = function () {
      $uibModalInstance.close('delete');
    };

    $scope.cancel = function () {
      $uibModalInstance.close('cancel');
    };
  }
})();
'use strict';

(function () {
  angular.module('app').controller('newProjectModalCtrl', ['$scope', 'modalService', '$uibModal', '$uibModalInstance', newProjectModalCtrl]);

  function newProjectModalCtrl($scope, modalService, $uibModal, $uibModalInstance) {

    var modalCtrl = "alertModalCtrl",
        alertTitle = "Missing Project Title",
        alertBody = "Please provide a title before creating your new project.",
        cancelColor = "white",
        cancelText = "",
        confirmColor = "green",
        confirmText = "OK";

    $scope.createNewBook = function () {
      if (!$scope.newBookTitle) {
        modalService.openAlertModal(modalCtrl, alertTitle, alertBody, cancelColor, cancelText, confirmColor, confirmText);
      } else {
        var book = {
          title: $scope.newBookTitle,
          title_img: $scope.titleImg
        };
        $uibModalInstance.close(book);
      }
    };

    $scope.close = function () {
      $uibModalInstance.close('close');
    };
  }
})();
'use strict';

(function () {
  angular.module('app').controller('alertPrintModalCtrl', ['$scope', '$uibModalInstance', alertPrintModalCtrl]);

  function alertPrintModalCtrl($scope, $uibModalInstance) {
    $scope.ok = function () {
      $uibModalInstance.close('ok');
    };
  }
})();
'use strict';

(function () {
  angular.module('app').controller('printsModalCtrl', ['$scope', '$http', 'bookService', 'CartService', '$uibModal', '$uibModalInstance', 'modalService', printsModalCtrl]);

  function printsModalCtrl($scope, $http, bookService, CartService, $uibModal, $uibModalInstance, modalService) {

    var modalCtrl = "alertModalCtrl",
        alertTitle = "Prints Not Specified",
        alertBody = "Please select a print quantity before sending the project to the cart.",
        cancelColor = "white",
        cancelText = "",
        confirmColor = "green",
        confirmText = "OK";

    $scope.sendToCart = function () {
      if (!$scope.selectedPrints) {
        modalService.openAlertModal(modalCtrl, alertTitle, alertBody, cancelColor, cancelText, confirmColor, confirmText);
      } else {
        $uibModalInstance.close($scope.selectedPrints);
      }
    };

    $scope.cancel = function () {
      $uibModalInstance.close('cancel');
    };
  }
})();
'use strict';

(function () {
  angular.module('app').controller('reviewModalCtrl', ['$scope', 'modalService', '$uibModal', '$uibModalInstance', reviewModalCtrl]);

  function reviewModalCtrl($scope, modalService, $uibModal, $uibModalInstance) {
    $scope.close = function () {
      $uibModalInstance.close('close');
    };
  }
})();
'use strict';

(function () {
  angular.module('app').controller('viewProjectModalCtrl', ['$scope', '$http', 'userBooks', 'bookService', 'modalService', '$uibModal', '$uibModalInstance', viewProjectModalCtrl]);

  function viewProjectModalCtrl($scope, $http, userBooks, bookService, modalService, $uibModal, $uibModalInstance) {

    $scope.userBooks = userBooks;
    var deletedBooks = [];
    $scope.checkBookLength = false;
    if ($scope.userBooks.length < 3) {
      $scope.checkBookLength = true;
    }
    if ($scope.userBooks.length >= 3) {
      $scope.checkBookLength = false;
    }

    $scope.openBook = function (book) {
      $uibModalInstance.close(book);
    };

    $scope.openDeleteBookModal = function (index) {
      var m = modalService.openDeleteBookModal($scope.userBooks, index);
      m.result.then(function (res) {
        if (res === 'delete') {
          $scope.deleteBook(userBooks[index]);
          $scope.deletedIndex = index;
          $scope.userBooks.splice(index, 1);
          if ($scope.userBooks.length < 3) {
            $scope.checkBookLength = true;
          }
          if ($scope.userBooks.length >= 3) {
            $scope.checkBookLength = false;
          }
        }
      });
    };

    $scope.deleteBook = function (book) {
      bookService.deleteBook(book).then(function (data) {
        var deletedbookId = data._id;
        deletedBooks.push(deletedbookId);
      }).catch(function (err) {
        console.error(err);
      });
    };

    $scope.close = function () {
      $uibModalInstance.close({
        message: "closed",
        deleted: deletedBooks
      });
    };
  }
})();
'use strict';

(function () {

  angular.module('app').directive('orderDetailsBook', [orderDetailsBook]);

  function orderDetailsBook() {

    return {
      restrict: 'A',
      templateUrl: './app/components/admin/order-details/order-details-book-directive/order-details-book.html',
      scope: true,
      link: link
    };

    function link(scope, elem, attrs) {

      scope.bookNumber = +attrs.bookNumber;
    }
  };
})();
'use strict';

(function () {

  angular.module('app').directive('orderDetailsBookPage', [orderDetailsBookPage]);

  function orderDetailsBookPage() {

    return {
      restrict: 'A',
      templateUrl: './app/components/admin/order-details/order-details-book-directive/order-details-book-page-directive/order-details-book-page.html',
      scope: true,
      link: link
    };

    function link(scope, elem, attrs) {

      var page = scope.page;
    }
  };
})();
//# sourceMappingURL=maps/app_bundle.js.map
