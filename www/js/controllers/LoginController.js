angular.module('LoginModule')


.controller('LoginCtrl', function($scope, $ionicPopup, $state, $http, LoginService){
  $scope.data = {};

/*
  var user = angular.fromJson(window.localStorage['user'] || '{}');
  if(LoginService.Login(user)){
      //$state.go('home');
    }
    */
    function guardar_en_disco(user){
      //window.localStorage['username'] = user.username;
      //window.localStorage['password'] = user.password;
      window.localStorage['user'] = angular.toJson(user);
    }
    
    $scope.login = function(){
      var user = {UserName: $scope.data.username, Password: $scope.data.password};
      //alert("login:"+$scope.data.username + " pwd:" + $scope.data.password);        

      LoginService.Login(user).then(
          function(success){
            if(success){
              //alert("login:"+success);
              guardar_en_disco(user);
              $ionicPopup.alert({
                title: "Login ok", 
                template: "bien chamaco"
              });
              $state.go('tab.fichada');
            }else{
              $ionicPopup.alert({
                title: "Login NOOO ok", 
                template: "user:mds, pass:mds"
              });
            }
          }, 
          function(error){
            $ionicPopup.alert({
              title: "Login ERROR URL NOOO ok", 
              template: "userdddddddddddddddddddddddddddddddddd"
            });
          }
        );

      LugarService.getLugares().then(function(){
          $scope.lugares = LugarService.lugares;
        }, 
        function(error){
          $scope.lugares = [];
        }
      );

      /*
      if(LoginService.Login(user)){
        guardar_en_disco(user);
        $ionicPopup.alert({
          title: "Login ok", 
          template: "bien chamaco"
        });
        $state.go('tab.fichada');
      }
      else
        $ionicPopup.alert({
          title: "Login NOOO ok", 
          template: "user:mds, pass:mds"
        });
      */

    }
})

