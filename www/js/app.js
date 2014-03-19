// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.services', 'starter.controllers'])


.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

    // the pet tab has its own child nav-view and history
    .state('tab.pollit', {
      url: '/pollit',
      views: {
        'pollit-tab': {
          templateUrl: 'templates/pollit.html',
          controller: 'PollitCtrl'
        }
      }
    })

    .state('tab.voteit', {
      url: '/voteit',
      views: {
        'voteit-tab': {
          templateUrl: 'templates/voteit.html',
          controller: 'VoteitCtrl'
        }
      }
    })
   .state('tab.settings', {
      url: '/settings',
      views: {
        'settings-tab': {
          templateUrl: 'templates/settings.html',
          controller: 'SettingsCtrl'
        }
      }
    })
   .state('tab.debug', {
      url: '/debug',
      views: {
        'debug-tab': {
          templateUrl: 'templates/debug.html',
          controller: 'DebugCtrl'
        }
      }
    })
    .state('tab.group-polls', {
      url: '/polls/:groupId',
      views: {
        'pollit-tab': {
          templateUrl: 'templates/group-polls.html',
          controller: 'GroupPollsCtrl'
        }
      }
    });

    // .state('tab.adopt', {
    //   url: '/adopt',
    //   views: {
    //     'adopt-tab': {
    //       templateUrl: 'templates/adopt.html'
    //     }
    //   }
    // })

 

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/pollit');

});

