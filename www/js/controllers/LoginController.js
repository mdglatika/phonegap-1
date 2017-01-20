angular.module('LoginModule')


.controller('LoginCtrl', function($scope, $ionicPopup, $state, $http, LoginService, $ionicHistory, $ionicLoading){
  $scope.data = {};
  //$scope.try_logging = false;

  $scope.init_view = function(){
    //$scope.try_logging = true;
    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });

    LoginService.NoEsPrimeraVezLogin().then(        
      function(success){        
        if(success){
          /*
          $ionicHistory.nextViewOptions({
              disableAnimate: true,
              disableBack: true
          });
*/
          //$scope.try_logging = false;
          $ionicLoading.hide();

          $state.go('tab.fichada');
        }else{
          //alert("NoEsPrimeraVezLogin NOOO");
            //$scope.try_logging = false;
            $ionicLoading.hide();

        }
      }, 
      function(error){
        //alert("Error Login");
        //$scope.try_logging = false;
        $ionicLoading.hide();

      }
      );

  }



  $scope.login = function(){
    //$scope.try_logging = true;

    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });

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

          //$scope.try_logging = false;
          $ionicLoading.hide();

          }, 
          function(error){
            $ionicPopup.alert({
              title: "Eror Login", 
              template: "Verifique el server"
          });
          //$scope.try_logging = false;
          $ionicLoading.hide();

          }
        );
    }
  })

