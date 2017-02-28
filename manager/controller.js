modul.controller('managerCtl', ['$scope', '$rootScope', '$location', 'toastr', 'sendToServer', function($scope, $rootScope, $location, toastr, sendToServer){
  
    $scope.head_footChang('dash');
    $scope.managers;
    $scope.selectListP;
    $scope.selectP = 'Provider';
    $scope.codeP;
    $scope.propertyName = 'id';
    $scope.reverse = false;
  
    $scope.sortBy = function(propertyName) {
      $scope.propertyName = propertyName;
    };
  
    $scope.selectedP = function(e, c){
      $scope.selectP = e;
      $scope.codeP = c;
    };
  
    $scope.moveToProvider = function(){
      var count = 0;
      var ID;
      $('.table-maneger .check-id:checked').each(function(index) {
        ID = $(this).attr('data-checkID');
        count++;
      });
      
      if(count > 1){
        toastr.error('Select no more than one manager', 'Error');
      }else{
        if($scope.codeP && count){
          var data = {
            provider_code: $scope.codeP
          }
          
          $scope.onSuccess = function(data){
            toastr.success('Move to provider success!');
          }
          $scope.onErrorP = function(error){
            toastr.error('Move to provider error!', 'Error');
          }
          sendToServer.putData('manager/'+ID+'/move/',data,$scope.onSuccess,$scope.onError);
        }else{
          toastr.error('Select provider and manager!', 'Error');
        }
        
      }
    };
    
    $scope.onSuccess = function(data){
      $scope.managers = data.data;
    }
    $scope.onError = function(error){
      toastr.error('Load managers error!', 'Error');
    }
    sendToServer.getData('manager/list/',$scope.onSuccess,$scope.onError);
  
    $scope.onSuccessP = function(data){
      $scope.selectListP = data.data;
    }
    $scope.onErrorP = function(error){
      toastr.error('Load providers error!', 'Error');
    }
    sendToServer.getData('manager/list/all/provider/',$scope.onSuccessP,$scope.onErrorP);
  
    $scope.deleteAll = function(stage){
      var toSend = {
        ids: ''
      }
      
      $('.table-maneger .check-id:checked').each(function(index) {
        $(this).parent().parent().parent().hide();
        if(index == 0){
          toSend.ids = $(this).attr('data-checkID');
        }else{
          toSend.ids += ',' + $(this).attr('data-checkID');
        }
      });
      
      if(stage || toSend.ids){
        $scope.onError = function(error){
          toastr.error('Delete managers error!', 'Error');
        }
        
        sendToServer.postData('manager/package/delete/',toSend,$scope.onSuccess,$scope.onError);
      }
    };
  
    $scope.delManager = function(id, e){
      var sendLink = 'manager/' + id + '/delete/';
      
      $rootScope.confirmDelLink = sendLink;
      $rootScope.confirmDelID = id;
      $scope.modalTamplate('alert');
      $('#modal').modal('show');
      
      /*$scope.onSuccess = function(data){
        $(e.target).parent().parent().hide();
      }
      $scope.onError = function(error){
        toastr.error('Delete managers error!', 'Error');
      }
      sendToServer.delData(sendLink,id,$scope.onSuccess,$scope.onError);*/
    };
  
    $scope.sendExtend = function($event, ID){
      var checkbox = $event.target;
      var data = {
        is_extend: checkbox.checked
      };
      
      $scope.onErrorE = function(error){
        toastr.error('Extend error!', 'Error');
      }

      sendToServer.putData('account/'+ID+'/extend/',data,$scope.onSuccessE,$scope.onErrorE);
    };
  
}]);