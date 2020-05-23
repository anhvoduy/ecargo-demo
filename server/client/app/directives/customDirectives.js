(function () {
    angular.module('cargo.directives.customDirectives', [])
    .directive('numbersOnly', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, modelCtrl) {
                modelCtrl.$parsers.push(function (inputValue) {
                    // this next if is necessary for when using ng-required on your input. 
                    // In such cases, when a letter is typed first, this parser will be called
                    // again, and the 2nd time, the value will be undefined
                    if (inputValue == undefined) return '';
                    var transformedInput = inputValue.replace(/[^0-9]/g, '');
                    if (transformedInput != inputValue) {
                        modelCtrl.$setViewValue(transformedInput);
                        modelCtrl.$render();
                    }
                    return transformedInput;
                });
            }
        };
    })
    .directive('mainMenu', [function () {
            return {
                restrict: 'EA',
                replace: true,                
                templateUrl: function () {
                    return "/app/directives/templates/mainMenu.html";
                },            
                link: function (scope, element, attrs, ngCtrl) {
                }
            };
        }])
    .directive('mainTitle', [function () {
            return {
                restrict: 'EA',
                replace: true,                
                templateUrl: function () {
                    return "/app/directives/templates/mainTitle.html";
                },                
                link: function (scope, element, attrs, ngCtrl) {
                }
            };
        }])
})();