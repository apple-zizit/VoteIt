"use strict";

angular.module('starter', ['ionic', 'voteit.services', 'voteit.controllers', 'chartjs-directive'])


.config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider
     .state('intro', {
        url: '/',
        templateUrl: 'templates/splash.html'
        // controller: 'IntroCtrl'
    })
    // setup an abstract state for the tabs directive
    .state('tab', {
        url: "/tab",
        abstract: true,
        templateUrl: "templates/tabs.html"
    })

    // the pet tab has its own child nav-view and history
    .state('tab.groups', {
        url: '/groups',
        views: {
            'groups-tab': {
                templateUrl: 'templates/polls-groups.html',
                controller: 'PollGropsCtrl'
            }
        }
    })

    .state('tab.polls', {
        url: '/polls/:groupName',
        views: {
            'groups-tab': {
                templateUrl: 'templates/polls-in-group.html',
                controller: 'PollsInGroupCtrl'
            }
        }
    })

    .state('tab.poll-votes', {
        url: '/poll-votes/:pollId',
        views: {
            'groups-tab': {
                templateUrl: 'templates/poll-votes.html',
                controller: 'PollVotesCtrl'
            }
        }
    })    

    .state('tab.new-poll', {
        url: '/new-poll',
        views: {
            'new-poll-tab': {
                templateUrl: 'templates/new-poll.html',
                controller: 'CreateNewPollCtrl'
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
    });
  



    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/');

})
.run(function(locationService){
    locationService.start();
});