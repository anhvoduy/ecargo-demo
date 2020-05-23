(function () {
    'use strict';    
    app.controller('ReviewProductController', ReviewProductController);
    ReviewProductController.$inject = ['$q', '$timeout', '$stateParams', 'productService', 'reviewService'];    
    function ReviewProductController($q, $timeout, $stateParams, productService, reviewService) {
        var productId = $stateParams.productID;
        // declare model
        var vm = this;
        vm.product = {};        
        vm.isSaving = false; 
        vm.messageSuccess = '';
        vm.messageError = '';               
        vm.review = {
            Rating: '',
            Comment: '',
            Created: new Date(),
            ProductId: productId,
            Email: ''
        };
        
        // if create review success/failed -> reset status after 5s
        var resetFormStatus = function () {
            $timeout(function () {
                vm.isSaving = false;
                vm.messageSuccess = '';
                vm.messageError = '';
            }, 5000);
        };        
        
        // declare functions
        var getProductById = function () {
            productService.getProductById(productId).then(function (result) {
                vm.product = result;
                if (vm.product === undefined) {
                    vm.messageError = String.format("The product id: {0} not found.", productId);
                    vm.isSaving = true;
                } else {                    
                    vm.isSaving = false;
                }
            }, function (error) {
                vm.messageError = error.message;
            });
        };
        
        // declare button methods
        vm.save = function () {            
            vm.isSaving = true;
            reviewService.createReview(vm.review).then(function (result) {
                if (result.affectedRows > 0) {
                    vm.messageSuccess = 'This item was updated success.';
                }
                resetFormStatus();
            }, function (error) {
                vm.messageError = error.message;
                resetFormStatus();
            });
        };
        
        /* start init */
        getProductById();
    }
})();