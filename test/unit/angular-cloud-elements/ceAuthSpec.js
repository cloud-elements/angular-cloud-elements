describe('ceAuth', function () {

  var ceAuth;
  var httpUtility;

  beforeEach(module('angularCloudElements.config'));
  beforeEach(module('angularCloudElements.utilities'));
  beforeEach(inject(function (_ceAuth_, _httpUtility_) {
    ceAuth = _ceAuth_;
    httpUtility = _httpUtility_;
  }));

  it('is a valid service', function () {
    expect(ceAuth)
      .to.be.ok;
  });

  it('has empty configs to begin with and can subsequently set configs',
    function () {
      expect(ceAuth.config)
        .to.be.undefined;
      ceAuth.setConfig({
        userSecret: 'fds1a2sg456gfs98afd12s3f4as86df98sda',
        orgSecret: '123fdsa456f4d7as89fds423fdsa489fdsa45fdsa4',
        baseUrl: 'http://ce.com'
      });
      expect(ceAuth.config.userSecret)
        .to
        .equal('fds1a2sg456gfs98afd12s3f4as86df98sda');
      expect(ceAuth.config.orgSecret)
        .to
        .equal('123fdsa456f4d7as89fds423fdsa489fdsa45fdsa4');
      expect(ceAuth.config.baseUrl)
        .to
        .equal('http://ce.com');
    });

  it('throws an error when passed an invalid config', function () {
    expect(function () {
        ceAuth.setConfig('string');
      })
      .to
      .throw(Error, 'Configuration must be an object');

    expect(function () {
        ceAuth.setConfig(1);
      })
      .to
      .throw(Error, 'Configuration must be an object');

    expect(function () {
        ceAuth.setConfig(undefined);
      })
      .to
      .throw(Error, 'Configuration must be an object');

    expect(function () {
        ceAuth.setConfig();
      })
      .to
      .throw(Error, 'Configuration must be an object');
  });

  it('updates httpUtility headers and base url', function () {
    expect(httpUtility.getHeaders())
      .to.be.undefined;
    expect(httpUtility.getBaseUrl())
      .to.be.undefined;
    ceAuth.setConfig({
      userSecret: 'fds1a2sg456gfs98afd12s3f4as86df98sda',
      orgSecret: '123fdsa456f4d7as89fds423fdsa489fdsa45fdsa4',
      baseUrl: 'http://ce.com'
    });
    expect(httpUtility.getHeaders())
      .to
      .deep
      .equal({
        'Authorization': 'User fds1a2sg456gfs98afd12s3f4as86df98sda, Organization 123fdsa456f4d7as89fds423' +
          'fdsa489fdsa45fdsa4',
        'Content-Type': 'application/json'
      });
    expect(httpUtility.getBaseUrl())
      .to
      .equal('http://ce.com');
  });

  it('can clear the config', function () {
    expect(httpUtility.getHeaders())
      .to.be.undefined;
    ceAuth.setConfig({
      userSecret: 'fds1a2sg456gfs98afd12s3f4as86df98sda',
      orgSecret: '123fdsa456f4d7as89fds423fdsa489fdsa45fdsa4',
      baseUrl: 'http://ce.com'
    });
    expect(httpUtility.getHeaders())
      .to.not.be.undefined;
    ceAuth.clearConfig();
    expect(httpUtility.getHeaders())
      .to
      .deep
      .equal({});
    expect(httpUtility.getBaseUrl())
      .to
      .equal('');
  });

});