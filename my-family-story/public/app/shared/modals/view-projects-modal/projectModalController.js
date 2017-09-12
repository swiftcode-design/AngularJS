(function(){
   angular
    .module('app')
    .controller('viewProjectModalCtrl', ['$scope', '$http', 'userBooks', 'bookService', 'modalService', '$uibModal', '$uibModalInstance', viewProjectModalCtrl]);

    function viewProjectModalCtrl($scope, $http, userBooks, bookService, modalService, $uibModal, $uibModalInstance){

      $scope.userBooks = userBooks;
      let deletedBooks = [];
      $scope.checkBookLength = false;
      if($scope.userBooks.length < 3){
        $scope.checkBookLength = true;
      }
      if($scope.userBooks.length >= 3){
        $scope.checkBookLength = false;
      }

      $scope.openBook = (book) => {
        $uibModalInstance.close(book);
      }

      $scope.openDeleteBookModal = (index) => {
          let m = modalService.openDeleteBookModal($scope.userBooks, index)
          m.result.then((res) => {
            if(res === 'delete'){
              $scope.deleteBook(userBooks[index]);
              $scope.deletedIndex = index;
              $scope.userBooks.splice(index, 1);
              if($scope.userBooks.length < 3){
                $scope.checkBookLength = true;
              }
              if($scope.userBooks.length >= 3){
                $scope.checkBookLength = false;
              }
              if($scope.userBooks.length < 1){
                $uibModalInstance.close({
                  message: "closed",
                  deleted: deletedBooks
                });
              }
            }
          })
      }

      $scope.deleteBook = (book) => {
        bookService.deleteBook(book)
        .then((data) => {
          let deletedbookId = data._id;
          deletedBooks.push(deletedbookId);
        })
        .catch((err) => { console.log(err) })
      }

      $scope.close = function(){
        $uibModalInstance.close({
          message: "closed",
          deleted: deletedBooks
        });
      };
    }
})();
