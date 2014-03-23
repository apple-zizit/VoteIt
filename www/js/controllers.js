"use strict";

angular.module('voteit.controllers', [])

//----------------------------------------------------------------------------
//  Groups
//----------------------------------------------------------------------------
.controller('PollGropsCtrl', function($scope, $rootScope, $stateParams, pollService) {
 
    var  center =  {
        lat: '30.2342342343',
        lng: '79.2343243434'
    };

    if ($rootScope.currentLocation) {
        center.lat = $rootScope.currentLocation.latitude;
        center.lng = $rootScope.currentLocation.longitude;
    } else {
        //temp - defaults
        center.lat = '30.2342342343';
        center.lng = '79.2343243434';
    }

    pollService.getGroupsByGeoLocation(center)
    .then(function(result){
        console.info(result);
        $scope.groups = result;
    }, function(err){
        console.error(err);
    });     

})

//----------------------------------------------------------------------------
//  Polls of groups
//----------------------------------------------------------------------------
.controller('PollsInGroupCtrl', function($scope, $stateParams, pollService) {

    var pollInGroupModel = {
        all: [],    //Avner: this is not good, it duplicate
        active: [],
        ended: []
    }

    $scope.pollInGroupModel = pollInGroupModel;


    $scope.groupName = $stateParams.groupName;

    pollService.getPolls($scope.groupName)
    .then(function(result){
        console.info(result);
        pollInGroupModel.all = result;
        divideToActiveAndEnded();
    }, function(err){
        console.error(err);
    });     


    //divide to active and ended
    var divideToActiveAndEnded = function  () {
      for (var i = 0; i < pollInGroupModel.all.length; i++) {
          if (pollInGroupModel.all[i].active) {
            pollInGroupModel.active.push(pollInGroupModel.all[i]);
          }
          else
          {
            pollInGroupModel.ended.push(pollInGroupModel.all[i]);
          }
      }     
    }
 

})

//----------------------------------------------------------------------------
//  votes of a poll
//----------------------------------------------------------------------------
.controller('PollVotesCtrl', function($scope, $state, $stateParams, $ionicPopup, pollService) {

    var pollVotesModel = {
      poll: null,
      choices: [],
      distinctChoices: [],
      votesGraphData: [],
      chartwidth: "100%",
      chartHeight: 80,
      chartOptions: oGraphOptions,
      chartData: [],
      active: true
    }

    $scope.pollVotesModel = pollVotesModel;

    pollService.getPoll($stateParams.pollId)
    .then(function(result){
        console.info(result);
        pollVotesModel.poll = result;
        renderVotes();
    }, function(err){
        console.error(err);
    });     
 

  var renderVotes = function() {
    //check if still active
    if (!pollVotesModel.poll.active || pollVotesModel.poll.active === false) {
      pollVotesModel.active = false;
    };

    var oChoicesLockup = {};
    var choicesColors = oColors.slice(0); //shadow copy

    for (var i = 0; i < pollVotesModel.poll.choices.length; i++) {

      var colorId = Math.floor((Math.random() * choicesColors.length));

      pollVotesModel.choices.push({
        text: pollVotesModel.poll.choices[i].text,
        color: choicesColors[colorId]
      });
      //choices colors lockup table
      oChoicesLockup[pollVotesModel.poll.choices[i].text] = choicesColors[colorId];
      choicesColors.splice(colorId, 1);
    };

    // prepare the data for the graph
    for (var i = 0; i < pollVotesModel.poll.choices.length; i++) {
      pollVotesModel.chartData.push({
        value: pollVotesModel.poll.choices[i].votes,
        color: oChoicesLockup[pollVotesModel.poll.choices[i].text],
        label: '<%=value%>'
      });
    }
  }

  $scope.userVote = function () {
    $ionicPopup.show({
        title: 'Thank you for voting',
        content: 'A notification will be sent to your device when the poll is concludes',
        scope: $scope,
        buttons: [{
          text: 'SABABA',
          type: 'button-assertive',
          onTap: function() {
            $state.go('tab.groups');
            return true;
          }
        }]
      });  
  }

})

//----------------------------------------------------------------------------
//  new poll
//----------------------------------------------------------------------------
.controller('CreateNewPollCtrl', function ($scope, $rootScope, $ionicPopup, $state, pollService) {

    var model = {
        group: null,
        category: 'ion-beer',
        question: '',
        choices: [{text: ''}, {text: ''}],
        center: {
            lat: null,
            lng: null
        },
        radius: 500,
        timeout: null,
        allowToAddChoices: true,
    }

    $scope.model = model;

    if ($rootScope.currentLocation) {
        model.center.lat = $rootScope.currentLocation.latitude;
        model.center.lng = $rootScope.currentLocation.longitude;
    } else {
        //temp - defaults
        model.center.lat = '30.2342342343';
        model.center.lng = '79.2343243434';
    }


    $scope.addChoice = function () {
        model.choices.push({
            text: ''
        });
        if (model.choices.length > 4) {
            model.allowToAddChoices = false;
        };
    };

    $scope.createPoll = function () {

      for (var i = 0; i < model.choices.length; i++) {
        if (model.choices[i].text.length === 0) {
          alert('No choice for blank choices  !!!');
          return;
        }
      }

      //add user selection
      //model.choices[i].userIds = ['avner'];

      // if (MOCK_MODE) {

      // } else {

        pollService.newPoll(model)
          .then(function(result) {
            console.info('new poll - success:' + result);
          }, function(err) {
            console.error(err);
          });
      // }
      $scope.showAlert();
      
    }


    $scope.showAlert = function() {
      $ionicPopup.show({
        title: 'Poll it ! Mannn',
        content: 'Congratulations, "VoteIt" will broadcast your poll to all the potential voters.',
        scope: $scope,
        buttons: [{
          text: 'Ok',
          type: 'button-assertive',
          onTap: function() {
            console.log('Thank you for Polling');
            $state.go('tab.groups');
            return true;
          }
        }]
      });
    };


})

//----------------------------------------------------------------------------
//  Settings
//----------------------------------------------------------------------------
.controller('SettingsCtrl', function($scope, $stateParams, usersService) {

    var model = {
      user: {
        username: null,
        password: null, 
        groups: []
      }

    };


    $scope.model = model;

    if (localStorage.getItem("user")) {
        model.user.username = localStorage.getItem("user");
    }

    $scope.login = function () {
      //alert('login for:' + model.user.name);

      usersService.register(model.user)
      .then(function(result){
          console.info(result);
          localStorage.setItem("user", model.user.username);
      }, function(err){
          console.error(err);
      });
    }

})

//----------------------------------------------------------------------------
//  debug
//----------------------------------------------------------------------------
.controller('DebugCtrl', function ($scope, $rootScope, $stateParams,$ionicPopup, $state, locationService) {

    var debugModel = {
        geoPosition: {
            Latitude: '0.0',
            Longitude: '0.0'
        },
        server: false

    }

    $scope.debugModel = debugModel;

    var server = localStorage.getItem("server") ;
    if (server) {
      debugModel.server = (server === 'true' ? true : false); 
    }

    $scope.changeMockMode = function () {
      debugModel.server = !debugModel.server;
      localStorage.setItem("server", debugModel.server ? 'true' : 'false');
    }

    $scope.start = function () {  
        $state.go('intro');
    };

    $scope.getLocation = function () {  
      debugModel.geoPosition.Latitude = $rootScope.currentLocation.latitude;
      debugModel.geoPosition.Longitude = $rootScope.currentLocation.longitude;
    };

    $scope.showNewPollMessage = function() {
      $ionicPopup.show({
        title: 'New Poll !',
        content: 'A new poll was submitted, whould like to join the vote ?',
        scope: $scope,
        buttons: [{
          text: 'Vote it !',
          type: 'button-assertive',
          onTap: function() {
            console.log('Thank you for voting');
            $state.go('tab.poll-votes',{ "pollId": 1});
            return true;
          }
        },
        {
          text: 'Not now',
          type: 'button-light',
          onTap: function() {
            return true;
          }
        }]
      });
    };

    $scope.showPollEndedMessage = function() {
      $ionicPopup.show({
        title: 'Poll voting ended !',
        content: 'A poll you voted for has now ended (In the Ninja Coders groups). do you want to see the results ?',
        scope: $scope,
        buttons: [{
          text: 'Show Me',
          type: 'button-assertive',
          onTap: function() {
            console.log('Thank you for voting');
            $state.go('tab.poll-votes',{ "pollId": 3});
            return true;
          }
        },
        {
          text: 'Not now',
          type: 'button-light',
          onTap: function() {
            return true;
          }
        }]
      });
    };

});

