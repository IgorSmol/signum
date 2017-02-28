modul.controller('headerCtl', ['$scope', '$location', '$http', 'toastr', 'sendToServer', 'AuthService', 'API_ENDPOINT', function($scope, $location, $http, toastr, sendToServer, AuthService, API_ENDPOINT){
    var is_super = window.localStorage.getItem('is_superuser');
    var is_mg = window.localStorage.getItem('is_manager');
    if(is_super == 'true'){
      $scope.menuDash = [
        {name:'Signal', link:'/signal'},
        {name:'Client', link:'/client'},
        {name:'Provider', link:'/provider'},
        {name:'Manager', link:'/manager'},
        {name:'Performance', link:'/performance'}
      ];
    }else if(is_mg == 'true'){
      $scope.menuDash = [
        {name:'Signal', link:'/signal'},
        {name:'Client', link:'/client'},
        {name:'Performance', link:'/performance'}
      ];
    }else{
      $scope.menuDash = [
        {name:'Signal', link:'/signal'},
        {name:'Performance', link:'/performance'}
      ];
    }
  
    $scope.dashMenu = function(th){
      $('.mob-menu-btn-dash').toggleClass('open');
      $('.mob-overlay').toggleClass('open');
      $('.mob-menu-wrap').toggleClass('open');
    };

    $scope.landMenu = function(){
      $('.mob-menu-wrap-land').slideToggle();
      return false;
    };
  
    $scope.logout = function(){
      AuthService.logout();
    };

    if(window.localStorage.getItem('TokenKey')){
      $scope.onSuccess = function(data){
        $scope.user = data.data;
        $scope.user.image_file = API_ENDPOINT.url_src + $scope.user.image_file.replace('media/','');
      }
      $scope.onError = function(error){
        toastr.error(error.data.detail, 'Error');
      }
      sendToServer.getData('preference/user/setting/',$scope.onSuccess,$scope.onError);
    }
  
}]);