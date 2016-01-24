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

    ceAuth.setConfig({userSecret: 'fds1a2sg456gfs98afd12s3f4as86df98sda', orgSecret: '123fdsa456f4d7as89fds423fdsa489fdsa45fdsa4', baseUrl: 'http://localhost:8080/elements/api-v2'});

    instances = [
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

    instance = {
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
    };

  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  })

  it('can make a request to retrieve all instances', function () {
    var response;

    $httpBackend
      .when('GET', 'http://localhost:8080/elements/api-v2/instances')
      .respond(instances);

    ceElements
      .getInstances()
      .then(function (data) {
        response = data;
      });

    $httpBackend.flush();

    expect(response)
      .to
      .deep
      .equal(instances);
  });

  it('can make a request to retrieve an instance by id', function () {
    var response;

    $httpBackend
      .when('GET', 'http://localhost:8080/elements/api-v2/instances/5')
      .respond(instance);

    ceElements
      .getInstance(5)
      .then(function (data) {
        response = data;
      });

    $httpBackend.flush();

    expect(response)
      .to
      .deep
      .equal(instance);
  })

});
