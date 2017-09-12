(function() {

  angular
    .module('app')
    .service('bookService', bookService);

  function bookService($http) {

    this.getUserBooks = (user) => {
      return $http.get('/api/book?user=' + user)
      .then((res) => {return res.data})
      .catch((err) => {console.log(err)})
    }

    this.createNewBook = (book) => {
      return $http.post('/api/book', book)
      .then((res) => {return res})
      .catch((err) => {console.log(err)})
    }

    this.saveBook = (book) => {
      return $http.put(`/api/book/${book._id}`, book)
      .then((res) => {return res})
      .catch((err) => {console.log(err)})
    }

    this.deleteBook = (book) => {
      return $http.delete(`/api/book/${book._id}`)
      .then((res) => {return res.data})
      .catch((err) => {console.log(err)})
    }
  };
})();
