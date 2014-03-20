var BASE_HTTP_API_URL = 'http://10.114.20.244:3000/api/'

angular.module('voteit.services', [])
.service('locationService', function($rootScope, $interval) {

      return {
        start: function(){
          activateLocationService();
          $rootScope.stopTime = $interval(activateLocationService, 10000);
          //console.log("test !!!!!!!!!!!!!!!!!" + $rootScope.stopTime);
        }
      };
        function activateLocationService() {

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(sendPosition, showError, {
                    maximumAge: 75000
                });
            } else {
                $rootScope.errorMsg = "Geolocation is not supported by this browser.";
            }



            function sendPosition(position) {

                $rootScope.currentLocation = position.coords;

                $rootScope.serverMsg = "Latitude=" + position.coords.latitude +
                    "Longitude=" + position.coords.longitude;
                //send http post with the parmaters  
                //    $http.post('/someUrl', $rootScope.serverMsg).success(successCallback);
            }

            function successCallback() {

            }

            function showError(error) {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        $rootScope.errorMsg = "User denied the request for Geolocation."
                        break;
                    case error.POSITION_UNAVAILABLE:
                        $rootScope.errorMsg = "Location information is unavailable."
                        break;
                    case error.TIMEOUT:
                        $rootScope.errorMsg = "The request to get user location timed out."
                        break;
                    case error.UNKNOWN_ERROR:
                        $rootScope.errorMsg = "An unknown error occurred."
                        break;
                }
            }



        }

        
    })
.service('MockService', function() {
  // Might use a resource here that returns a JSON array

    var oGrougps = [
      {
        "name": "VoteIt team",
        "pollsCount": 52,
        "category": "ion-beer",
        "polls" : [
        {
             id: "1",
             question: "Should we limit the radius ?",
             votes: "7"
        },
          {
             id: "2",
             question: "UI Theme, Red or Green",
             votes: "23"
        }
        ,
          {
             id: "3",
             question: "Android or IOS ?",
             votes: "12"
        }]
      },
      {
        "name": "Ninja Coders",
        "pollsCount": 23,
        "category": "ion-social-tux",
         "polls" : [
          {
               id: "1",
               question: "Which framework is the best",
               votes: "7"
          },
            {
               id: "2",
               question: "Question 2",
               votes: "23"
          }
          ,
            {
               id: "3",
               question: "Another Question",
               votes: "12"
          }]        
      },
      {
        "name": "Mobility Inovation",
        "pollsCount": 49,
        "category": "ion-speakerphone"
      }
    ];
  

  return {
    getGroups: function() {
      return oGrougps;
    },
    getPolls: function(groupName) {
   
      var polls = null;
      for (var i = 0; i < oGrougps.length; i++) {
        if (oGrougps[i].name===groupName) {
            polls = oGrougps[i].polls;
            break;
        };
      };
  
      return polls;
    },
    postUserName: function(userName) {
      // Simple index lookup
      
    }

  }
})
.service('usersService', function($q, $http){
    return {
      register: function(user){
        var deffered = $q.defer();

        $http.post(BASE_HTTP_API_URL + 'users', user)
        .success(function(response){
            deffered.resolve(response);
        })
        .error(function(err){
            deffered.reject(err);
        });

        return deffered.promise;
      }
    }
})
.service('pollService', function($q, $http){
    return {
      getGroupsByGeoLocation: function(center){
        var deffered = $q.defer();
        //http://localhost:3000/api/groups/30.2342342343,79.2343243434
        //$http.get(BASE_HTTP_API_URL + 'groups/30.2342342343,79.2343243434')
        $http.get(BASE_HTTP_API_URL + 'groups/' + center.lat + ',' + center.lng)
        .success(function(response){
            deffered.resolve(response);
        })
        .error(function(err){
            deffered.reject(err);
        });

        return deffered.promise;
      },       
      getGroupsByGeoLocation: function(center){
        var deffered = $q.defer();
        //http://localhost:3000/api/groups/30.2342342343,79.2343243434
        //$http.get(BASE_HTTP_API_URL + 'groups/30.2342342343,79.2343243434')
        $http.get(BASE_HTTP_API_URL + 'polls/' + center.lat + ',' + center.lng)
        .success(function(response){
            deffered.resolve(response);
        })
        .error(function(err){
            deffered.reject(err);
        });

        return deffered.promise;
      },       
      newPoll: function(newPoll){
        var deffered = $q.defer();

        $http.post(BASE_HTTP_API_URL + 'polls', newPoll)
        .success(function(response){
            deffered.resolve(response);
        })
        .error(function(err){
            deffered.reject(err);
        });

        return deffered.promise;
      }, 
      vote: function(vote){
        var deffered = $q.defer();

        $http.post(BASE_HTTP_API_URL + 'polls/vote', newVote)
        .success(function(response){
            deffered.resolve(response);
        })
        .error(function(err){
            deffered.reject(err);
        });

        return deffered.promise;
      }


    }
});
