'use strict';

angular.module('whoamiApp')

.controller('StepCtrl', ['$scope', '$log', '$state', '$ionicPopup', 'MySteps',
    function ($scope, $log, $state, $ionicPopup, mySteps) {
        $scope.hasPreviousStep = mySteps.hasPreviousStep;

        $scope.prev = mySteps.prev;

        $scope.confirmRestart = function () {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Please Confirm',
                cssClass: 'app-adjust-popup',
                template: 'Are you sure to restart? All collected data will be reset.'
            });
            confirmPopup.then(function (res) {
                if (res) {
                    mySteps.restart();
                }
            });
        };

    }])

.controller('BriefingCtrl', ['$scope', '$log', 'MySteps',
    function ($scope, $log, mySteps) {
        $scope.meta = mySteps.getCurrentStepTemplate();

        $scope.next = mySteps.next;
    }])

.controller('ChoiceCtrl', ['$scope', '$log', 'MySteps',
    function ($scope, $log, mySteps) {
        $scope.meta = mySteps.getCurrentStepTemplate();

        $scope.next = mySteps.next;
    }])

.controller('KnobCtrl', ['$scope', '$log', 'MySteps',
    function ($scope, $log, mySteps) {
        $scope.meta = mySteps.getCurrentStepTemplate();

        // set myFormat function
        $scope.myFormat = function (v) {
            return v;
        };
        if (angular.isFunction($scope.meta.options.myFormat)) {
            $scope.myFormat = $scope.meta.options.myFormat
        }

        $scope.result = $scope.meta.options.myValue;
        $scope.next = mySteps.next;
    }]);
