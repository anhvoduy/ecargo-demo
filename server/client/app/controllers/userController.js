(function () {
    'use strict';    
    app.controller('UserController', UserController);
    UserController.$inject = ['$q', 'userService'];    
    function UserController($q, userService) {
        // declare model
        var vm = this;    
        vm.lstUsers = [];
        vm.messageSuccess = '';
        vm.messageError = '';
        
        // declare functions
        var getUsers = function () {
            userService.getUsers().then(function (result) {
                vm.lstUsers = result;
                vm.messageSuccess = String.format("Get Users is successful. Total: {0} rows", vm.lstUsers.length);
            }, function (error) {
                vm.messageError = error.message;
            });
        };        
                
        /* start init */
        getUsers();
    }
})();