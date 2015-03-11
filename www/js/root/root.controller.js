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
                        text: '<b>Share</b> This'
                    },
                    {
                        text: 'Move'
                    }
     ],
                destructiveText: 'Delete',
                titleText: 'Modify your album',
                buttonClicked: function (index) {
                    return true;
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
