'use strict';

describe('Service: email', function () {

  // load the service's module
  beforeEach(module('publicApp'));

  // instantiate service
  var email;
  beforeEach(inject(function (_email_) {
    email = _email_;
  }));

  it('should do something', function () {
    expect(!!email).toBe(true);
  });

});
