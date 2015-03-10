'use strict';

angular.module('whoamiApp', [
    'ngSanitize',
    'ngAnimate',
    'ui.router',
    'ionic',
])

.constant("MY_PARAMS", {
    DEBUG: true,
})

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$logProvider', 'MY_PARAMS',
    function ($stateProvider, $urlRouterProvider, $locationProvider, $logProvider, MY_PARAMS) {

        $urlRouterProvider
            .otherwise('/step/briefing/introduction');

        $locationProvider.html5Mode(false);

        // disable debug log for production
        $logProvider.debugEnabled(MY_PARAMS.DEBUG);
    }])

.run(['$ionicPlatform',
    function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    }]);
