'use strict';

describe('Service: interviewQuestions', function () {

  // load the service's module
  beforeEach(module('ScreenEasy'));

  // instantiate service
  var interviewQuestions;
  beforeEach(inject(function (_interviewQuestions_) {
    interviewQuestions = _interviewQuestions_;
  }));

  it('should do something', function () {
    expect(!!interviewQuestions).toBe(true);
  });

});
