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
    BASE_URL = 'http://ce.com/elements/api-v2';

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

    $httpBackend
      .when('GET',
        'http://ce.com/elements/api-v2/formulas/instances')
      .respond(200);

    ceFormulas
      .getAllFormulaInstances()
      .then(function (response) {
        expected = response.status;
      });

    $httpBackend.flush();

    expect(expected)
      .to
      .equal(200);
  });

  it('makes a request to the appropriate url for getFormulas()',
    function () {
      var expected;

      $httpBackend
        .expectGET(BASE_URL + '/formulas')
        .respond(200);

      ceFormulas
        .getFormulas()
        .then(function (response) {
          expected = response.status;
        });

      $httpBackend.flush();

      expect(expected)
        .to
        .equal(200);
    });

  it('makes a request to the appropriate url for getFormula()',
    function () {
      var expected;

      $httpBackend
        .expectGET(BASE_URL + '/formulas/8')
        .respond(200);

      ceFormulas
        .getFormula(8)
        .then(function (response) {
          expected = response.status;
        });

      $httpBackend.flush();

      expect(expected)
        .to
        .equal(200);
    });

  it('makes a request to the appropriate url for getFormulaInstance()',
    function () {
      var expected;

      $httpBackend
        .expectGET(BASE_URL + '/formulas/10/instances/5')
        .respond(200);

      ceFormulas
        .getFormulaInstance(10, 5)
        .then(function (response) {
          expected = response.status;
        });

      $httpBackend.flush();

      expect(expected)
        .to
        .equal(200);
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

  it(
    'makes a request to the appropriate url for createFormulaInstance()',
    function () {
      var expected;
      $httpBackend
        .expectPOST(BASE_URL + '/formulas/1/instances', {
          foo: 'bar'
        })
        .respond(200);

      ceFormulas
        .createFormulaInstance(1, {
          foo: 'bar'
        })
        .then(function (response) {
          expected = response.status;
        });

      $httpBackend.flush();
      expect(expected)
        .to
        .equal(200);
    });

  it(
    'makes a request to the appropriate url for updateFormulaInstance()',
    function () {
      var expected;
      $httpBackend
        .expectPATCH(BASE_URL + '/formulas/1/instances/4', {
          foo: 'bar'
        })
        .respond(200);

      ceFormulas
        .updateFormulaInstance(1, 4, {
          foo: 'bar'
        })
        .then(function (response) {
          expected = response.status;
        });

      $httpBackend.flush();
      expect(expected)
        .to
        .equal(200);
    });

  it(
    'makes a request to the appropriate url for deleteFormulaInstance()',
    function () {
      var expected;
      $httpBackend
        .expectDELETE(BASE_URL + '/formulas/1/instances/4')
        .respond(200);

      ceFormulas
        .deleteFormulaInstance(1, 4)
        .then(function (response) {
          expected = response.status;
        });

      $httpBackend.flush();
      expect(expected)
        .to
        .equal(200);
    });

  it(
    'makes a request to the appropriate url for getFormulaInstanceExecution()',
    function () {
      var expected;
      $httpBackend
        .expectGET(BASE_URL + '/formulas/1/instances/4/executions/456')
        .respond(200);

      ceFormulas
        .getFormulaInstanceExecution(1, 4, 456)
        .then(function (response) {
          expected = response.status;
        });

      $httpBackend.flush();
      expect(expected)
        .to
        .equal(200);
    });

  it(
    'makes a request to the appropriate url for getFormulaInstanceExecutions()',
    function () {
      var expected;
      $httpBackend
        .expectGET(BASE_URL + '/formulas/1/instances/4/executions')
        .respond(200);

      ceFormulas
        .getFormulaInstanceExecutions(1, 4)
        .then(function (response) {
          expected = response.status;
        });

      $httpBackend.flush();
      expect(expected)
        .to
        .equal(200);
    });
});