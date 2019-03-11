angular.module("app", [
                       'ui.jq',
                       'ui.ace'
                       ])

.controller("MainCtrl", function($scope) {
            
            $scope.initial = {
            _id: {
            one: "a",
            b: "two"
            },
            n: 123
            };
            
            //NOTE: used in resize event to trigger ui-ace watchers for element resizing
            $scope.$boundDigest = $scope.$digest.bind($scope);
            
            })

.directive('validJson', function() {
           return {
           require: 'ngModel',
           priority: 1000,
           link: function(scope, elem, attrs, ngModel) {
           
           // view to model
           ngModel.$parsers.unshift(function(value) {
                                    var valid = true,
                                    obj;
                                    try {
                                    obj = JSON.parse(value);
                                    } catch (ex) {
                                    valid = false;
                                    }
                                    ngModel.$setValidity('validJson', valid);
                                    return valid ? obj : undefined;
                                    });
           
           // model to view
           ngModel.$formatters.push(function(value) {
                                    return JSON.stringify(value, null, '\t');
                                    });
           
           }
           };
           })

.directive('validScript', ['$parse', function($parse) {
                           return {
                           require: 'ngModel',
                           priority: 1000,
                           link: function(scope, elem, attrs, ngModel) {
                           
                           // view to model
                           ngModel.$parsers.unshift(function(value) {
                                                    var valid = true,
                                                    obj;
                                                    try {
                                                    obj = $parse(value)({});
                                                    } catch (ex) {
                                                    valid = false;
                                                    }
                                                    ngModel.$setValidity('validScript', valid);
                                                    return valid ? obj : undefined;
                                                    });
                           
                           // model to view
                           ngModel.$formatters.push(function(value) {
                                                    return "(" + (value !== undefined ? JSON.stringify(value, null, '\t') : "") + ");";
                                                    });
                           
                           }
                           };
                           }]);
