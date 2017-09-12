(function(){
   angular
    .module('app')
    .controller('projectModalController', ['$scope', '$http', 'user', 'userBooks', 'bookService', '$uibModal', '$uibModalInstance', projectModalController]);

    function projectModalController($scope, $http, user, userBooks, bookService, $uibModal, $uibModalInstance){

      $scope.userBooks = userBooks;
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
          let modalInstance = $uibModal.open({
            animation: true,
            size: 'sm',
            templateUrl: '/app/components/book-builder/project-view-modal/delete-book-modal/deleteBookModal.html',
            controller: 'deleteBookModalController',
            resolve:{
              userBooks: function(){ return $scope.userBooks },
              index: function(){ return index }
            }
          })
          modalInstance.result.then((res) => {
            $scope.deletedIndex = index;
            if(res === 'delete'){
              $scope.deleteBook(userBooks[index]);
              $scope.userBooks.splice(index, 1);
              if($scope.userBooks.length < 3){
                $scope.checkBookLength = true;
              }
              if($scope.userBooks.length >= 3){
                $scope.checkBookLength = false;
              }
            }
          })
      }

      $scope.openAlertModal = () => {
        let modalInstance = $uibModal.open({
          animation: true,
          size: 'sm',
          templateUrl: '/app/components/book-builder/project-view-modal/open-alert-modal/alertModal.html',
          controller: 'alertModalCtrl'
        })
      }

      $scope.deleteBook = (book) => {
        bookService.deleteBook(book)
        .then((res) => {
          return res
        })
        .catch((err) => {console.log(err)})
      }

      $scope.createNewBook = () => {
        if(!$scope.newBookTitle){
          $scope.openAlertModal();
        } else {
          let book = {
            title: $scope.newBookTitle,
            title_img: $scope.titleImg,
            user: user._id,
          }
          $uibModalInstance.close(book);
        }
      }

      $scope.close = function(){
        $uibModalInstance.close('close');
      };
    }
})();
