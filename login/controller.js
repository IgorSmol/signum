modul.controller('loginCtl', ['$scope', '$location', '$http', 'sendToServer', 'AuthService', 'API_ENDPOINT', function($scope, $location, $http, sendToServer, AuthService, API_ENDPOINT){
  
    $scope.head_footChang();
    $scope.loginStage = false;
    $scope.passStage = false;
  
    $scope.login = function(user){
      if(user){
        if(user.username && user.password){
          AuthService.login(user);
        }else{
          if(!user.username){
            $scope.loginStage = true;
          }else{
            $scope.loginStage = false;
          }
          if(!user.password){
            $scope.passStage = true;
          }else{
            $scope.passStage = false;
          }
        }
      }else{
        $scope.loginStage = true;
        $scope.passStage = true;
      }
      
    };
  
}])

.controller('registrCtl', ['$scope', '$location', 'toastr', 'sendToServer', 'API_ENDPOINT', '$http', function($scope, $location, toastr, sendToServer, API_ENDPOINT, $http){
  
    $scope.head_footChang();
    $scope.radio = true;
    $scope.userStagePass = false;
    $scope.userStagePassM = false;
  
    $scope.signup = function(user, manager, valid) {
      if(user){
        var valid_form;
        if(manager){
          if(valid.fNameM.$viewValue && valid.lNameM.$viewValue
            && valid.phoneM.$viewValue && valid.emailM.$viewValue
            && valid.countryM.$viewValue){
            valid_form = true;
          }else{
            valid_form = false;
          }
        }else{
          if(valid.fName.$viewValue && valid.lName.$viewValue
            && valid.phone.$viewValue && valid.email.$viewValue
            && valid.country.$viewValue){
            valid_form = true;
          }else{
            valid_form = false;
          }
        }
        if(valid_form){
          var data = {
            username: user.email, 
            password: user.pass, 
            first_name: user.fName, 
            last_name: user.lName,
            email: user.email,
            country: user.country,
            phone_number: user.phone,
            is_manager: manager
          };
          
          if(user.code){
            data.provider_code = user.code;
          }
          
          $scope.onSuccess = function(data){
            toastr.success('Register successful!');
            $location.path('/login');
          }
          $scope.onError = function(error){
            toastr.error(error.data.detail, 'Error');
          }
          sendToServer.postData('account/register/',data,$scope.onSuccess,$scope.onError);
        }else{
          toastr.error('fill all fields!', 'Error');
        }
      }else{
        toastr.error('fill all fields!', 'Error');
      }
      
    };
  
}])
.controller('forgotCtl', ['$scope', '$location', 'toastr', 'sendToServer', function($scope, $location, toastr, sendToServer){
  
    $scope.head_footChang();
    $scope.stage = {
      promo_code: false,
      pass: false,
      pass_conf: false
    };
    $scope.forgotNextStage = false;
  
    $scope.validEmail = function(email, email_stage){
      if(email && email_stage){
        var data = {
          email: email
        }
        $scope.onSuccessOne = function(data){
          $scope.forgotNextStage = true;
        }
        $scope.onErrorOne = function(error){
          toastr.error(error.data.detail, 'Error');
        }
        sendToServer.putData('preference/password/step/one/',data,$scope.onSuccessOne,$scope.onErrorOne);
      }else{
        toastr.error('Wrong email!', 'Error');
      }
    };
  
    $scope.newPassSend = function(for_send){
      var forValid;
      
      if(for_send){
        if(for_send.promo_code){
          $scope.stage.promo_code = false;
        }else{
          $scope.stage.promo_code = true;
        }
        if(for_send.pass && for_send.pass.length >= 6){
          $scope.stage.pass = false;
        }else{
          $scope.stage.pass = true;
        }
        if(for_send.pass_conf && for_send.pass == for_send.pass_conf){
          $scope.stage.pass_conf = false;
        }else{
          $scope.stage.pass_conf = true;
        }
        
        for (var key in $scope.stage) {
          if($scope.stage[key]){
            forValid = false;
            break;
          }
          forValid = true;
        }

        if(forValid){
          var data = {
            code: for_send.promo_code, 
            new_password: for_send.pass, 
            confirm_password: for_send.pass_conf
          }
          $scope.onSuccessTwo = function(data){
            toastr.success('Password changed!');
            $location.path('/login');
          }
          $scope.onErrorTwo = function(error){
            toastr.error(error.data.detail, 'Error');
          }
          sendToServer.putData('preference/password/step/two/',data,$scope.onSuccessTwo,$scope.onErrorTwo);
        }
      }else{
        $scope.stage.promo_code = true;
        $scope.stage.pass = true;
        $scope.stage.pass_conf = true;
      }
    };
  
}]);