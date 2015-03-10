'use strict';

angular.module('whoamiApp')
    .config(function ($stateProvider) {
        $stateProvider

        .state('app.step', {
            abstract: true,
            url: '/step',
            templateUrl: 'js/steps/step.html',
            controller: 'StepCtrl'
        })

        .state('app.step.briefing', {
            url: '/briefing/{step}',
            templateUrl: 'js/steps/briefing.html',
            controller: 'BriefingCtrl'
        })

        .state('app.step.choice', {
            url: '/choice/{step}',
            templateUrl: 'js/steps/choice.html',
            controller: 'ChoiceCtrl'
        })

        .state('app.step.knob', {
            url: '/knob/{step}',
            templateUrl: 'js/steps/knob.html',
            controller: 'KnobCtrl'
        });

    });
