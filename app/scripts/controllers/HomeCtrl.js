(function() {
    function HomeCtrl(Tasks) {
        this.tasks = Tasks.all;
        
        this.create = function() {
            this.tasks.$add(this.task);
            this.task = null;
        };
        
        this.delete = function(task){
            this.tasks.$remove(task);
        };
     
    }   
    angular
        .module('blocTime')
        .controller('HomeCtrl', ['Tasks', HomeCtrl]);
})();
