angular.module('starter.controllers', [])

.controller('PollGropsCtrl', function($scope, $stateParams, PetService) {
    $scope.header = "pollit"
 
    var oGrougps = [
        {
             id: "1",
             name: "gourp 1",
             type: "ion-person-stalker",
             pollsCount: "32"

        },
        {
             id: "2",
             name: "gourp 2",
             type: "ion-beer",
             pollsCount: "15"

        },
        {
             id: "3",
             name: "gourp 3",
             type: "ion-ios7-world-outline",
             pollsCount: "3"

        }

    ];

    $scope.groups = oGrougps;

})

//shows the polls related to a group
.controller('PollsInGroupCtrl', function($scope, $stateParams, PetService) {
    // "Pets" is a service returning mock data (services.js)
    $scope.groupId = $stateParams.groupId;

    $scope.groupName = "Group name"


        var oPolls = [
        {
             id: "1",
             question: "Dog or Cat ?",
             votes: "23"
        },
          {
             id: "2",
             question: "A or B ?",
             votes: "43"
        }
        ,
          {
             id: "3",
             question: "C or D ?",
             votes: "54"
        }

    ];

    $scope.polls = oPolls;
})

.controller('CreateNewPollCtrl', function($scope, $stateParams, PetService) {
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

.controller('SettingsCtrl', function($scope, $stateParams, PetService) {
    $scope.header = "settings"
})

.controller('DebugCtrl', function($scope, $stateParams, PetService) {
    var header = "debug"
    
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
            label: "option1"
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
        }

    ]
    
    var color = ["#FF3B30","#FF9500","#4CD964","#FFCC00","#34AADC","#5856D6","#007AFF","#FF2D55","#D1EEFC","#8E8E93"];

    for (var i = 0; i < data.length; i++) {
        data[i].color = color[i];
    };

    $scope.MyChart = {
        width: 80,
        height: 80,
        header: header,
        options: options,
        data: data

    }
});

