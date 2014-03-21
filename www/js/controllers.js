"use strict";

angular.module('voteit.controllers', [])

//----------------------------------------------------------------------------
//  Groups
//----------------------------------------------------------------------------
.controller('PollGropsCtrl', function($scope, $rootScope, $stateParams, pollService, MockService) {
    $scope.header = "pollit"

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

    if (MOCK_MODE) {
        $scope.groups = MockService.getGroups(center);
    }
    else {
        pollService.getGroupsByGeoLocation(center)
        .then(function(result){
            console.info(result);
            $scope.groups = result;
        }, function(err){
            console.error(err);
            $scope.groups = MockService.getGroups();
        });     
    }
})

//----------------------------------------------------------------------------
//  Polls of groups
//----------------------------------------------------------------------------
.controller('PollsInGroupCtrl', function($scope, $stateParams, MockService) {
    $scope.groupName = $stateParams.groupName;

   if (MOCK_MODE) {
        $scope.polls = MockService.getPolls($scope.groupName);
    }
    else {
        pollService.getPolls(center)
        .then(function(result){
            console.info(result);
            $scope.groups = result;
        }, function(err){
            console.error(err);
            $scope.polls = MockService.getPolls($scope.groupName);
        });     
    }

})

//----------------------------------------------------------------------------
//  votes of a poll
//----------------------------------------------------------------------------
.controller('PollVotesCtrl', function($scope, $stateParams, MockService) {

    var pollVotesModel = {
      poll: null,
      choices: [],
      distinctChoices: [],
      votesGraphData: [],
      chartwidth: "100%",
      chartHeight: 80,
      chartOptions: oGraphOptions,
      chartData: []
    }

    $scope.pollVotesModel = pollVotesModel;

    if (MOCK_MODE) {
        pollVotesModel.poll = MockService.getPoll($stateParams.pollId);
    }
    else {
        pollService.getPoll(center)
        .then(function(result){
            console.info(result);
            pollVotesModel.poll = result;
        }, function(err){
            console.error(err);
            pollVotesModel.poll = MockService.getPoll($stateParams.pollId);
        });     
    }

   
    var oChoicesLockup = {};
    var choicesColors = oColors.slice(0); //shadow copy
    for (var i = 0; i < pollVotesModel.poll.choices.length; i++) {


      var colorId = Math.floor((Math.random()*choicesColors.length));     

      pollVotesModel.choices.push({
          text: pollVotesModel.poll.choices[i],
          color: choicesColors[colorId]
      });
       //choices colors lockup table
      oChoicesLockup[pollVotesModel.poll.choices[i]] = choicesColors[colorId];
      choicesColors.splice(colorId, 1);
    };

    var getVotesDistinct = function(oVotes) {
      var lookup = {};
      var oVotesDistinct = [];

      for (var i = 0; i < oVotes.length; i++) {
        var vote = oVotes[i];

        if (!(vote.choice in lookup)) {
          lookup[vote.choice] = 1;
          oVotesDistinct.push({
            choice: vote.choice,
            choiceCount: 1
          });
        } else {
          lookup[vote.choice]++;
        }
      }

      for (var i = 0; i < oVotesDistinct.length; i++) {
        oVotesDistinct[i].choiceCount = lookup[oVotesDistinct[i].choice];
      }

      return oVotesDistinct;
    }

    // get distinct choices
    pollVotesModel.distinctChoices = getVotesDistinct(pollVotesModel.poll.votes);
    
    // prepare the data for the graph
    for (var i = 0; i < pollVotesModel.distinctChoices.length; i++) {
      pollVotesModel.chartData.push(
      {
          value : pollVotesModel.distinctChoices[i].choiceCount,
          color : oChoicesLockup[pollVotesModel.distinctChoices[i].choice],
          label : '<%=value%>'
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
        choices: [],
        votes: [{
            userId: null,
            choice: null
        }],
        center: {
            lat: null,
            lng: null
        },
        radius: 500,
        timeout: null
    }

    var uiModel = {
        allowToAddChoices: true,
        choices: [{
            text: ''
        }, {
            text: ''
        }]
    }

    $scope.model = model;
    $scope.uiModel = uiModel;

    if ($rootScope.currentLocation) {
        model.center.lat = $rootScope.currentLocation.latitude;
        model.center.lng = $rootScope.currentLocation.longitude;
    } else {
        //temp - defaults
        model.center.lat = '30.2342342343';
        model.center.lng = '79.2343243434';
    }


    $scope.addChoice = function () {
        uiModel.choices.push({
            text: ''
        });
        if (uiModel.choices.length > 4) {
            uiModel.allowToAddChoices = false;
        };
    };

    $scope.createPoll = function () {

      for (var i = 0; i < uiModel.choices.length; i++) {
        if (uiModel.choices[i].text.length === 0) {
          alert('No choice for blank choices  !!!');
          return;
        }
        model.choices.push(uiModel.choices[i].text);
      }

      console.info(model);
      if (MOCK_MODE) {

      } else {

        pollService.newPoll(model)
          .then(function(result) {
            console.info(result);
          }, function(err) {
            console.error(err);
          });
      }
      $scope.showAlert();
      
    }


    $scope.showAlert = function() {
      $ionicPopup.show({
        title: 'Poll it ! Mannn',
        content: 'Congratulations, your poll is created and is on his way to the voters.',
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
        }
    }

    $scope.model = debugModel;

    $scope.getLocation = function () {  
      debugModel.geoPosition.Latitude = $rootScope.currentLocation.latitude;
      debugModel.geoPosition.Longitude = $rootScope.currentLocation.longitude;
    };

    $scope.showAlert = function() {
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

});

