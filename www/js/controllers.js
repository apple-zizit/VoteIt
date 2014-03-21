

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
    // "Pets" is a service returning mock data (services.js)
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



    if (MOCK_MODE) {
        $scope.votes = MockService.getPoll($stateParams.pollId);
    }
    else {
        pollService.getPoll(center)
        .then(function(result){
            console.info(result);
            $scope.votes = result;
        }, function(err){
            console.error(err);
            $scope.votes = MockService.getPoll($stateParams.pollId);
        });     
    }

    var voteData = [
        {
          value : 100,
          color : "#FDB45C",
          label : '<%=value%>'
        },
        {
          value : 40,
          color : "#949FB1",
          label : '<%=value%>'
        },
        {
          value : 120,
          color : "#4D5360",
          label : '<%=value%>'
        }

      ];
    
    var color = ["#FF3B30","#FF9500","#4CD964","#FFCC00","#34AADC","#5856D6","#007AFF","#FF2D55","#D1EEFC","#8E8E93"];

    for (var i = 0; i < voteData.length; i++) {
        voteData[i].color = color[i];
    };

    $scope.MyChart = {
        width: "100%",
        height: 80,
        options: oGraphOptions,
        data: voteData
    }

})

//----------------------------------------------------------------------------
//  new poll
//----------------------------------------------------------------------------
.controller('CreateNewPollCtrl', function ($scope, $rootScope, pollService) {

    var model = {
        group: null,
        category: 'ion-beer',
        question: 'Question here ',
        // choices: [ { text: '' }, { text: '' }],
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
          model.choice.push(uiModel.choices[i].text);
        }

        console.info(model);
        if (MOCK_MODE) {

        } else {

            pollService.newPoll(model)
                .then(function (result) {
                    console.info(result);
                }, function (err) {
                    console.error(err);
                });
        }
    }

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
.controller('DebugCtrl', function ($scope, $rootScope, $stateParams, $ionicModal, $state, locationService) {

    var debugModel = {
        geoPosition: {
            Latitude: '0.0',
            Longitude: '0.0'
        }
    }

    $scope.model = debugModel;

    // Load the modal from the given template URL
    $ionicModal.fromTemplateUrl('templates/newPollModal.html', function (modal) {
        $scope.modal = modal;
    }, {
        // Use our scope for the scope of the modal to keep it simple
        scope: $scope,
        // The animation we want to use for the modal entrance
        animation: 'slide-in-up'
    });

    $scope.openModal = function () {
        $scope.modal.show();
    };
    $scope.closeModal = function () {
        $scope.modal.hide();
    };

    $scope.vote = function () {
        $scope.modal.hide();
        $state.go('tab.poll-votes');
    };

    //Be sure to cleanup the modal
    $scope.$on('$destroy', function () {
        $scope.modal.remove();
    });

    $scope.getLocation = function () {  
      debugModel.geoPosition.Latitude = $rootScope.currentLocation.latitude;
      debugModel.geoPosition.Longitude = $rootScope.currentLocation.longitude;
    };
    

});

