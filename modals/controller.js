modul.controller('modalCtl', ['$scope', '$rootScope', '$location', '$http', '$timeout', 'toastr', 'sendToServer', 'API_ENDPOINT', 'USER_ROLES', 'SIGNAL_STATUS', function($scope, $rootScope, $location, $http, $timeout, toastr, sendToServer, API_ENDPOINT, USER_ROLES, SIGNAL_STATUS){
  
    $scope.userType = USER_ROLES;
    $scope.signalType = SIGNAL_STATUS;
    $scope.selectData;
    angular.element(document).ready(function(){
      if($('.datepicker').length > 0){
        $('.datepicker').datepicker({
            showOn: "button",
            buttonImage: "img/date-select.png",
            buttonImageOnly: true,
            buttonText: "Select date",
            onSelect: function(dateText, inst) { 
              var dt = new Date();
              var index;
              var date = $(this).datepicker('getDate'),
                  day  = date.getDate(),  
                  month = date.getMonth() + 1,              
                  year =  date.getFullYear();
              month = month < 10 ? '0' + month : month;
              day = day < 10 ? '0' + day : day;
              $(this).siblings('.time').text(dateText + ' | ' + dt.getHours() + ':' + dt.getMinutes());
              $scope.selectData = year + '-' + month + '-' + day + 'T' + dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds() + 'Z';
            }
        });
        $('.datepicker').datepicker('option', 'dateFormat', "d.mm.yy");
      }
    });
  
    $scope.mewSignal = function(data){
      $('#modal').modal('hide');
      $scope.onSuccessS = function(data){
        toastr.success('Signal create!');
        $rootScope.signals[$rootScope.signals.length] = data.data.signals;
      }
      $scope.onErrorS = function(error){
        toastr.error('Create error', 'Error');
      }
      sendToServer.postData('signal/create/',data,$scope.onSuccessS,$scope.onErrorS);
    };
  
    $scope.updateMsg = function(msg, id){
      $('#modal').modal('hide');
      var data = {
        comment: msg
      };
      $scope.onSuccess = function(data){
        toastr.success('Signal update!');
      }
      $scope.onErrorP = function(error){
        toastr.error('Updatae error!', 'Error');
      }
      sendToServer.putData('signal/' + id + '/update/',data,$scope.onSuccess,$scope.onError);
    };
  
    $scope.closeSignal = function(data){
      $('#modal').modal('hide');
      if(data){
        if(data.profit_pips && data.close_rate){
          
          $scope.onSuccessS = function(data){
            toastr.success('Signal closed!');
          }
          $scope.onErrorS = function(error){
            toastr.error('Closed error!', 'Error');
          }
          sendToServer.putData('signal/' + $scope.signalID + '/close/',data,$scope.onSuccessS,$scope.onErrorS);
          
        }else{
          toastr.error('Fill all fields!', 'Error');
        }
      }else{
        toastr.error('Fill all fields!', 'Error');
      }
    };
  
    $scope.editSignalSend = function(data){
      $('#modal').modal('hide');
      $scope.onSuccess = function(data){
        toastr.success('Signal update!');
      }
      $scope.onErrorP = function(error){
        toastr.error('Updatae error!', 'Error');
      }
      sendToServer.putData('signal/' + data.id + '/update/',data,$scope.onSuccess,$scope.onError);
    };
  
    $scope.selectedP = function(e, c){
      $scope.selectP = e;
      $scope.codeP = c;
    };
  
    $scope.selectAccountType = function(t){
      $scope.selectAcType = t;
    };
  
    $scope.updateClient = function(){
      $('#modal').modal('hide');
      var data = {
        provider_code: $scope.codeP,
        user_type: $scope.selectAcType,
        date_signal_receive_to: $scope.selectData
      }

      $scope.onSuccess = function(data){
        toastr.success('Client update!');
      }
      $scope.onErrorP = function(error){
        toastr.error('Updatae error!', 'Error');
      }
      sendToServer.putData('client/'+$scope.editClient.id+'/update/',data,$scope.onSuccess,$scope.onError);
    };
  
    $scope.updateManager = function(){
      $('#modal').modal('hide');
      var data = {
        provider_code: $scope.codeP,
        permissions: ''
      }
      var count = 0;
      
      for(var key in $scope.permiss){
        if($scope.permiss[key]){
          if(count == 0) {
            data.permissions = key;
          }else{
            data.permissions += ',' + key;
          }
          count++;
        }
      } 

      $scope.onSuccess = function(data){
        toastr.success('Manager update!');
      }
      $scope.onErrorP = function(error){
        toastr.error('Updatae error!', 'Error');
      }
      sendToServer.putData('manager/'+$scope.editManager.id+'/update/',data,$scope.onSuccess,$scope.onError);
    };
  
}])
.controller('preferenceCtl', ['$scope', '$location', '$http', 'toastr', 'sendToServer', 'API_ENDPOINT', 'Upload', function($scope, $location, $http, toastr, sendToServer, API_ENDPOINT, Upload){
    
    $scope.user;
    $scope.mLink = API_ENDPOINT.url_src;
  
    $scope.updateUser = function(data, pass){
      $('#modal').modal('hide');
      delete data.image_file;
      if(pass){
        if(pass.new && pass.conf && (pass.new == pass.conf)){
          data.new_password = pass.new;
          data.confirm_password = pass.conf;
        }
      }
      
      $scope.onSuccessPref = function(data){
        toastr.success('User update!');
      }
      $scope.onErrorPref = function(error){
        toastr.error(error.data.detail, 'Error');
      }
      sendToServer.putData('preference/user/setting/',data,$scope.onSuccessPref,$scope.onErrorPref);
    };
  
    $scope.onSuccess = function(data){
      $scope.user = data.data;
      $scope.user.image_file = $scope.user.image_file.replace('media/','');
    }
    $scope.onError = function(error){
      toastr.error(error.data.detail, 'Error');
    }
    sendToServer.getData('preference/user/setting/',$scope.onSuccess,$scope.onError);
  
    //$scope.upload = function () {
    $scope.upload = function (file, data) {
      $('#modal').modal('hide');
      /*data.image_file = file;
      console.log(data);
      Upload.upload({
      		method: 'PUT',
            url: API_ENDPOINT.url + 'preference/user/setting/',
            data
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        });*/
      var fd = new FormData();
      angular.forEach($scope.files, function(file){
        fd.append('file', file);
      });
      console.log($scope.files);
      var request = $http({
          method: 'PUT',
          url: API_ENDPOINT.url + 'preference/user/setting/',
          data: {
            image_file: fd
          },
          transformRequest:angular.identity,
          headers:{'Content-Type':undefined}
      });
      request.then(function(res){
        toastr.success('User update!');
      },function(err){
        toastr.error(err.data.detail, 'Error');
      });
    };
  
}])
.controller('newProviderCtl', ['$scope', '$location', '$http', 'toastr', 'sendToServer', 'API_ENDPOINT', function($scope, $location, $http, toastr, sendToServer, API_ENDPOINT){
  
    $scope.uploadme;
    $scope.selectList;
    $scope.selectIDList;
    $scope.provider_code;
  
    $scope.onSuccess = function(data){
      $scope.managers = data.data;
    }
    $scope.onError = function(error){
      toastr.error(error.data.detail, 'Error');
    }
    sendToServer.getData('manager/list/',$scope.onSuccess,$scope.onError);
  
    $scope.codeGen = function(){
      var str = '';
      
      for(var i=1;i<=3;i++){
        for(var j=1;j<=5;j++){
          var rand = Math.floor( Math.random() * 62 );
          var charCode = rand+= rand>9? (rand<36?55:61) : 48;
          str += String.fromCharCode(charCode).toUpperCase(); 
        }
        if(i == 3) break;
        str += '-';
      }
      
      $scope.provider_code = str;
    };
  
    $scope.newProvider = function(data){
      $('#modal').modal('hide');
      data.managers = $scope.selectIDList;
      data.provider_code = $scope.provider_code;
      
      $scope.onSuccess = function(data){
        toastr.success('Provider created!');
      }
      $scope.onError = function(error){
        toastr.error(error.data.detail, 'Error');
      }
      sendToServer.postData('provider/create/',data,$scope.onSuccess,$scope.onError);
    };
  
}])
.controller('editProviderCtl', ['$scope', '$location', '$http', 'toastr', 'sendToServer', 'API_ENDPOINT', function($scope, $location, $http, toastr, sendToServer, API_ENDPOINT){
  
    $scope.sendEditProvider = function(data){
      $('#modal').modal('hide');
      var link = 'provider/' + data.id + '/update/';
      //var ids = $scope.selectIDListM.split(',');
      console.log(data);
      //var convertArr = {};
      var sendData = {
        provider_name: data.provider_name,
        provider_code: data.provider_code,
        premium_price: data.premium_price,
        standard_price: data.standard_price,
        managers: $scope.selectIDListM
      };
      /*for(var key in data.managers){
        convertArr[data.managers[key].id] = false;
      }
      for(var id=0;id<ids.length;id++){
        convertArr[ids[id]] = true;
      }
      for(var key in convertArr){
        if(convertArr[key]){
          sendData.managers[key] = convertArr[key];
        }
      }*/
      
      $scope.onSuccess = function(data){
        toastr.success('Provider update!');
      }
      $scope.onError = function(error){
        toastr.error(error.data.detail, 'Error');
      }
      sendToServer.putData(link,sendData,$scope.onSuccess,$scope.onError);
    };
  
}]);