'use strict';

angular.module('whoamiApp')

.factory('MySteps', ['$q', '$log', '$state', 'MY_PARAMS',
    function ($q, $log, $state, MY_PARAMS) {
        var initialized = false,
            template = {},
            startStep = 'introduction',
            previousStep = [],
            currentStep = 'introduction',
            result = {},

            service = {},

            switchState = function (step, value) {
                $log.debug('MySteps.switchState' + ' step:' + step + ' value:' + value);

                var route = template[step].state(value);
                $state.go(route.to, route.params);
            };

        service.init = function () {
            // avoid double initialize
            if (initialized) {
                return;
            }

            initialized = true;

            template = {
                'introduction': {
                    'title': 'WHOAMI',
                    'shortText': 'Introduction',
                    'longText': 'This app will collect data and give diagnostic proposal according to the World Health Organization Acute Malnutrition guide.',
                    'next': function (value) {
                        return 'step_one';
                    },
                    'state': function (value) {
                        return {
                            to: 'app.step.briefing',
                            params: {step: 'introduction'},
                        };
                    },
                },
                'step_one': {
                    'title': 'STEP ONE',
                    'shortText': 'Oedema',
                    'longText': 'Oedema of both feet?',
                    'options': [
                        [
                            {key: 1, value: 'YES'},
                            {key: 0, value: 'NO'},
                        ],
                    ],
                    'next': function (value) {
                        return 'step_two';
                    },
                    'state': function (value) {
                        return {
                            to: 'app.step.choice',
                            params: {step: 'step_one'},
                        };
                    },
                },
                'step_two': {
                    'title': 'STEP TWO',
                    'shortText': 'Gender',
                    'longText': 'Boy or girl?',
                    'options': [
                        [
                            {key: 'm', value: 'Boy'},
                            {key: 'f', value: 'Girl'},
                        ],
                    ],
                    'next': function (value) {
                        return 'step_three';
                    },
                    'state': function (value) {
                        return {
                            to: 'app.step.choice',
                            params: {step: 'step_two'},
                        };
                    },
                },
                'step_three': {
                    'title': 'STEP THREE',
                    'shortText': 'Age',
                    'longText': 'How old is the child?',
                    'options': {
                        'min': 0,
                        'max': 12,
                        'step': 1,
                        'default': 0,
                        'myValue': 24,
                        'myMin': 0,
                        'myMax': 60,
                        'myScale' : function (v) {
                            return v;
                        },
                        'myformat' : function (v) {
                            var y = parseInt(v/12);
                            var m = v - y * 12;
                            return (y>0 ? y + 'yr' : '') + (m>0 ? m + 'm' : '');
                        },
                    },
                    'next': function (value) {
                        return 'step_four';
                    },
                    'state': function (value) {
                        return {
                            to: 'app.step.knob',
                            params: {step: 'step_three'},
                        };
                    },
                },
                'step_four': {
                    'title': 'STEP FOUR',
                    'shortText': 'Height',
                    'longText': 'The child\'s height is',
                    'options': {
                        'min': 0,
                        'max': 100,
                        'step': 1,
                        'default': 0,
                        'myValue': 60,
                        'myMin': 40,
                        'myMax': 80,
                        'myScale' : function (v) {
                            return v * 0.5;
                        },
                        'myformat' : function (v) {
                            var y = parseInt(v/12);
                            var m = v - y * 12;
                            return (y>0 ? y + 'yr' : '') + (m>0 ? m + 'm' : '');
                        },
                    },
                    'next': function (value) {
                        return 'step_five';
                    },
                    'state': function (value) {
                        return {
                            to: 'app.step.knob',
                            params: {step: 'step_four'},
                        };
                    },
                },
            }
        };


        service.hasPreviousStep = function () {
            return (previousStep.length > 0);
        };

        service.getCurrentStepTemplate = function () {
            return service.getStepTempate(currentStep);
        };

        service.getStepTempate = function (step) {
            return template[step];
        };

        // Restart all steps
        service.restart = function () {
            previousStep = [];
            currentStep = startStep;
            switchState(currentStep, null);
        };

        // Switch to previous step state
        service.prev = function () {
            if (previousStep.length > 0) {
                currentStep = previousStep.pop();
                var value = (previousStep.length > 0 ? result[previousStep[previousStep.length - 1]] : null);
                switchState(currentStep, value);
            }
        };

        // keep value and switch to next step state
        service.next = function (value) {
            result[currentStep] = value;
            previousStep.push(currentStep);
            currentStep = template[currentStep].next(value);

            switchState(currentStep, value);
        };

        return service;
    }]);