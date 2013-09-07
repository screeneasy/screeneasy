'use strict';

describe('Controller: PostmortemCtrl', function () {

  // load the controller's module
  beforeEach(module('publicApp'));

  var PostmortemCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PostmortemCtrl = $controller('PostmortemCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
