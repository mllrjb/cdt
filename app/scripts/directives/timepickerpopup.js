'use strict';

angular.module('cdtApp')
  .constant('timepickerPopupConfig', {
    timepickerPopup: 'hh:mm a',
    appendToBody: false
  })
.directive('timepickerPopup', ['$compile', '$parse', '$document', '$position', 'dateFilter', 'timepickerPopupConfig',
  /**
   * https://github.com/angular/angular.js/issues/3558
   * Use a positive priority so the postLink runs AFTER textInput's linking function (which overules ngModel.$render)
   */
  function ($compile, $parse, $document, $position, dateFilter, timepickerPopupConfig) {
    return {
      restrict: 'EA',
      require: 'ngModel',
      priority: 1,
      link: function (originalScope, element, attrs, ngModel) {
        var scope = originalScope.$new();
        var timeFormat = angular.isDefined(attrs.timepickerPopup) ? scope.$parent.$eval(attrs.timepickerPopup) : timepickerPopupConfig.timepickerPopup,
          appendToBody = angular.isDefined(attrs.timepickerAppendToBody) ? scope.$parent.$eval(attrs.timepickerAppendToBody) : timepickerPopupConfig.appendToBody;

        attrs.$observe('timepickerPopup', function (value) {
          timeFormat = value || timepickerPopupConfig.timepickerPopup;
          ngModel.$render();
        });

        scope.isOpen = false;

        if (attrs.isOpen) {
          originalScope.$watch(function () {
            return originalScope[attrs.isOpen];
          }, function updateOpen(value) {
            scope.isOpen = !! value;
          });
        }

        function setOpen(value) {
          if (attrs.isOpen) {
            originalScope[attrs.isOpen] = value;
          } else {
            scope.isOpen = !! value;
          }
        }

        // popup element used to display calendar
        var popupEl = angular.element('<div timepicker-popup-wrap><div timepicker id="foo"></div></div>');
        popupEl.attr({
          'ng-model': 'time',
          'ng-change': 'timeSelection()'
        });

        function cameltoDash(string) {
          return string.replace(/([A-Z])/g, function ($1) {
            return '-' + $1.toLowerCase();
          });
        }

        // timepicker element
        var timepickerEl = angular.element(popupEl.children()[0]);
        if (attrs.timepickerOptions) {
          angular.forEach(originalScope.$eval(attrs.timepickerOptions), function (value, option) {
            timepickerEl.attr(cameltoDash(option), value);
          });
        }

        function parseTime(viewValue) {
          if (!viewValue) {
            ngModel.$setValidity('time', true);
            return null;
          } else if (angular.isDate(viewValue) && !isNaN(viewValue)) {
            ngModel.$setValidity('time', true);
            return viewValue;
          } else if (angular.isString(viewValue)) {
            var time = Date.create(viewValue);
            if (isNaN(time)) {
              ngModel.$setValidity('time', false);
              return undefined;
            } else {
              ngModel.$setValidity('time', true);
              return time;
            }
          } else {
            ngModel.$setValidity('time', false);
            return undefined;
          }
        }
        ngModel.$parsers.unshift(parseTime);

        // Inner change
        scope.timeSelection = function () {
          ngModel.$setViewValue(scope.time);
          ngModel.$render();
        };

        element.bind('input change keyup', function () {
          scope.$apply(function () {
            scope.time = ngModel.$modelValue;
          });
        });

        // Outer change
        ngModel.$render = function () {
          var time = ngModel.$viewValue ? dateFilter(ngModel.$viewValue, timeFormat) : '';
          element.val(time);
          scope.time = parseTime(ngModel.$modelValue);
        };

        var documentClickBind = function (event) {
          if (scope.isOpen && event.target !== element[0]) {
            scope.$apply(function () {
              setOpen(false);
            });
          }
        };

        var openTimePicker = function () {
          scope.$apply(function () {
            setOpen(true);
          });
        };

        scope.$watch('isOpen', function (value) {
          if (value) {
            scope.position = appendToBody ? $position.offset(element) : $position.position(element);
            scope.position.top = scope.position.top + element.prop('offsetHeight');

            $document.bind('click', documentClickBind);
            element.unbind('focus', openTimePicker);
            element[0].focus();
          } else {
            $document.unbind('click', documentClickBind);
            element.bind('focus', openTimePicker);
          }
        });

        var $popup = $compile(popupEl)(scope);
        if (appendToBody) {
          $document.find('body').append($popup);
        } else {
          element.after($popup);
        }

        originalScope.$on('$destroy', function () {
          $popup.remove();
          element.unbind('focus', openTimePicker);
          $document.unbind('click', documentClickBind);
        });
      }
    };
  }
])
  .directive('timepickerPopupWrap', function () {
    return {
      restrict: 'EA',
      replace: true,
      transclude: true,
      template: '<ul class="dropdown-menu" ng-style="{display: (isOpen && \'block\') || \'none\', top: position.top+\'px\', left: position.left+\'px\'}"><li ng-transclude></li></ul>',
      link: function (scope, element) {
        element.bind('click', function (event) {
          event.preventDefault();
          event.stopPropagation();
        });
      }
    };
  });
