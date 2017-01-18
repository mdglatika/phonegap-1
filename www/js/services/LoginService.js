angular.module('dbLoginService', ['LoginModel'])

.factory('LoginService', function($http, $q){
	var url = "http://200.69.217.157:20123/api/Login"

	var loginService = {}
  loginService.UserLogin = { "UserName": "", "Password": "" }

	loginService.Login = function(login){
		var deferred = $q.defer();

    var guardar = function guardar_en_disco(user){
                //window.localStorage['username'] = user.username;
                //window.localStorage['password'] = user.password;
                window.localStorage['user'] = angular.toJson(user);
                loginService.UserLogin = user;
              }		
    //var Indata = { "UserName": login.UserName, "Password": login.Password };
    $http.post( url, login).
          then(function (data, status, headers, config){
             //console.log(data);
             //console.log(data.data);             
            if(data.data){
              //alert("POST dbLoginService OK " + data.data.UserName);
              guardar(data.data);              
            }
            deferred.resolve(data.data);
          },
          function (data, status, headers, config) { 
            alert("post dbLoginService error") ;
            deferred.reject();
          });
        return deferred.promise;
	}

  loginService.NoEsPrimeraVezLogin = function(){
    //alert("NOPRIMMMEEE"+ (window.localStorage['user'] || '{}'));   
    
    var user = angular.fromJson(window.localStorage['user'] || '{}');
    //alert("user"+user);

    return loginService.Login(user);
  }

  loginService.LimpiarDatos = function(){
    window.localStorage.removeItem('user');
    //alert("limpado login ok");
  }


	return loginService;

})