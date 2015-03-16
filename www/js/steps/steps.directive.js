'use strict';

angular.module('whoamiApp')

.directive('myBar', ['$window', '$log', function ($window, $log) {
    return {
        restrict: 'A',
        link: function (scope, iElement, iAttributes) {
            var id = 'bar-' + Date.now(),
                render = function () {
                    var barWidth = iElement.width(),
                        grades = [0, 0.1, 0.25, 0.75, 0.9, 1],
                        options = {
                            range: [0,10,25,75,90,100],
                            value: 50,
                            text: 'value: 50'
                        },
                        markX = 10;

                    if (!angular.isUndefined(iAttributes.myBar)) {
                        var temp = scope.$eval(iAttributes.myBar);
                        // $log.debug('myBar set options: ' + angular.toJson(temp));

                        if (angular.isObject(temp)) {
                            options = angular.extend(options, temp)
                                // $log.debug('myBar new options: ' + angular.toJson(temp));
                        } else {
                            throw 'Invalid bar options attribute';
                        }
                    }

                    var i;
                    for (i=0; i<options.range.length; i++) {
                        if (options.value <= options.range[i]) {
                            break;
                        }
                    };

                    if (i < options.range.length) {
                        if (i == 0) {
                            markX = 0
                        } else {
                            markX = barWidth /2 * (grades[i] + grades[i-1]);
                        }
                    } else {
                        markX = barWidth;
                    }

                    var barHtml = '<svg width="100%" height="40">'
                        + '    <defs>'
                        + '        <linearGradient id="grad-' + id + '" x1="0%" y1="0%" x2="100%" y2="0%">'
                        + '            <stop offset="0%" style="stop-color:rgb(255,0,0);stop-opacity:1" />'
                        + '            <stop offset="10%" style="stop-color:rgb(255,255,0);stop-opacity:1" />'
                        + '            <stop offset="25%" style="stop-color:rgb(0,255,0);stop-opacity:1" />'
                        + '            <stop offset="75%" style="stop-color:rgb(0,255,0);stop-opacity:1" />'
                        + '            <stop offset="90%" style="stop-color:rgb(255,255,0);stop-opacity:1" />'
                        + '            <stop offset="100%" style="stop-color:rgb(255,0,0);stop-opacity:1" />'
                        + '        </linearGradient>'
                        + '    </defs>'
                        + '    <rect x="0" y="0" width="100%" height="20" style="fill:url(#grad-' + id + ');stroke-width:1;stroke:rgb(0,0,0)" />'
                        + '    <polygon points="' + markX + ',20 ' + (markX-5) + ',30 ' + (markX+5) + ',30" style="fill:rgb(0,0,0);stroke:rgb(0,0,0);stroke-width:1" />'
                        + '    <text fill="#000000" font-size="12" x="40%" y="15">' + (options.text) + '</text>'
                        + '</svg>';


                    iElement.html(barHtml);
                };


            scope.$watch(iAttributes.myBar, function () {
                // $log.debug('myBar options changed');
                render();
            }, true);
        }
    };
}])

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
                        // $log.debug('myKnob set options: ' + angular.toJson(temp));

                        if (angular.isObject(temp)) {
                            options = angular.extend(options, temp)
                                // $log.debug('myKnob new options: ' + angular.toJson(temp));
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
                    if (angular.isFunction(options.myValue)) {
                        myValue = options.myValue();
                    } else if (angular.isNumber(options.myValue)) {
                        myValue = options.myValue;
                    } else {
                        myValue = 0;
                    }

                    if (angular.isFunction(options.myMin)) {
                        myValue = options.myMin();
                    } else if (angular.isNumber(options.myMin)) {
                        myMin = options.myMin;
                    } else {
                        myMin = null;
                    }

                    if (angular.isFunction(options.myMax)) {
                        myValue = options.myMax();
                    } else if (angular.isNumber(options.myMax)) {
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
                // $log.debug('myKnob options changed');
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
