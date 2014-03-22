//var BASE_HTTP_API_URL = 'http://10.114.20.244:3000/api/';
var BASE_HTTP_API_URL = 'http://localhost:9000/api/'; //

  var MOCK_MODE = true;

  var oGraphOptions = {
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
      onAnimationComplete: null,

      scaleShowLabels: true,

      scaleLabelPaddingX: 10,

      scaleFontStyle: "bold",
      scaleFontColor: "#FFF",
      scaleLabel: "<%=value%>"
  }

  var oColors = ["#FF3B30", "#FF9500", "#4CD964", "#FFCC00", "#34AADC", "#5856D6", "#007AFF", "#FF2D55", "#D1EEFC", "#8E8E93"];

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