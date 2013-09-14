'use strict';

describe('Filter: Candidate', function () {

  // load the filter's module
  beforeEach(module('ScreenEasyApp'));

  // initialize a new instance of the filter before each test
  var Candidate;
  beforeEach(inject(function ($filter) {
    Candidate = $filter('Candidate');
  }));

  it('should return the input prefixed with "Candidate filter:"', function () {
    var text = 'angularjs';
    expect(Candidate(text)).toBe('Candidate filter: ' + text);
  });

});
