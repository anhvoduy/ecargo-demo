(function () {
    'use strict';        
    app.controller('HomeController', HomeController);
    HomeController.$inject = ['$q'];        
    function HomeController($q) {
        // declare models
        var vm = this;
        vm.lstBrands = [];
        vm.messageSuccess = '';
        vm.messageError = '';
        vm.getBrands = getBrands;

        // activate
        activate();    

        // declare functions
        function activate() {

        }
    }
})();