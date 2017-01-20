angular.module('LoginModule')


.controller('LoginCtrl', function($scope, $ionicPopup, $state, $http, LoginService, $ionicHistory){
  $scope.data = {};
  $scope.try_logging = false;

  $scope.init_view = function(){
    $scope.try_logging = true;
    LoginService.NoEsPrimeraVezLogin().then(        
      function(success){        
        if(success){
          /*
          $ionicHistory.nextViewOptions({
              disableAnimate: true,
              disableBack: true
          });
*/
          $scope.try_logging = false;
          $state.go('tab.fichada');
        }else{
          //alert("NoEsPrimeraVezLogin NOOO");
            $scope.try_logging = false;
        }
      }, 
      function(error){
        //alert("Error Login");
        $scope.try_logging = false;

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
              title: "Eror Login", 
              template: "Verifique el server"
            });
            $scope.try_logging = false;
          }
        );
    }
  })

