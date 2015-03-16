'use strict';

angular.module('whoamiApp')

.controller('RootCtrl', ['$scope', '$log', '$timeout', '$state', '$ionicActionSheet', '$ionicPopup', '$ionicHistory', 'MySteps',
    function ($scope, $log, $timeout, $state, $ionicActionSheet, $ionicPopup, $ionicHistory, mySteps) {
        $scope.hasPreviousStep = mySteps.hasPreviousStep;

        $scope.prev = mySteps.prev;

        $scope.showMenu = function () {
            // Show the action sheet
            var hideSheet = $ionicActionSheet.show({
                buttons: [
                    {
                        text: 'About'
                    },
                    {
                        text: 'Back to Application'
                    },
                    {
                        text: 'Quit Application'
                    }
                ],
                buttonClicked: function (index) {
                    switch (index) {
                    case 0:
                        hideSheet();
                        break;
                    case 1:
                        hideSheet();
                        break;
                    case 2:
                        hideSheet();
                        if (res) {
                            if (navigator.app != null) {
                                if (confirm("Are you sure to quit?")) {
                                    navigator.app.exitApp();
                                }
                            }
                        };
                        break;

                        return true;
                    }
                }
            });

            // For example's sake, hide the sheet after two seconds
            $timeout(function () {
                hideSheet();
            }, 5000);
        };

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
