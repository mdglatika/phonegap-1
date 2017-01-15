angular.module('dbLoginService', ['LoginModel'])

.factory('LoginService', function($http, $q){
	var url = "http://200.69.217.157:20123/api/Login"

	var loginService = {}

	loginService.Login = function(login){
		var deferred = $q.defer();
		
    var Indata = { "UserName": login.UserName, "Password": login.Password };
    $http.post( url, Indata).
          then(function (data, status, headers, config){
             //console.log(data);
             //alert("POST dbLoginService OK " + data.data);
             deferred.resolve(data.data);
          },
          function (data, status, headers, config) { 
            alert("post dbLoginService error") ;
            deferred.reject();
          });
        return deferred.promise;
	}


	return loginService;

})