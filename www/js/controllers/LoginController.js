angular.module('LoginModule')


.controller('LoginCtrl', function($scope, $ionicPopup, $state, $http, LoginService, $ionicHistory){
  $scope.data = {};
  $scope.try_logging = false;

  $scope.init_view = function(){
    LoginService.NoEsPrimeraVezLogin().then(      
      function(success){        
        if(success){
          /*
          $ionicHistory.nextViewOptions({
              disableAnimate: true,
              disableBack: true
          });
*/
          $state.go('tab.fichada');
        }else{
          //alert("NoEsPrimeraVezLogin NOOO");
        }
      }, 
      function(error){
        alert("ERRRRRRRRRRRRR");
      }
      );

  }



  $scope.login = function(){
    $scope.try_logging = true;

    var user = {UserName: $scope.data.username, Password: $scope.data.password};
      //alert("login:"+$scope.data.username + " pwd:" + $scope.data.password);        

      LoginService.Login(user).then(
        function(success){
          if(success){
              $state.go('tab.fichada');
            }else{
              $ionicPopup.alert({
                title: "Incorrecto", 
                template: "Vuelva a intentar"
              });
            }

          $scope.try_logging = false;
          }, 
          function(error){
            $ionicPopup.alert({
              title: "Login ERROR URL NOOO ok", 
              template: "userdddddddddddddddddddddddddddddddddd"
            });
            $scope.try_logging = false;
          }
        );
    }
  })

