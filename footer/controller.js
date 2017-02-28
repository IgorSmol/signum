modul.controller('footerCtl', ['$scope', '$location', '$http', 'toastr', 'sendToServer', 'API_ENDPOINT', function($scope, $location, $http, toastr, sendToServer, API_ENDPOINT){
  
    $scope.sendToMail = function(data){
      $scope.onSuccess = function(data){
        toastr.success('Message send!');
        $scope.to_mail = {
          name: '',
          email: '',
          reply: ''
        }
      }
      $scope.onError = function(error){
        toastr.error('Message send error!', 'Error');
      }
      sendToServer.postData('preference/inside/callback/',data,$scope.onSuccess,$scope.onError);
    }
  
}]);