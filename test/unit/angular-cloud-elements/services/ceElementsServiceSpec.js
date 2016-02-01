describe('ceElements', function () {

  var ceElements;

  beforeEach(module('angularCloudElements.utilities'));
  beforeEach(module('angularCloudElements.config'));
  beforeEach(module('angularCloudElements.services'));
  beforeEach(inject(function (_ceElements_, _$http_, _$httpBackend_, _ceAuth_) {
    ceElements = _ceElements_;
    $http = _$http_;
    $httpBackend = _$httpBackend_;
    ceAuth = _ceAuth_;
    instance = {
      "id": 5,
      "name": "pipedriv",
      "element": {
        "id": 150,
        "hub": "crm"
      },
      "configuration": {
        "base.url": "https://api.pipedrive.com/v1",
        "event.notification.enabled": "false"
      },
      "cachingEnabled": false
    };

    ceAuth.setConfig({userSecret: 'fds1a2sg456gfs98afd12s3f4as86df98sda', orgSecret: '123fdsa456f4d7as89fds423fdsa489fdsa45fdsa4', baseUrl: 'http://localhost:8080/elements/api-v2'});
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  })

  it('can make a request to retrieve all instances', function () {
    var expected;
    var instances = [
      {
        "id": 1,
        "name": "pipedriv",
        "element": {
          "id": 150,
          "hub": "crm"
        },
        "configuration": {
          "base.url": "https://api.pipedrive.com/v1",
          "event.notification.enabled": "false"
        },
        "cachingEnabled": false
      }
    ];

    $httpBackend
      .when('GET', 'http://localhost:8080/elements/api-v2/instances')
      .respond(instances);

    ceElements
      .getInstances()
      .then(function (response) {
        expected = response.data;
      });

    $httpBackend.flush();

    expect(expected)
      .to
      .deep
      .equal(instances);
  });

  it('makes a request to retrieve an instance when calling getInstance()', function () {
    var expected;

    $httpBackend
      .when('GET', 'http://localhost:8080/elements/api-v2/instances/5')
      .respond(instance);

    ceElements
      .getInstance(5)
      .then(function (response) {
        expected = response.data;
      });

    $httpBackend.flush();

    expect(expected)
      .to
      .deep
      .equal(instance);

  })

  it('makes a request to create an instance when calling createInstance()', function () {
    var expected;
    $httpBackend
      .when('POST', 'http://localhost:8080/elements/api-v2/instances', {name: 'foo'})
      .respond(200, {
        id: 1,
        name: 'foo'
      });

    ceElements.createInstance({
      name: 'foo'
    }).then(function(response) {
      expected = response.data;
    });

    $httpBackend.flush();

    expect(expected).to.deep.equal({id: 1, name: 'foo'});
  })

});