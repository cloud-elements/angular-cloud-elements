'use strict';

describe('ceElementService', function () {

  var ceElementService;

  beforeEach(module('angularCloudElements.utilities'));
  beforeEach(module('angularCloudElements.config'));
  beforeEach(module('angularCloudElements.services'));
  beforeEach(inject(function (_ceElementService_) {
    ceElementService = _ceElementService_;
  }));

  it('can retrieve element instances for a user', function() {

  });

  it('does foo', function () {
    expect(ceElementService).to.be.ok;
  })

});
