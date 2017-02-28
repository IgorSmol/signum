modul.controller('performanceCtl', ['$scope', '$location', 'toastr', 'sendToServer', function($scope, $location, toastr, sendToServer){
  
    $scope.head_footChang('dash');
    var currDate = new Date();
    var currYer = currDate.getFullYear();
    $scope.currYer = currYer;
    $scope.yearArr = [];
    
    for(var i=2014, j=0;i<=currYer;i++){
      $scope.yearArr[j] = i;
      j++;
    };
  
    $scope.changeYear = function(data){
      $scope.currYer = data;
      
      $scope.onSuccessN = function(data){
        $scope.signals = data.data.signals;
      }
      $scope.onErrorN = function(error){
        toastr.error('Load signals error!', 'Error');
      }
      sendToServer.getData('signal/' + $scope.currYer + '/performance/',$scope.onSuccessN,$scope.onErrorN);
    };
  
    $scope.onSuccess = function(data){
      $scope.signals = data.data.signals;
    }
    $scope.onError = function(error){
      toastr.error('Load signals error!', 'Error');
    }
    sendToServer.getData('signal/' + $scope.currYer + '/performance/',$scope.onSuccess,$scope.onError);
  
}]);