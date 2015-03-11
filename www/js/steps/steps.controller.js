'use strict';

angular.module('whoamiApp')

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
    }])

.controller('DiagnoseCtrl', ['$scope', '$log', 'MySteps',
    function ($scope, $log, mySteps) {
        $scope.meta = mySteps.getCurrentStepTemplate();
        $scope.result = mySteps.getResult();

        var report = mySteps.getReport();
        if (report) {
            if (report.action) {
                report.action = '<ul class="diagnose-action"><li>' + report.action.replace(';', '</li><li>') + '</li></ul>';
            }
        }
        $scope.report = report;

        $log.debug(angular.toJson($scope.result));
        $log.debug(angular.toJson($scope.report));

        $scope.next = function () {
            mySteps.restart();
        };
    }]);
