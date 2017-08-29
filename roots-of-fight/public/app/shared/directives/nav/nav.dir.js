angular.module('app').directive('navDir', function(){
  return {
    restrict: '',
    templateUrl: './app/shared/directives/nav/nav.html',
    controller: 'navCtrl',
    link: function (scope, elem, attr){
      var token;
      if(localStorage.length >= 1){
        token = true;
      } else{
        token = false;
      }
      var listChecker;

      $('.main-account-account').on('click', function(){
        if(token === false){
          // $(this).css("display", "none");
          $(".main-account-nav").css("display", "none");
          $("#login-signup").css("display", "flex");
        }
        if(token === true){
          $("#view-account-logout").css("display", "flex");
          $(".main-account-nav").css("display", "none");
        }
      })
      $(".main-account-search").on("click", function(){
        $(".main-account-nav").css("display", "none");
        $(".main-account-search-input").css("display", "flex");
      })
      $("#nav-search-x").on("click", function(){
        $(".main-account-nav").css("display", "inline");
        $(".main-account-search-input").css("display", "none");
      })

      $("#nav-account-x").on("click", function(){
        $(".main-account-nav").css("display", "inline");
        $(".main-account-login").css("display", "none");
      })
      $("#nav-account-xx").on("click", function(){
        $(".main-account-nav").css("display", "inline");
        $(".main-account-login").css("display", "none");
      })

      $('.web-li').on('click', function(){
        var list = scope.menuList;
        if(list === undefined || listChecker === list){
          $('.web-li-dropdown').css('height', '0');
          listChecker = [];
        }
        else{
          $('.web-li-dropdown').css('height', '30' * scope.menuList.length + 'px');
          listChecker = scope.menuList;
        }
      })
      // mobile-collection-dropdown
      $("#nav-collections-ham-container").on("click", function(){

        $("#nav-collections-ham-container").toggleClass("anime");

        if($(".mobile-collection-div").height() == "0"){
          $(".mobile-collection-div").css("height", "auto");
          $(".mobile-collection-div").css("display", "flex");
        } else {
          $(".mobile-collection-div").css("height", "0");
          $(".mobile-collection-div").css("display", "none");

        }

      })
      $(window).resize(function(){
        if($(this).width() > 768){
          $(".mobile-collection-div").css("height", "0");
          $("#nav-collections-ham-container").removeClass("anime");
        }

      })

      $("#searchlogo-mobile").on("click", function(){
        $(".responsive-li").css("display", "none");
        $(".responsive-li-search").css("display", "inline-block");
      })
      $("#account-x-mobile-search").on("click", function(){
        $(".responsive-li").css("display", "inline-block");
        $(".responsive-li-search").css("display", "none");

      })
      $(window).resize(function(){
        if($(this).width() > 768){
          $(".responsive-li").css("display", "none");
          $(".responsive-li-search").css("display", "none");
        }
        if($(this).width() <= 767){
          $(".responsive-li").css("display", "inline-block");
          $(".responsive-li-search").css("display", "none");

        }

      })
    }
  }
})
