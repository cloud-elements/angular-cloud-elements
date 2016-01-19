'use strict';

describe('ElementService', function () {

  var ElementService;

  beforeEach(module('angularCloudElements.utilities'));
  beforeEach(module('angularCloudElements.services'));
  beforeEach(inject(function (_ElementService_) {
    ElementService = _ElementService_;
  }));

  it('does foo', function () {
    expect(ElementService).to.be.ok;
  })

});
