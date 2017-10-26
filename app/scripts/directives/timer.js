(function() {
  function timer($interval) {
    return {
      templateUrl: '/templates/directives/timer.html',
      restrict: 'E',
      scope: {},
      link: function(scope, element, attributes) {
        var BREAK_TIME = 3000;
        var WORK_TIME = 6000;
        var breakCount = 0;
        var workCount = 0;
        var chime = new buzz.sound( "assets/sounds/35631__reinsamba__crystal-glass.wav", {
          preload: true
        });
        scope.$watch('currentTime', function() {
          if (scope.currentTime === 0) {
            chime.play();
          }
        });
        
        scope.soundOn = true;
        scope.button = false;
        scope.onBreakButton = false;
        scope.extendedBreakButton = false;
        scope.clock = "25:00";
        scope.alarm = "Work Time";
        
        scope.muteSound = function() {
          if(scope.soundOn == true){
            chime.mute();
            scope.soundOn = false;
          }else{
            chime.unmute();
            scope.soundOn = true;
          }
        };
        
        scope.start = function() {
          scope.button = true;
          scope.currentTime = WORK_TIME;
          startTimer();
        };
        
        var breakButtonSwitch = function(){
          scope.button = true;
          scope.onBreakButton = false;
          scope.extendedBreakButton = false;
          scope.currentTime = BREAK_TIME;
          breakCount = 1;
          workCount = 0;
          startTimer();
        };
        
        scope.startBreak = function() {
          BREAK_TIME = 4000;
          scope.clock = "05:00";
          scope.alarm = "Break Time";
          breakButtonSwitch();
        };
        
        scope.startExtendedBreak = function() {
          BREAK_TIME = 6000;
          scope.clock = "30:00";
          scope.alarm = "Extra Break Time";
          breakButtonSwitch();
        };

        scope.reset = function() {
          scope.button = false;
          scope.clock = "25:00";
          $interval.cancel(countdown);
          scope.alarm = "Work Time";
          breakCount = 0;
          if (scope.currentTime <= 0 ){
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
            }else if (scope.currentTime <= 0 ) {
              if (breakCount == 1) {
                $interval.cancel(countdown);
                scope.clock = "25:00";
                scope.alarm = "Back to work! Hit reset to start a new session.";
              } else if (breakCount == 0) {
                workCount += 1;
                if(workCount > 3){
                  scope.extendedBreakButton = true;
                  scope.onBreakButton = false;
                }else{
                  scope.onBreakButton = true;
                }
                $interval.cancel(countdown);
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
