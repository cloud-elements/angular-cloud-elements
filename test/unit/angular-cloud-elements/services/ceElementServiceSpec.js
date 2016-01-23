describe('ceElementService', function () {

  var ceElementService;

  beforeEach(module('angularCloudElements.utilities'));
  beforeEach(module('angularCloudElements.config'));
  beforeEach(module('angularCloudElements.services'));
  beforeEach(inject(function (_ceElementService_, _$http_, _$httpBackend_, _ceAuth_) {
    ceElementService = _ceElementService_;
    $http = _$http_;
    $httpBackend = _$httpBackend_;
    ceAuth = _ceAuth_;

    ceAuth.setConfig({
      userSecret: 'fds1a2sg456gfs98afd12s3f4as86df98sda',
      orgSecret: '123fdsa456f4d7as89fds423fdsa489fdsa45fdsa4',
      baseUrl: 'http://localhost:8080'
    });

    instances = ceElementService.getInstances();
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  })

  it('can make a request to retrieve all instances', function() {
    var response;
    var expected = {
      foo: 'bar'
    };
    $httpBackend.when('GET', 'http://localhost:8080/instances')
    .respond({
      foo: 'bar'
    });
    instances.then(function(data) {
      response = data;
    });
    $httpBackend.flush();
    expect(response).to.deep.equal(expected);
  })

});
