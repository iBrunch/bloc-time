(function() {
  function timer($interval) {
    return {
      templateUrl: '/templates/directives/timer.html',
      restrict: 'E',
      scope: {},
      link: function(scope, element, attributes) {
        scope.button = false;
        scope.clock = "25:00";
        
        scope.start = function(){
          scope.button = true;
          scope.currentTime = 1500000;
          startTimer();
        };

        scope.reset = function(){
          scope.button = false;
          scope.clock = "25:00";
          $interval.cancel(countdown);
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
                  scope.clock = min + ":0" + sec;
                } else {
                  scope.clock = min + ":" + sec;
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
