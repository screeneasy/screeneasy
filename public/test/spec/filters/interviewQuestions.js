'use strict';

describe('Filter: interviewQuestions', function () {

  // load the filter's module
  beforeEach(module('ScreenEasy'));

  // initialize a new instance of the filter before each test
  var interviewQuestions;
  beforeEach(inject(function ($filter) {
    interviewQuestions = $filter('interviewQuestions');
  }));

  it('should return the input prefixed with "interviewQuestions filter:"', function () {
    var text = 'angularjs';
    expect(interviewQuestions(text)).toBe('interviewQuestions filter: ' + text);
  });

});
