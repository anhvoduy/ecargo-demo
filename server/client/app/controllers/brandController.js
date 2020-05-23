(function () {
    'use strict';        
    app.controller('BrandController', BrandController);
    BrandController.$inject = ['$q', 'brandService'];        
    function BrandController($q, brandService) {
        // declare models
        var vm = this;
        vm.lstBrands = [];
        vm.messageSuccess = '';
        vm.messageError = '';        

        /* start init */
        activate();    

        // declare functions
        function activate() {
            brandService.getBrands().then(function (result) {
                vm.lstBrands = result;
                vm.messageSuccess = String.format("Get Brands is successful. Total: {0} rows", vm.lstBrands.length);
            }, function (error) {
                vm.messageError = error.message;
            });
        }
    }
})();