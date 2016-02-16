describe('ceFormulas', function () {

  var ceFormulas;
  var $http;
  var $httpBackend;
  var ceAuth;
  var instance;
  var BASE_URL;

  beforeEach(module('angularCloudElements.utilities'));
  beforeEach(module('angularCloudElements.config'));
  beforeEach(module('angularCloudElements.services'));
  beforeEach(inject(function (_ceFormulas_, _$http_, _$httpBackend_,
    _ceAuth_) {
    ceFormulas = _ceFormulas_;
    $http = _$http_;
    $httpBackend = _$httpBackend_;
    ceAuth = _ceAuth_;
    BASE_URL = 'http://localhost:8080/elements/api-v2';
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
      baseUrl: BASE_URL
    });
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('can make a request to retrieve all formula instances', function () {
    var expected;
    var instances = [{
      'id': 1,
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
    }];

    $httpBackend
      .when('GET',
        'http://localhost:8080/elements/api-v2/formulas/instances')
      .respond(instances);

    ceFormulas
      .getAllFormulaInstances()
      .then(function (response) {
        expected = response.data;
      });

    $httpBackend.flush();

    expect(expected)
      .to
      .deep
      .equal(instances);
  });

  it('makes a request to the appropriate url for getFormulaInstance()',
    function () {
      var expected;

      $httpBackend
        .expectGET(BASE_URL + '/formulas/10/instances/5')
        .respond(instance);

      ceFormulas
        .getFormulaInstance(10, 5)
        .then(function (response) {
          expected = response.data;
        });

      $httpBackend.flush();

      expect(expected)
        .to
        .deep
        .equal(instance);
    });

  it('makes a request to the appropriate url for getFormulaInstances()',
    function () {
      var expected;
      $httpBackend
        .expectGET(BASE_URL + '/formulas/15/instances')
        .respond(200);

      ceFormulas
        .getFormulaInstances(15)
        .then(function (response) {
          expected = response.status;
        });

      $httpBackend.flush();
      expect(expected)
        .to
        .equal(200);
    });

  it(
    'makes a request to the appropriate url for getAllFormulaInstanceExecutions()',
    function () {
      var expected;
      $httpBackend
        .expectGET(BASE_URL + '/formulas/instances/executions')
        .respond(200);

      ceFormulas
        .getAllFormulaInstanceExecutions()
        .then(function (response) {
          expected = response.status;
        });

      $httpBackend.flush();
      expect(expected)
        .to
        .equal(200);
    });

});