angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('GeoPosicionCtrl', function($scope, $timeout, $cordovaGeolocation) {
  $scope.posicion = {latitud:0, longitud: 0};
  $scope.loading = false;
    
  var posOptions = {timeout: 10000, enableHighAccuracy: false};
    

    
  $scope.get_geoposicion = function(){
      $scope.loading = true;
     
      $timeout(function(){
          $scope.loading = false;          
          $cordovaGeolocation
            .getCurrentPosition(posOptions)
            .then(function (position) {
                $scope.posicion.latitud  = position.coords.latitude
                $scope.posicion.longitud = position.coords.longitude
            }, function(err) {
                alert(err);
            });

          
          $scope.posicion.latitud = $scope.posicion.latitud+1;
          $scope.posicion.longitud = $scope.posicion.longitud+1;
      }, 5000); 
      
      
      
      
  };
  $scope.mostrar_posicion = function(){      
      return $scope.posicion.latitud == 0;
  };
    
  
    
})



.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
