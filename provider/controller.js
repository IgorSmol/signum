modul.controller('providerCtl', ['$scope', '$location', 'toastr', 'sendToServer', function($scope, $location, toastr, sendToServer){
  
    $scope.head_footChang('dash');
    $scope.providers;
    $scope.propertyName = 'id';
    $scope.reverse = false;
  
    $scope.sortBy = function(propertyName) {
      $scope.propertyName = propertyName;
    };
    
    $scope.onSuccess = function(data){
      $scope.providers = data.data;
    }
    $scope.onError = function(error){
      toastr.error('Load provider error!', 'Error');
    }
    sendToServer.getData('provider/list/',$scope.onSuccess,$scope.onError);
  
    $scope.deleteAll = function(stage){
      var toSend = {
        ids: ''
      }
      
      $('.table-provider input[type=checkbox]:checked').each(function(index) {
        $(this).parent().parent().parent().hide();
        if(index == 0){
          toSend.ids = $(this).attr('data-checkID');
        }else{
          toSend.ids += ',' + $(this).attr('data-checkID');
        }
      });
      
      if(stage || toSend.ids){
        $scope.onSuccess = function(data){
          toastr.success(data.data.detail);
        }
        $scope.onError = function(error){
          toastr.error(error.data.detail, 'Error');
        }
        
        sendToServer.postData('provider/package/delete/',toSend,$scope.onSuccess,$scope.onError);
      }
    };
  
    $scope.delProvider = function(id, e){
      var sendLink = 'provider/' + id + '/delete/';
      
      $scope.onSuccess = function(data){
        toastr.success('Deleted!');
      }
      $scope.onError = function(error){
        toastr.error(error.data.detail, 'Error');
      }
      sendToServer.delData(sendLink,id,$scope.onSuccess,$scope.onError);
    };
}]);