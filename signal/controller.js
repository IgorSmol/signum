modul.controller('signalCtl', ['$scope', '$rootScope', '$location', '$http', 'toastr', 'sendToServer', 'API_ENDPOINT', 'SIGNAL_STATUS', 'SIGNAL_STATUS_U', function($scope, $rootScope, $location, $http, toastr, sendToServer, API_ENDPOINT, SIGNAL_STATUS, SIGNAL_STATUS_U){
  
    $scope.head_footChang('dash');
    if(window.localStorage.getItem('is_manager')=='true' || window.localStorage.getItem('is_superuser')=='true'){
      $scope.is_extend = false;
    }else{
      $scope.is_extend = true;
    }
    $scope.signalType = SIGNAL_STATUS;
    $scope.signalTypeU = SIGNAL_STATUS_U;
    $rootScope.signals;
    $scope.isChecked = false;
    $scope.propertyName = 'id';
    $scope.reverse = false;
  
    $scope.sortBy = function(propertyName) {
      $scope.propertyName = propertyName;
    };
    
    if($scope.boolCurrNew){
      $scope.signalLink = $scope.currYer + '/' + $scope.currMonth;
    }else{
      var currDate = new Date();
      $scope.currYer = currDate.getFullYear();
      $scope.currMonth = (currDate.getMonth() + 1) < 10 ? '0' + (currDate.getMonth() + 1) : (currDate.getMonth() + 1);
      $scope.signalLink = $scope.currYer + '/' + $scope.currMonth;  
    }
  
    $scope.deleteAll = function(stage){
      var toSend = {
        ids: ''
      };
      var ids = [],
          i = 0,
          count2 = 0;
      var oneTime = [];
      
      $('.table-signals input.check-id:checked').each(function(index) {
        ids[i++] = $(this).attr('data-checkID');
        if(index == 0){
          toSend.ids = $(this).attr('data-checkID');
        }else{
          toSend.ids += ',' + $(this).attr('data-checkID');
        }
      });
      var count = ids.length-1;
      for(var j=0;j<$rootScope.signals.length;j++){
        if($rootScope.signals[j].id == ids[count]) {
          count--;
        }else{
          oneTime[count2++] = $rootScope.signals[j];
        }
      }
      $rootScope.signals = oneTime;
      
      if(stage || toSend.ids){
        $scope.onErrorD = function(error){
          toastr.error('Signals deleted error!', 'Error');
        }
        
        sendToServer.postData('signal/' + $scope.signalLink + '/package/delete/',toSend,$scope.onSuccessD,$scope.onErrorD);
      }
    };
  
    $scope.onSuccess = function(data){
      $rootScope.signals = data.data.signals;
    }
    $scope.onError = function(error){
      toastr.error('Load signals error!', 'Error');
    }
    sendToServer.getData('signal/' + $scope.signalLink + '/history/',$scope.onSuccess,$scope.onError);
  
}]);