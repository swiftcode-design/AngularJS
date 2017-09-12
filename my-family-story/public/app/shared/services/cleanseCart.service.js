
(function () {

  angular
    .module('app')
    .service('CleanseCartService', ['ProductService', '$q', CleanseCartService]);

  function CleanseCartService(ProductService, $q) {

    this.cleanseOrder = (resData) => {
      let order = {
        _id: resData._id,
        cart: []
      };

      let deferred = $q.defer();

      function asyncLoop(i) {
        if (i >= resData.books.length) return asyncFin();

        let book = resData.books[i];
        let bookItem = {};
        let pageProducts = [
          {
            page_type: 'Basic',
            subtotal: 0
          },
          {
            page_type: 'Activity',
            subtotal: 0
          },
          {
            page_type: 'Portrait',
            subtotal: 0
          },
        ];

        bookItem._id = book._id;
        bookItem.title = book.title;
        bookItem.print_qty = book.print_qty;
        bookItem.pageProducts = pageProducts.filter((product) => {
          product.quantity = countPageType(book, product.page_type);
          return product.quantity !== 0;
        });

        getSubtotals()
          .then((response) => {
            response.forEach((elem) => {
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
          })
      };

      function asyncFin() {
        deferred.resolve(order);
      };

      asyncLoop(0);

      return deferred.promise;
    };

    function countPageType(book, page_type) {
      let count = 0;
      book.pages.forEach((elem) => {
        if (elem.page_type == page_type) count++;
      })
      return count;
    };

    function getSubtotals() {
      return ProductService.getProductByCategory("page")
        .then((response) => {
          return response;
        })
        .catch((error) => {
          throw error;
        })
    };

  };
})();
