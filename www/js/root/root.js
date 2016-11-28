'use strict';

angular.module('whoamiApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('app', {
                abstract: true,
                url: '',
                templateUrl: 'js/root/root.html',
                resolve: {
                    promiseMySteps: ['MySteps',
                        function (mySteps) {
                            return mySteps.init();
                    }],
                },
                controller: 'RootCtrl'
            });
    });

            // start
        AppSignUp.prepareAppContext().then(function (context) {
            AppLog.debug('Device is activated');
            AppHelper.showLoading();
            AppSync.syncAll().then(function (result) {
                AppHelper.hideLoading();
            });
        }, function (data) {
            AppLog.debug('Device is not activated');
            AppSignUp.showLogin({
                scope: $scope,
                startModal: 'signUp'
            });
        });
        
        
                service.getDeviceInfo = function () {
            var info = (APP_CONTEXT.env == 'web' ? {
                'cordova': 'n/a',
                'model': 'web',
                'platform': 'browser',
                'version': (navigator ? navigator.userAgent :'n/a'),
                'uuid': (APP_CONTEXT.activeUser ? APP_CONTEXT.activeUser.name : 'unknown'),
            } : $cordovaDevice.getDevice());

            info.app_version = APP_CONFIG.APP_VERSION;
            info.window = {
                innerWidth: window.innerWidth,
                innerHeight: window.innerHeight
            };

            return info;
        };

