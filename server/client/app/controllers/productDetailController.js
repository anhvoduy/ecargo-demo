(function () {
    'use strict';    
    app.controller('ProductDetailController', ProductDetailController);
    ProductDetailController.$inject = ['$q', 'productService', 'reviewService', '$stateParams'];    
    function ProductDetailController($q, productService, reviewService, $stateParams) {
        // declare models
        var vm = this;
        vm.productId = $stateParams.productID;
        vm.product = {};        
        vm.review = {};
        vm.isSaving = false;
        vm.messageSuccess = '';
        vm.messageError = '';

        // declare functions
        var getData = function () {
            productService.getProductById(vm.productId).then(function (result) {
                vm.product = result;
                if (vm.product === undefined) {
                    vm.messageError = String.format("The Product Id: {0} not found.", vm.productId);
                }                
            }, function (error) {
                vm.messageError = error.message;
            });
        };             

        /* start init */
        getData();
    }
})();