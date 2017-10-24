(function() {
  function timer($interval) {
    return {
      templateUrl: '/templates/directives/timer.html',
      restrict: 'E',
      scope: {},
      link: function(scope, element, attributes) {
        var BREAK_TIME = 2000;
        var WORK_TIME = 4000;
        var breakCount = 0;
        scope.button = false;
        scope.onBreakButton = false;
        scope.clock = "25:00";
        scope.alarm = "Work Time";
        
        
        scope.start = function(){
          scope.button = true;
          scope.currentTime = WORK_TIME;
          startTimer();
        };
        
        scope.startBreak = function(){
          scope.clock = "05:00";
          scope.alarm = "Break Time";
          scope.button = true;
          scope.currentTime = BREAK_TIME;
          scope.onBreakButton = false;
          breakCount = 1;
          startTimer();
        };

        scope.reset = function(){
          scope.button = false;
          scope.clock = "25:00";
          $interval.cancel(countdown);
          scope.alarm = "Work Time";
          breakCount = 0;
          if (scope.currentTime == 0 ){
            scope.currentTime = WORK_TIME;
            scope.start();
          }
        };
        
        var countdown = undefined;
        var min = 0;
        var sec = 0;
        
        var startTimer = function() {
          countdown = $interval(function() {
            if (scope.currentTime > 0) {
                scope.currentTime -= 1000;
                min = Math.floor(scope.currentTime / 60000);
                sec = (scope.currentTime - min * 60000) / 1000;
                if (sec < 10) {
                  scope.clock = "0" + min + ":0" + sec;
                } else if( min < 10 ) {
                  scope.clock = "0" + min + ":" + sec;
                } else {
                  scope.clock = min + ":" + sec;
                }
            }else if (scope.currentTime == 0 ) {
              if (breakCount == 1) {
                $interval.cancel(countdown);
                scope.clock = "25:00";
                scope.alarm = "Back to work! Hit reset to start a new session.";
              } else if (breakCount == 0) {
                $interval.cancel(countdown);
                scope.onBreakButton = true;
                scope.alarm = "Ready for a break? Hit the break button.";
              }
            }
          }, 1000);
        };
      }

    };
  }
  angular
    .module('blocTime')
    .directive('timer', ['$interval', timer]);
})();
