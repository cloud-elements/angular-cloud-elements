Function.prototype.bind = Function.prototype.bind || function (thisp) {
    var fn = this;
    return function () {
        return fn.apply(thisp, arguments);
    };
};

describe('ceAuth', function () {

  var ceAuth;

  beforeEach(module('angularCloudElements.config'));
  beforeEach(inject(function (_ceAuth_, _$http_) {
    ceAuth = _ceAuth_;
    $http = _$http_;
  }));

  it('is a valid service', function () {
    expect(ceAuth).to.be.ok;
  })

  it('has empty configs to begin with and can subsequently set configs', function() {
    expect(ceAuth.config.baseUrl).to.equal('');
    expect(ceAuth.config.orgSecret).to.equal('');
    expect(ceAuth.config.userSecret).to.equal('');
    ceAuth.setConfig({
      userSecret: 'fds1a2sg456gfs98afd12s3f4as86df98sda',
      orgSecret: '123fdsa456f4d7as89fds423fdsa489fdsa45fdsa4',
      baseUrl: 'http://localhost:8080'
    });
    expect(ceAuth.config.userSecret).to.equal('fds1a2sg456gfs98afd12s3f4as86df98sda');
    expect(ceAuth.config.orgSecret).to.equal('123fdsa456f4d7as89fds423fdsa489fdsa45fdsa4');
    expect(ceAuth.config.baseUrl).to.equal('http://localhost:8080');
  });

  it('throws an error when passed an invalid config', function() {
    expect(function() {
      ceAuth.setConfig('string');
    }).to.throw(Error, 'Options must be an object');

    expect(function() {
      ceAuth.setConfig(1);
    }).to.throw(Error, 'Options must be an object');

    expect(function() {
      ceAuth.setConfig(undefined);
    }).to.throw(Error, 'Options must be an object');

    expect(function() {
      ceAuth.setConfig();
    }).to.throw(Error, 'Options must be an object');
  });

  it('updates $http headers', function() {
    expect($http.defaults.headers.common.Authorization).to.be.undefined;
    ceAuth.setConfig({
      userSecret: 'fds1a2sg456gfs98afd12s3f4as86df98sda',
      orgSecret: '123fdsa456f4d7as89fds423fdsa489fdsa45fdsa4',
      baseUrl: 'http://localhost:8080'
    });
    expect($http.defaults.headers.common.Authorization).to.equal('User fds1a2sg456gfs98afd12s3f4as86df98sda, Organization 123fdsa456f4d7as89fds423fdsa489fdsa45fdsa4');
  })


});
