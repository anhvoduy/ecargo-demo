(function () {
    'use strict';    
    app.controller('UserDetailController', UserDetailController);
    UserDetailController.$inject = ['$q', '$stateParams', 'userService'];    
    function UserDetailController($q, $stateParams, userService) {
        var userId = $stateParams.userID;
        // declare model
        var vm = this;
        vm.user = {};
        vm.messageSuccess = '';
        vm.messageError = '';                
        vm.userTypes = [
            { Key: 'CUSTOMER', Label: 'CUSTOMER' }, 
            { Key: 'MERCHANT', Label: 'MERCHANT' }
        ];
        
        // declare functions
        var getUserById = function () {
            userService.getUserById(userId).then(function (result) {
                vm.user = result;
                if (vm.user === undefined) {
                    vm.messageError = String.format("The User Id: {0} not found.", userId);
                }
            }, function (error) {
                vm.messageError = error.message;
            });
        };        
                        
        /* start init */
        getUserById();
    }
})();