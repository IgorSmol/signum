modul.service('sendToServer', ['$http', '$location', 'API_ENDPOINT', function($http, $location, API_ENDPOINT) {
    this.getData = function(api,onSuccess,onError){
        $http.get(API_ENDPOINT.url + api).then(onSuccess,onError);
    };
    this.postData = function(api, data,onSuccess,onError){
        $http.post(API_ENDPOINT.url + api, data).then(onSuccess,onError);
    };
    this.putData = function(api, data,onSuccess,onError){
        $http.put(API_ENDPOINT.url + api, data).then(onSuccess,onError);
    };
    this.delData = function(api, data,onSuccess,onError){
        $http.delete(API_ENDPOINT.url + api, data).then(onSuccess,onError);
    };
}])
.service('AuthService', ['$q', '$http', '$location', 'toastr', 'API_ENDPOINT', 'USER_ROLES', function($q, $http, $location, toastr, API_ENDPOINT, USER_ROLES) {
  var LOCAL_TOKEN_KEY = 'TokenKey';
  var USER_SUPER = 'is_superuser';
  var USER_MANAGER = 'is_manager';
  var USER_CLIENT = 'is_extend';
  
  function useCredentials(token, user_type) {
    // Set the token as header for your requests!
    $http.defaults.headers.common.Authorization = 'JWT '+ token;
  };
  
  function loadUserCredentials() {
    var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
    if (token) {
      useCredentials(token);
    }
  };
  
  var destroyUserCredentials = function() {
    $http.defaults.headers.common.Authorization = undefined;
    window.localStorage.removeItem(LOCAL_TOKEN_KEY);
    window.localStorage.removeItem(USER_SUPER);
    window.localStorage.removeItem(USER_MANAGER);
    window.localStorage.removeItem(USER_CLIENT);
  };
  
  var storeUserCredentials = function(token, user_super, user_manager, user_extend) {
    window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
    window.localStorage.setItem(USER_SUPER, user_super);
    window.localStorage.setItem(USER_MANAGER, user_manager);
    window.localStorage.setItem(USER_CLIENT, user_extend);
    useCredentials(token);
  };
  
  var login = function(user) {
    $http.post(API_ENDPOINT.url + 'account/login/', user).then(function(result) {
      storeUserCredentials(result.data.authenticate_token, result.data.is_superuser, result.data.is_manager, result.data.is_extend);
      $('body').removeClass('land');
      $location.path('/signal');
    }, function(result){
      toastr.error('Login Error!', 'Error');
    });
  };

  var logout = function() {
    $http.get(API_ENDPOINT.url + 'account/logout/').then(function(result) {
		$location.path('/');
    	destroyUserCredentials();
    }, function(result){
        toastr.error('Logout Error!', 'Error');
    });
  };
  
  loadUserCredentials();
  
  return {
    login: login,
    logout: logout,
    storeUserCredentials: storeUserCredentials,
    destroyUserCredentials: destroyUserCredentials
  };
}]);