var modul = angular.module('app', ['ngRoute', 'ngFileUpload', 'ngAnimate', 'toastr']);

modul.controller('mainCtl', ['$scope', '$rootScope', '$location', '$timeout', 'toastr', 'sendToServer', 'API_ENDPOINT', function($scope, $rootScope, $location, $timeout, toastr, sendToServer, API_ENDPOINT){
  
    var currDate = new Date();
    $scope.boolCurrNew = false;
    $scope.currYer = currDate.getFullYear();
    $scope.currMonth = (currDate.getMonth() + 1) < 10 ? '0' + (currDate.getMonth() + 1) : (currDate.getMonth() + 1);
  
    $scope.activeItem = '/signal';
    $scope.stage = true;
    $scope.signalID;
    $scope.editSignal;
    //Providers
    $scope.editProvider;
    $scope.selectListM;
    $scope.selectIDListM;
    //Managers
    $scope.editManager;
    $scope.selectP;
    $scope.selectListP;
    $scope.codeP;
    $scope.permiss = {
      add_user: false,
      change_user: false,
      delete_user: false,
      add_signal: false,
      change_signal: false,
      delete_signal: false,
      close_signal: false,
      upload_history: false,
    };
    //Clients
    $scope.editClient;
    $scope.selectAcType;
  
    $scope.changeActive = function(link){
      $scope.activeItem = link;
    };
  
    $scope.boolCurrNewDest = function(stage){
      $scope.boolCurrNew = stage;
    };
  
    $scope.head_footChang = function(tmp){
      if(tmp == 'land'){
        $scope.stage = true;
        if($scope.header != 'header/header-land.html'){
          $scope.header = 'header/header-land.html';
          $scope.footer = 'footer/footer-land.html'; 
        }
      }else if(tmp == 'dash'){
        $scope.stage = false;
        $scope.activeItem = $location.path();
        if($scope.header != 'header/header-dash.html'){
          $scope.header = 'header/header-dash.html';
          $scope.footer = 'footer/footer-dash.html'; 
        }
        
        angular.element(document).ready(function(){
          $scope.body_h = $('body').height();
          $scope.head_h = $('header').innerHeight();
          $('.content').css('min-height', $scope.body_h - $scope.head_h - 40);
        });
      }else{
        if($scope.header != ''){
          $scope.stage = true;
          $scope.header = $scope.footer = tmp;
        }
      }
      $scope.checkLogin();
    };

    $scope.checkLogin = function(){
      if($location.path() == '/login' || $location.path() == '/registration' || $location.path() == '/forgot-password'){
          if(window.localStorage.getItem('TokenKey')){
            $location.path('/signal');
          }
        }
        if($location.path() == '/signal' || $location.path() == '/client' || $location.path() == '/provider' || $location.path() == '/manager' || $location.path() == '/performance'){
          if(!window.localStorage.getItem('TokenKey')){
            $location.path('/login');
          }
        }
    };
  
    $scope.head_footChang('land');
  
    $scope.modalTamplate = function(tmp){
      $scope.modalContant = '';
      $timeout(function(){
        $scope.modalContant = 'modals/' + tmp + '.html';
      }, 100);
    };
  
    $scope.delItem = function(){
      $scope.destrModal();
      $scope.onSuccess = function(data){
        toastr.success('Delete success!');
      }
      $scope.onError = function(error){
        toastr.error('Delete error!', 'Error');
      }
      sendToServer.delData($rootScope.confirmDelLink,$rootScope.confirmDelID,$scope.onSuccess,$scope.onError);
    };
  
    $scope.destrModal = function(){
      $('#modal').modal('hide');
      $timeout(function(){
        $scope.modalContant = '';  
      }, 500);
    };
  
    $scope.$watch('$location.path()', function(pageURL) {
        if($location.path() == '/' || $location.path() == '/login'
           || $location.path() == '/registration' || $location.path() == '/forgot-password') {
            $('body').addClass('land');
            $scope.stage = true;
        }else{
            $('body').removeClass('land');
            $scope.stage = false;
            $scope.activeItem = $location.path();
        }
        $scope.checkLogin();
    }, true);
  
    $scope.multiSelect = function(list, stage, item, ID, obj, objID){
      if(stage){
        if(list){
          $scope[obj] += ', ' + item;
          $scope[objID] += ',' + ID;
        }else{
          $scope[obj] = item;
          $scope[objID] = ID;
        }
      }else{
        var arr = $scope[obj].split(", ");
        if(arr.length > 1){
          var arrID = $scope[objID].split(",");
        }
        var del = arr.indexOf(item);
        var newList;
        var newListID;
        
        if(del == 0 && arr.length == 2) { 
          $scope[obj] = arr[1];
          $scope[objID] = arrID[1];
        }
        else if(del == 0 && arr.length == 1) { 
          $scope[obj] = '';
          $scope[objID] = '';
        }
        else{ 
          for(var i=0;i<arr.length;i++){
            if(i == del) {continue;}
            else{
              if(newList){
                newList += ', ' + arr[i];
                newListID += ',' + arrID[i];
              }else{
                newList = arr[i];
                newListID = arrID[i];
              }
            }
          }
          
          $scope[obj] = newList;
          $scope[objID] = newListID;
        }
        
      }
    };
  
    $scope.getDataProvider = function(data, dataList){
      $scope.editProvider = data;
      $scope.selectListM = data.managers[0].first_name;
      $scope.selectIDListM = "" + data.managers[0].id;
      for(var i=1;i<dataList.length;i++){
        $scope.selectListM += ', ' + data.managers[i].first_name;
        $scope.selectIDListM += ',' + data.managers[i].id;
      }
    }; 
  
    $scope.getDataManager = function(data, dataList, provider){
      $scope.editManager = data;
      $scope.selectListP = dataList;
      $scope.selectP = provider.provider_name;
      $scope.codeP = provider.provider_code;
      
      for(var key in data.relative_permissions){
        var toCheck = data.relative_permissions[key];
        $scope.permiss[toCheck] = true;
      }
    };
  
    $scope.getDataClient = function(data, dataList, provider){
      $scope.editClient = data;
      $scope.selectListP = dataList;
      $scope.selectAcType = data.user_type;
      if(provider){
        $scope.selectP = provider.provider_name;
        $scope.codeP = provider.provider_code;
      }else{
        $scope.selectP = "Providers";
      }
    }; 
  
    $scope.getDataSignal = function(data){
      $scope.signalID = data.id;
      $scope.editSignal = data;
    };
  
    $scope.newCurrDate = function(month, year){
      $scope.boolCurrNew = true;
      var monthList = {
        January: "01",
        February: "02",
        March: "03",
        April: "04",
        May: "05",
        June: "06",
        July: "07",
        August: "08",
        September: "09",
        October: "10",
        November: "11",
        December: "12"
      };
      $scope.currYer = year;
      $scope.currMonth = monthList[month];
      $scope.changeActive('/signal');
      $location.path("/signal");
    };
  
}])

.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
    .when("/", {
        templateUrl : "landing/landing.html",
        controller: "landingCtl"
    })
    .when("/login", {
        templateUrl : "login/login.html",
        controller: "loginCtl"
    })
    .when("/registration", {
        templateUrl : "login/registr.html",
        controller: "registrCtl"
    })
    .when("/forgot-password", {
        templateUrl : "login/forgot.html",
        controller: "forgotCtl"
    })
    .when("/signal", {
        templateUrl : "signal/signal.html",
        controller: "signalCtl"
    })
    .when("/client", {
        templateUrl : "client/client.html",
        controller: "clientCtl"
    })
    .when("/provider", {
        templateUrl : "provider/provider.html",
        controller: "providerCtl"
    })
    .when("/manager", {
        templateUrl : "manager/manager.html",
        controller: "managerCtl"
    })
    .when("/performance", {
        templateUrl : "performance/performance.html",
        controller: "performanceCtl"
    })
    .otherwise({
        templateUrl : "index.html"
    });
}]);
