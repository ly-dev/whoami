'use strict';

angular.module('whoamiApp')
    .config(function ($stateProvider) {
        $stateProvider

        .state('app.briefing', {
            url: '/briefing/{step}',
            templateUrl: 'js/steps/briefing.html',
            controller: 'BriefingCtrl'
        })

        .state('app.choice', {
            url: '/choice/{step}',
            templateUrl: 'js/steps/choice.html',
            controller: 'ChoiceCtrl'
        })

        .state('app.knob', {
            url: '/knob/{step}',
            templateUrl: 'js/steps/knob.html',
            controller: 'KnobCtrl'
        })

        .state('app.diagnose', {
            url: '/diagnose}',
            templateUrl: 'js/steps/diagnose.html',
            controller: 'DiagnoseCtrl'
        })

        .state('app.proposal', {
            url: '/proposal',
            templateUrl: 'js/steps/proposal.html',
            controller: 'ProposalCtrl'
        });
    });
