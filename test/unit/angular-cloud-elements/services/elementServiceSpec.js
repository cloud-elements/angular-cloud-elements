'use strict';

describe('ElementService', function () {

  var ElementService;

  beforeEach(module('angularCloudElements.utilities'));
  beforeEach(module('angularCloudElements.services'));
  beforeEach(inject(function (_ElementService_) {
    ElementService = _ElementService_;
  }));

  it('can retrieve element instances for a user', function() {

  });

  it('does foo', function () {
    expect(ElementService).to.be.ok;
  })

});
