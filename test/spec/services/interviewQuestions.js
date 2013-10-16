'use strict';

describe('Service: interviewQuestions', function () {

  // load the service's module
  beforeEach(module('ScreenEasyApp'));

  // instantiate service
  var interviewQuestions;
  beforeEach(inject(function (_interviewQuestions_) {
    interviewQuestions = _interviewQuestions_;
  }));

  it('should do something', function () {
    expect(!!interviewQuestions).toBe(true);
  });

});
