(function () {

  angular
    .module('app')
    .controller('ordersTableController', ['$scope', 'AdminService', ordersTableController]);

  function ordersTableController($scope, AdminService) {

    let ctrl = this;

    $scope.$watch('ctrl.allOrders', (newValue) => {
      if (newValue) {
        ctrl.allOrders = newValue;
      }
    });

    ctrl.countTotalPages = (order) => {
      let total = 0;
      if (order && order.books && order.books.length > 0) {
        order.books.forEach((book) => {
          if (book.pages && book.pages.length > 0) {
            book.pages.forEach((page) => {
              total++;
            });
          };
        });
      };
      return total;
    };

    ctrl.toggleArchived = (order, toggle) => {
      let orderId = order._id;
      let data = {};
      if (toggle === "archive") {
        data.archived = true;
        archiveOrder(orderId, data);
      } else if (toggle === "unarchive") {
        data.archived = false;
        unarchiveOrder(orderId, data);
      };
    };

    function archiveOrder(orderId, data) {
      AdminService.updateOrder(orderId, data)
        .then((res) => {
          AdminService.getAllActiveOrders()
            .then((res) => {
              if (!Array.isArray(res)) {
                ctrl.allOrders = [];
                return;
              } else {
                ctrl.allOrders = res;
              };
            })
            .catch((err) => {
              console.log(err);
              throw err;
            })
        })
        .catch((err) => {
          console.log(err);
        })
    }

    function unarchiveOrder(orderId, data) {
      AdminService.updateOrder(orderId, data)
        .then((res) => {
          AdminService.getAllArchivedOrders()
            .then((res) => {
              if (!Array.isArray(res)) {
                ctrl.allOrders = [];
                return;
              } else {
                ctrl.allOrders = res;
              };
            })
            .catch((err) => {
              console.log(err);
              throw err;
            })
        })
        .catch((err) => {
          console.log(err);
        })
    }

  };
})();
