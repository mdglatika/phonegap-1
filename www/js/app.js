// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'LoginModule', 'FichadaModule', 'starter.services', 'ngCordova', 'ConfigModule'])

.run(function($ionicPlatform, $http) {

  var token = btoa("__LatikaIT_433017$__");
  $http.defaults.headers.common['Token'] = 'Basic ' + token;


  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  
  $ionicConfigProvider.tabs.position('bottom');
  //$ionicConfigProvider.backButton.previousTitleText(false).text('');
  $ionicConfigProvider.navBar.alignTitle("center");
  $ionicConfigProvider.backButton.previousTitleText(false).text('').icon('ion-chevron-left');

  

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html', 
      controller: 'LoginCtrl'
  })


    .state('lugar-edit', {
      cache: false,
      url: '/lugar-edit?lat=:&lng=:&descripcion=:', 
      templateUrl: 'templates/lugar-edit.html', 
      controller: 'LugarEditCtrl', 
      params: {'lat': null, 'lng': null, 'descripcion':null}
    },  {reload: true})



  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html', 
    controller: 'TabsCtrl'
  })


/*    .state('lugar-mapa', {
      url: '/lugar-mapa?lat=:&lng=:&descripcion=:', 
      templateUrl: 'templates/lugar-mapa.html', 
      controller: 'LugarMapaCtrl', 
      params: {'lat': null, 'lng': null, 'descripcion':null}
    },  {reload: true})
    */



  .state('tab.fichada-lugares-mapa', {
    cache: false, 
    url: '/lugar-mapa?lat=:&lng=:&descripcion=:', 
    params: {'lat': null, 'lng': null, 'descripcion':null},     
    views: {
      'tab-fichada': {
        templateUrl: 'templates/lugar-mapa.html', 
        controller: 'LugarMapaCtrl'        
      }
    }
  }, {reload: true})




  // Each tab has its own nav history stack:

  .state('tab.fichada', {
    url: '/fichada',
    views: {
      'tab-fichada': {
        templateUrl: 'templates/tab-fichada.html',
        controller: 'FichadaCtrl'
      }
    }
  })


  .state('tab.fichada-lugares', {
    url: '/lugares?lat=:&lng=:', 
    params: {'lat': null, 'lng': null}, 
    views: {
      'tab-fichada': {
        templateUrl: 'templates/fichada-lugares.html', 
        controller: 'LugaresCtrl'        
      }
    }
  })


  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.config', {
    url: '/config',
    views: {
      'tab-config': {
        templateUrl: 'templates/tab-config.html',
        controller: 'ConfigCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
