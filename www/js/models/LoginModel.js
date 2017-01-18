angular.module('LoginModel', [])


.factory('Login', function(){
	function Login(Username, Password ){
		this.Username = Username;
		this.Password = Password;
	}

	return Login;
})