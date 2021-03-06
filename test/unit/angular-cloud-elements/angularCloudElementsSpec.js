'use strict';

describe('', function () {

  var module;
  var dependencies;
  dependencies = [];

  var hasModule = function (module) {
    return dependencies.indexOf(module) >= 0;
  };

  beforeEach(function () {
    module = angular.module('angularCloudElements');
    dependencies = module.requires;
  });

  it('should load config module', function () {
    expect(hasModule('angularCloudElements.config'))
      .to.be.ok;
  });

  it('should load utilities module', function () {
    expect(hasModule('angularCloudElements.utilities'))
      .to.be.ok;
  });

  it('should load filters module', function () {
    expect(hasModule('angularCloudElements.filters'))
      .to.be.ok;
  });

  it('should load directives module', function () {
    expect(hasModule('angularCloudElements.directives'))
      .to.be.ok;
  });

  it('should load services module', function () {
    expect(hasModule('angularCloudElements.services'))
      .to.be.ok;
  });

});