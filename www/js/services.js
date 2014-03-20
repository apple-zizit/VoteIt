angular.module('voteit.services', [])

/**
 * A simple example service that returns some data.
 */
.service('PollsService', function() {
  // Might use a resource here that returns a JSON array

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

  return {
    getGroups: function() {
      return oGrougps;
    },
    getPolls: function(groupId) {
      // Simple index lookup
      return oPolls;
    }
  }
});
