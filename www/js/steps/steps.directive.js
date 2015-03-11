'use strict';

angular.module('whoamiApp')

.directive('myKnob', ['$log', function ($log) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, iElement, iAttributes, ngModel) {
            var oldCursorValue = 0,
                myValue = 0,
                myMin = null,
                myMax = null,
                myScale = null,
                dialUp = 0,
                dialDown = 0,
                render = function () {
                    var options = {
                        'min': 0,
                        'max': 30,
                        'step': 1,
                        'default': 0,
                        'myValue': 0,
                        'myMin': null,
                        'myMax': null,
                        // convert to model value
                        'myScale': function (v) {
                            return v;
                        },
                    };

                    if (!angular.isUndefined(iAttributes.myKnob)) {
                        var temp = scope.$eval(iAttributes.myKnob);
                        $log.debug('myKnob set options: ' + angular.toJson(temp));

                        if (angular.isObject(temp)) {
                            options = angular.extend(options, temp)
                            $log.debug('myKnob new options: ' + angular.toJson(temp));
                        } else {
                            throw 'Invalid knob options attribute';
                        }
                    }

                    // set myScale function
                    if (angular.isFunction(options.myScale)) {
                        myScale = options.myScale
                    } else if (angular.isString(options.myScale)) {
                        try {
                            myScale = eval(options.myScale);
                        } catch (e) {
                            // do nothing;
                        }
                    }

                    if (angular.isFunction(myScale)) {
                        options.myScale = myScale;
                    } else {
                        options.myScale = myScale = function (v) {
                            return v;
                        };
                    }

                    // initialize the myValue, myMin and myMax
                    if (angular.isNumber(options.myValue)) {
                        myValue = options.myValue;
                    } else {
                        myValue = 0;
                    }

                    if (angular.isNumber(options.myMin)) {
                        myMin = options.myMin;
                    } else {
                        myMin = null;
                    }

                    if (angular.isNumber(options.myMax)) {
                        myMax = options.myMax;
                    } else {
                        myMax = null;
                    }

                    options.change = function (cv) {
                        if (oldCursorValue > cv) {
                            if (dialUp) {
                                // decrease
                                myValue = myValue + myScale(Math.round(cv) - Math.round(oldCursorValue));
                                if (angular.isNumber(myMin) && (myValue < myMin)) {
                                    myValue = myMin;
                                }
                                dialUp = 0;
                            } else {
                                dialUp = 1;
                                dialDown = 0;
                            }
                        } else if (oldCursorValue < cv) {
                            if (dialDown) {
                                // increase
                                myValue = myValue + myScale(Math.round(cv) - Math.round(oldCursorValue));
                                if (angular.isNumber(myMax) && (myValue > myMax)) {
                                    myValue = myMax;
                                }
                                dialDown = 0;
                            } else {
                                dialUp = 0;
                                dialDown = 1;
                            }
                        }

                        oldCursorValue = cv;

                        scope.$apply(function () {
                            ngModel.$setTouched();
                            ngModel.$setDirty();
                            ngModel.$setViewValue(myValue);
                            ngModel.$commitViewValue();
                        });
                    };

                    // config knob
                    $(iElement).trigger('configure', options);
                    $(iElement).val(options.default).trigger('change');
                };

            scope.$watch(iAttributes.myKnob, function () {
                $log.debug('myKnob options changed');
                render();
            }, true);

            // active the knob and adjust css
            $(iElement).knob();
            var knobLabelHeight = parseInt($(iElement).css('height'));
            $(iElement).css('line-height', knobLabelHeight + 'px');
            $(iElement).css('font-size', (knobLabelHeight * 0.6) + 'px');
        }
    };
}]);
