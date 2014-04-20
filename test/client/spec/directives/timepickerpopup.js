'use strict';

describe('Directive: timepickerPopup', function () {

  // load the directive's module
  beforeEach(module('cdtApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<timepicker-popup></timepicker-popup>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the timepickerPopup directive');
  }));
});
