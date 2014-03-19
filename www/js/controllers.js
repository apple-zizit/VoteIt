angular.module('starter.controllers', [])


// // A simple controller that fetches a list of data from a service
// .controller('PetIndexCtrl', function($scope, PetService) {
//   // "Pets" is a service returning mock data (services.js)
//   $scope.pets = PetService.all();
// })


// // A simple controller that shows a tapped item's data
// .controller('PetDetailCtrl', function($scope, $stateParams, PetService) {
//   // "Pets" is a service returning mock data (services.js)
//   $scope.pet = PetService.get($stateParams.petId);
// })
.controller('PollitCtrl', function($scope, $stateParams, PetService) {
    $scope.header = "pollit"
})

.controller('VoteitCtrl', function($scope, $stateParams, PetService) {
    $scope.header = "voteit"
})

.controller('SettingsCtrl', function($scope, $stateParams, PetService) {
    $scope.header = "settings"
})

.controller('DebugCtrl', function($scope, $stateParams, PetService) {
    $scope.header = "debug"
    $scope.MyChart = {
        width: 80,
        height: 80,

    }

    $scope.MyChart.options = {
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


    $scope.MyChart.data = [{
            value: 30,
            color: "#F7464A"
        }, {
            value: 50,
            color: "#E2EAE9"
        }, {
            value: 100,
            color: "#D4CCC5"
        }, {
            value: 40,
            color: "#949FB1"
        }, {
            value: 120,
            color: "#4D5360"
        }

    ]
})

// A simple controller that shows a tapped item's data
.controller('GroupPollsCtrl', function($scope, $stateParams, PetService) {
    // "Pets" is a service returning mock data (services.js)
    $scope.id = $stateParams.groupId;
});