(function(){

  angular.module('app')
  .service('modalService', ['$uibModal', modalService])

    function modalService($uibModal){

      this.openViewProjectsModal = (user, userBooks) => {
        return $uibModal.open({
          animation: true,
          templateUrl: '/app/shared/modals/view-projects-modal/viewProjectsModal.html',
          controller: 'viewProjectModalCtrl',
          resolve: {
            user: function() { return user },
            userBooks: function() { return userBooks }
          }
        })
      }

      this.openDeleteBookModal = (userBooks, index) => {
        return $uibModal.open({
          animation: true,
          size: 'sm',
          templateUrl: '/app/shared/modals/delete-book-modal/deleteBookModal.html',
          controller: 'deleteBookModalCtrl',
          resolve:{
            userBooks: function(){ return userBooks },
            index: function(){ return index }
          }
        })
      }

      this.openNewProjectModal = (user) => {
        return $uibModal.open({
          animation: true,
          templateUrl: '/app/shared/modals/new-project-modal/newProjectModal.html',
          controller: 'newProjectModalCtrl'
        })
      }

      this.openReviewModal =() => {
        return $uibModal.open({
          animation: true,
          templateUrl: '/app/shared/modals/review-modal/reviewModal.html',
          controller: 'reviewModalCtrl'
        })
      }

      this.openAlertModal = (modalController, alertTitle, alertBody, cancelBtnCol, cancelBtnTxt, confirmBtnCol, confirmBtnTxt) => {
        return $uibModal.open({
          animation: true,
          size: 'sm',
          template: `<div class="modal-header">
                          <h3>${alertTitle}</h3>
                        </div>
                        <div class="modal-body">
                          <p>${alertBody}</p>
                        </div>
                        <div class="modal-footer">
                          <button class="btn btn-${cancelBtnCol}" ng-click="cancel()">${cancelBtnTxt}</button>
                          <button class="btn btn-${confirmBtnCol}" ng-click="confirm()">${confirmBtnTxt}</button>
                        </div>`,
          controller: `${modalController}`
        })
      }

      this.openPrintsModal = (user) => {
          return $uibModal.open({
            animation: true,
            size: "lg",
            templateUrl: '/app/shared/modals/prints-modal/printsModal.html',
            controller: 'printsModalCtrl',
            resolve:{
              user: function() { return user },
            }
          })
      }

    }
})()