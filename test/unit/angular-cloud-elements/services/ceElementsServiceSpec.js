describe('ceElements', function () {

  var ceElements;
  var $http;
  var $httpBackend;
  var ceAuth;
  var instance;

  beforeEach(module('angularCloudElements.utilities'));
  beforeEach(module('angularCloudElements.config'));
  beforeEach(module('angularCloudElements.services'));
  beforeEach(inject(function ($injector) {
    ceElements = $injector.get('ceElements');
    $http = $injector.get('$http');
    $httpBackend = $injector.get('$httpBackend');
    ceAuth = $injector.get('ceAuth');
    instance = {
      'id': 5,
      'name': 'pipedriv',
      'element': {
        'id': 150,
        'hub': 'crm'
      },
      'configuration': {
        'base.url': 'https://api.pipedrive.com/v1',
        'event.notification.enabled': 'false'
      },
      'cachingEnabled': false
    };

    ceAuth.setConfig({
      userSecret: 'fds1a2sg456gfs98afd12s3f4as86df98sda',
      orgSecret: '123fdsa456f4d7as89fds423fdsa489fdsa45fdsa4',
      baseUrl: 'http://ce.com/elements/api-v2'
    });
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('can make a request to retrieve all instances', function () {
    var expected;

    $httpBackend
      .when('GET', 'http://ce.com/elements/api-v2/instances')
      .respond(200);

    ceElements
      .getInstances()
      .then(function (response) {
        expected = response.status;
      });

    $httpBackend.flush();

    expect(expected)
      .to
      .equal(200);
  });

  it('makes a request to retrieve an instance when calling getInstance()',
    function () {
      var expected;

      $httpBackend
        .when('GET', 'http://ce.com/elements/api-v2/instances/5')
        .respond(200);

      ceElements
        .getInstance(5)
        .then(function (response) {
          expected = response.status;
        });

      $httpBackend.flush();

      expect(expected)
        .to
        .equal(200);

    });

  it('makes a request to create an instance when calling createInstance()',
    function () {
      var expected;
      var status;
      $httpBackend
        .when('POST', 'http://ce.com/elements/api-v2/instances', {
          name: 'foo'
        })
        .respond(200, {
          id: 1,
          name: 'foo'
        });

      ceElements
        .createInstance({
          name: 'foo'
        })
        .then(function (response) {
          expected = response.data;
          status = response.status;
        });

      $httpBackend.flush();

      expect(expected)
        .to
        .deep
        .equal({
          id: 1,
          name: 'foo'
        });

      expect(status)
        .to.equal(200);

    });

  it('makes a request to update an instance when calling updateInstance()',
    function () {
      var expected;
      var status;
      $httpBackend
        .when('PATCH', 'http://ce.com/elements/api-v2/instances/1', {
          name: 'bar'
        })
        .respond(200, {
          id: 1,
          name: 'bar'
        });

      ceElements
        .updateInstance(1, {
          name: 'bar'
        })
        .then(function (response) {
          expected = response.data;
          status = response.status;
        });

      $httpBackend.flush();

      expect(expected)
        .to
        .deep
        .equal({
          id: 1,
          name: 'bar'
        });

      expect(status)
        .to.equal(200);

    });

  it('makes a request to delete an instance when calling deleteInstance()',
    function () {
      var status;
      $httpBackend
        .when('DELETE', 'http://ce.com/elements/api-v2/instances/1')
        .respond(200);

      ceElements
        .deleteInstance(1)
        .then(function (response) {
          status = response.status;
        });

      $httpBackend.flush();

      expect(status)
        .to.equal(200);
    });
});