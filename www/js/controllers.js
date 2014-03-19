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
})

// A simple controller that shows a tapped item's data
.controller('GroupPollsCtrl', function($scope, $stateParams, PetService) {
  // "Pets" is a service returning mock data (services.js)
  $scope.id = $stateParams.groupId;
});

   

