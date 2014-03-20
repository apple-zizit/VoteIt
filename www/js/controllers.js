angular.module('voteit.controllers', [])

.controller('PollGropsCtrl', function($scope, $stateParams, PollsService) {
    $scope.header = "pollit"

    var oGrougps = PollsService.getGroups();

    $scope.groups = oGrougps;

})

//shows the polls related to a group
.controller('PollsInGroupCtrl', function($scope, $stateParams, PollsService) {
    // "Pets" is a service returning mock data (services.js)
    $scope.groupId = $stateParams.groupId;

    $scope.groupName = "Group name"

    var oPolls = PollsService.getPolls(5);

    $scope.polls = oPolls;
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
        width: 80,
        height: 80,
        options: options,
        data: data
    }

})


.controller('CreateNewPollCtrl', function($scope, $stateParams) {
    //$scope.header = "voteit" 
    $scope.allowToAddChoices = true;
    $scope.poll = {
        question: '',
        choices: [ { text: '' }, { text: '' }]
    };

    $scope.addChoice = function() {
        $scope.poll.choices.push({ text: '' });
        if ($scope.poll.choices.length >4) {
            $scope.allowToAddChoices = false;   
        };
    };
})

.controller('SettingsCtrl', function($scope, $stateParams, usersService) {
    var model = {
      user: {
        name: null,
        password: null
      }
    };

    $scope.model = model;

    $scope.header = "settings"

    $scope.login = function () {
      alert('login for:' + model.user.name);

      usersService.register(model.user)
      .then(function(result){
          console.info(result);
      }, function(err){
          console.error(err);
      });
    }

})

.controller('DebugCtrl', function($scope, $stateParams) {
    var header = "debug"
    
 
});

