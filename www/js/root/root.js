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
            });
    });
