'use strict';

describe('Filter: pad', function () {

  // load the filter's module
  beforeEach(module('cdtApp'));

  // initialize a new instance of the filter before each test
  var pad;
  beforeEach(inject(function ($filter) {
    pad = $filter('pad');
  }));

  it('should return the input prefixed with "pad filter:"', function () {
    var text = 'angularjs';
    expect(pad(text)).toBe('pad filter: ' + text);
  });

});
