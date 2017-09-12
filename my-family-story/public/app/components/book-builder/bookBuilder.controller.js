(function(){
   angular
    .module('app')
    .controller('bookBuilderController', ['$scope', '$state', '$uibModal', '$timeout', 'user', 'bookService', 'modalService', 'CartService', bookBuilderController]);

      function bookBuilderController($scope, $state, $uibModal, $timeout, user, bookService, modalService, CartService){

        $scope.saved = false;
        $scope.userBooks;
        $scope.user = user;

        $scope.getActiveOrder = () => {
          CartService.getActiveOrder(user._id)
          .then((res) => { $scope.activeOrder = res })
        }
        $scope.getActiveOrder();

        let resetPages = () => {
          $scope.pages = [];
        }

        $scope.getUserBooks = () => {
          bookService.getUserBooks(user._id)
          .then((res) => { $scope.userBooks = res })
        }

        $scope.createNewBook = (title, img, user) => {
          if($scope.userBooks.length === 0 && !title){
            $scope.openAlertModal();
          } else {
            resetPages();
            $scope.addNewPage();
            let book = {
              title: title,
              title_img: img,
              user: user,
              pages: $scope.pages
            }
            bookService.createNewBook(book)
            .then((res) => {
              $scope.currentBook = res.data;
              $scope.fillBookInfo($scope.currentBook);
              $scope.getUserBooks();
            })
            .catch((err) => { console.log("Book creation failed!", err) })
          }
        }

        $scope.initialLoad = () => {
          bookService.getUserBooks(user._id)
          .then((res) => {
            $scope.userBooks = res;
            if($scope.userBooks.length > 0){
              $scope.fillBookInfo($scope.userBooks[$scope.userBooks.length - 1])
            } else {
              //Provide HTML for new project
            }
          })
          .catch((err) => { console.log(err) })
        }
        $scope.initialLoad();

        $scope.fillBookInfo = (book) => {
          resetPages();
          $scope.currentBook = book;
          for(var i of book.pages){
            $scope.fillPage(i);
          }
        }

        $scope.fillPage = (i) => {
          $scope.pages.push(
            {
              text: i.text,
              page_type: i.page_type,
              activity_type: i.activity_type,
              custom_activity: i.custom_activity,
              image_url: i.image_url,
              edit_allowed: i.edit_allowed,
              page_number: i.page_number
            }
          );
        }

        $scope.addNewPage = () => {
          $scope.pages.push(
            {
              text: "",
              page_type: "Basic",
              activity_type: "",
              custom_activity: "",
              image_url: "",
              edit_allowed: false,
              page_number: $scope.pages.length + 1
            }
          )
          $scope.saved = false;
        }

        let updatePageNums = (arr) => {
          for(var i=0; i<arr.length; i++){
            arr[i].page_number = i+1;
          }
        }

        $scope.removePage = (i) => {
          if($scope.pages.length > 1){
            $timeout(() => {
              $scope.pages.splice(i, 1);
              updatePageNums($scope.pages);
            }, 250)
          }
          $scope.saved = false;
        }

        $scope.saveBook = () => {
          $scope.currentBook.pages = $scope.pages;
          bookService.saveBook($scope.currentBook)
          .then((res) => {
            $scope.saved = true;
          })
        }
        $scope.openViewProjectsModal = () => {
          let m = modalService.openViewProjectsModal(user, $scope.userBooks)
          m.result.then((data) => {

            $scope.getUserBooks();
            if(data.message == "closed"){
              if($scope.userBooks < 1){
                resetPages();
                $scope.currentBook.title = "";
              } else {
                for(var i of data.deleted){
                  if($scope.currentBook._id === i){
                    $scope.fillBookInfo($scope.userBooks[$scope.userBooks.length -1]);
                    break;
                  }
                }
              }
            } else {
              $scope.fillBookInfo(data);
            }
          })
        }

        $scope.openNewProjectModal = () => {
          let m = modalService.openNewProjectModal()
          m.result.then((data) => {
            if(data !== "close"){
              $scope.createNewBook(data.title, data.title_img, user._id);
              $scope.getUserBooks();
            }
          })
        }

        $scope.openReviewModal = () => {
          let m = modalService.openReviewModal()
        }

        $scope.openAlertModal = () => {
          let modalInstance = $uibModal.open({
            animation: true,
            size: 'sm',
            templateUrl: '/app/components/book-builder/project-view-modal/open-alert-modal/alertModal.html',
            controller: 'alertModalCtrl'
          })
        }

        $scope.selectPrints = () => {
          let m = modalService.openPrintsModal()
          m.result.then((data) => {
            if(data !== 'cancel'){
              $scope.currentBook.print_qty = data;
              $scope.saveBook();
              $scope.saveToOrder($scope.currentBook, user);
            }
          })
        }

        $scope.saveToOrder = (book, user) => {
          if(!$scope.activeOrder._id){
            CartService.createNewOrder(book._id, user._id)
            .then((res) => {
              $state.go('cart');
            })
          } else {
            let bookArray = $scope.activeOrder.books;
            // Check for duplicates and replace if duplicate
            for(var i in bookArray){
              if(book._id == bookArray[i]){
                bookArray.splice(i, 1);
              }
            }
            bookArray.push(book._id)
            CartService.addBookToOrder($scope.activeOrder._id, bookArray)
            .then((res) => {
              $state.go('cart');
            })
            .catch((err) => {
              console.log(err);
            })
          }
        }
      }
})();
