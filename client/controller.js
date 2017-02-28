modul.controller('clientCtl', ['$scope', '$location', 'toastr', 'sendToServer', 'USER_ROLES', function($scope, $location, toastr, sendToServer, USER_ROLES){
  
    $scope.head_footChang('dash');
    $scope.is_super = window.localStorage.getItem('is_superuser');
    $scope.clients;
    $scope.userType = USER_ROLES;
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
      $('.table-clients .check-id:checked').each(function(index) {
        ID = $(this).attr('data-checkID');
        count++;
      });
      
      if(count > 1){
        toastr.error('Select no more than one client', 'Error');
      }else{
        if($scope.codeP && count){
          var data = {
            provider_code: $scope.codeP
          }

          $scope.onSuccessC = function(data){
            toastr.success('Move to provider success!');
          }
          $scope.onErrorC = function(error){
            toastr.error('Move to provider error!', 'Error');
          }
          sendToServer.putData('client/'+ID+'/move/',data,$scope.onSuccessC,$scope.onErrorC);
        }else{
           toastr.error('Select provider and client!', 'Error');
        }
        
      }
    };

    $scope.deleteAll = function(stage){
      var toSend = {
        ids: ''
      }
      
      $('.table-clients .check-id:checked').each(function(index) {
        $(this).parent().parent().parent().hide();
        if(index == 0){
          toSend.ids = $(this).attr('data-checkID');
        }else{
          toSend.ids += ',' + $(this).attr('data-checkID');
        }
      });
      
      if(stage || toSend.ids){
        $scope.onSuccess = function(data){
          toastr.success('Clients deleted!');
        }
        $scope.onError = function(error){
          toastr.error(error.data.detail, 'Error');
        }
        
        sendToServer.postData('client/package/delete/',toSend,$scope.onSuccess,$scope.onError);
      }
    };
  
    $scope.delClient = function(id, e){
      var sendLink = 'client/' + id + '/delete/';
      $scope.onSuccess = function(data){
        $(e.target).parent().parent().parent().hide();
      }
      $scope.onError = function(error){
        toastr.error(error.data.detail, 'Error');
      }
      sendToServer.delData(sendLink,id,$scope.onSuccess,$scope.onError);
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
  
    $scope.onSuccess = function(data){
      $scope.clients = data.data;
    }
    $scope.onError = function(error){
      toastr.error(error.data.detail, 'Error');
    }
    sendToServer.getData('client/list/',$scope.onSuccess,$scope.onError);
  
    if($scope.is_super == 'true'){
      $scope.onSuccessP = function(data){
        $scope.selectListP = data.data;
      }
      $scope.onErrorP = function(error){
        toastr.error(error.data.detail, 'Error');
      }
      sendToServer.getData('manager/list/all/provider/',$scope.onSuccessP,$scope.onErrorP);
    }
    
}]);