'use strict';

describe('Directive: interviewQuestion', function () {
  beforeEach(module('ScreenEasyApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<interview-question></interview-question>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the interviewQuestion directive');
  }));
});
