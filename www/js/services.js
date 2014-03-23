//"use strict";



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
//----------------------------------------------------------------------------
//  Mock Service
//----------------------------------------------------------------------------
.service('MockService', function() {
  // Might use a resource here that returns a JSON array  

  var getGroupsDistinct = function () {
        var lookup = {};
      // var items = oPolls;
      var oGropus = [];

     for (var i = 0; i < oPolls.length; i++) {
        var poll = oPolls[i];

        if (!(poll.group in lookup)) {
          lookup[poll.group] = 1;
          oGropus.push({
            name: poll.group,
            pollsCount: 1,
            category: poll.category,
          });
        } 
        else {
          lookup[poll.group]++; 
        }
      }   

      for (var i = 0; i < oGropus.length; i++) {
        oGropus[i].pollsCount = lookup[oGropus[i].name];
      }
      return oGropus;
  }

  return {
    newPoll: function(oPollData) {
      return 'ok';
    },
    getGroups: function(center) {
      //return oGrougps;
      return getGroupsDistinct(center);
    },
    getPolls: function(groupName, userId) {
   
      var polls = [];
      for (var i = 0; i < oPolls.length; i++) {
        if (oPolls[i].group===groupName) {
            polls.push(oPolls[i]);
        };
      };
  
      return polls;
    },
    getPoll: function(sPollId) {
   
      for (var i = 0; i < oPolls.length; i++) {
        if (oPolls[i]._id===sPollId) {
            return oPolls[i];
        }
      }
    },    
    postUserName: function(userName) {
      // Simple index lookup
      
    }

  }
})
.service('usersService', function($q, $http, MockService){
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
.service('pollService', function($q, $http, MockService){

    var isServerMode = function () {
      var server = localStorage.getItem("server") ;
      if (server) {
        return (server === 'true' ? true : false); 
      }
      return false;
    }

    return {
      newPoll: function(newPoll){
        var deffered = $q.defer();

        $http.post(BASE_HTTP_API_URL + 'createpoll', newPoll)
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
  
        if (!isServerMode() && MOCK_MODE) {
          deffered.resolve(MockService.getGroups(center));
          return deffered.promise;
        }

        $http.get(BASE_HTTP_API_URL + 'groups/' + center.lat + ',' + center.lng)
        .success(function(response){
            deffered.resolve(response);
        })
        .error(function(err){
            deffered.reject(err);
        });

        return deffered.promise;
      },       
      getPolls: function(groupName, userId) {

        var deffered = $q.defer();

        if (!isServerMode() && MOCK_MODE) {
            deffered.resolve(MockService.getPolls(groupName, userId));
            return deffered.promise;
        }

        $http.get(BASE_HTTP_API_URL + 'polls?groupName=' + groupName)
        .success(function(response){
            deffered.resolve(response);
        })
        .error(function(err){
            deffered.reject(err);
        });

        return deffered.promise;
      },  
      getPoll: function(sPollId) {

        var deffered = $q.defer();

        if (MOCK_MODE) {
            deffered.resolve(MockService.getPoll(sPollId));
            return deffered.promise;
        }

        $http.get(BASE_HTTP_API_URL + 'poll?pollId=' + sPollId)
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
