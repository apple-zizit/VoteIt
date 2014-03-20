var MOCK_MODE = true;

angular.module('voteit.controllers', [])

.controller('PollGropsCtrl', function($scope, $stateParams, pollService, MockService) {
    $scope.header = "pollit"

    var  center =  {
        lat: '30.2342342343',
        lng: '79.2343243434'
    };

    if (MOCK_MODE) {
        $scope.groups = MockService.getGroups();
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

//shows the polls related to a group
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

.controller('PollVotesCtrl', function($scope, $stateParams) {
    $scope.pollId = $stateParams.pollId;

    $scope.pollName = "Poll name"

  var options = {
        //Boolean - Whether we should show a stroke on each segment
        segmentShowStroke: true,

        //String - The colour of each segment stroke
        segmentStrokeColor: "#fff",

        //Number - The width of each segment stroke
        segmentStrokeWidth: 2,

        //The percentage of the chart that we cut out of the middle.
        percentageInnerCutout: 50,

        //Boolean - Whether we should animate the chart 
        animation: true,

        //Number - Amount of animation steps
        animationSteps: 100,

        //String - Animation easing effect
        animationEasing: "easeOutBounce",

        //Boolean - Whether we animate the rotation of the Doughnut
        animateRotate: true,

        //Boolean - Whether we animate scaling the Doughnut from the centre
        animateScale: false,

        //Function - Will fire on animation completion.
        onAnimationComplete: null
    }


    var data = [{
            value: 30,
            label: "bla bla"
        }, {
            value: 50,
            label: "option1"
        }, {
            value: 100,
            label: "option1"
        }, {
            value: 40,
            label: "option1"
        }, {
            value: 120,
            label: "option1"
        }, {
            value: 120,
            label: "option1"
        }

    ]
    
    var color = ["#FF3B30","#FF9500","#4CD964","#FFCC00","#34AADC","#5856D6","#007AFF","#FF2D55","#D1EEFC","#8E8E93"];

    for (var i = 0; i < data.length; i++) {
        data[i].color = color[i];
        data[i].legend = "Option " + i+1;
    };

    $scope.MyChart = {
        width: 40,
        height: 80,
        options: options,
        data: data
    }

})

//----------------------------------------------------------------------------
//  new poll
//----------------------------------------------------------------------------
.controller('CreateNewPollCtrl', function($scope, $rootScope, pollService) {

  var model = {
    group: null,
    category: 'ion-beer',
    question: 'Question here ',
    // choices: [ { text: '' }, { text: '' }],
    choices: [ '', '' ],
    votes: [
        {
            userId: null,
            choice: null
        }
    ],
    center: {
        lat: null,
        lng: null
    },
    radius: 500,
    timeout: null
}

  $scope.model = model;

    model.center.lat = $rootScope.currentLocation.latitude;
    model.center.lng = $rootScope.currentLocation.longitude;

   //$scope.header = "voteit" 
  $scope.allowToAddChoices = true;

  $scope.addChoice = function() {
      model.choices.push({ text: '' });
      if (model.choices.length >4) {
          $scope.allowToAddChoices = false;   
      };
  };

    $scope.createPoll = function () {
        console.info(model);
      pollService.newPoll(model)
        .then(function(result){
            console.info(result);
        }, function(err){
            console.error(err);
        });     
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

.controller('DebugCtrl', function($scope, $stateParams, locationService) {
    // var header = "debug"
    //     var header = "debug"

    //     function updateLocationService() {
    //         $scope.thePosition = $rootScope.currentLocation;

    //     };
    // $rootScope.stopTime = $interval(updateLocationService, 1000);
    // console.log("test !!!!!!!!!!!!!!!!!" + $rootScope.stopTime);
 
});

