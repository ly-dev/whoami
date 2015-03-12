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

        $scope.result = (angular.isFunction($scope.meta.options.myValue) ? $scope.meta.options.myValue() : $scope.meta.options.myValue);
        $scope.next = mySteps.next;
    }])

.controller('SummaryCtrl', ['$scope', '$log', 'MySteps',
    function ($scope, $log, mySteps) {
        $scope.meta = mySteps.getCurrentStepTemplate();
        var summary = '';

        angular.forEach(mySteps.getResult(), function(value, key) {
            var func = mySteps.getStepSummary(key);
            summary += '<li>' + func (value, key) + '</li>';
        });

        if (summary.length > 0) {
            summary = '<ul class="diagnose-action">' + summary + '</ul>';
        }

        $scope.summary = summary;

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
            mySteps.restart(true);
        };
    }]);
