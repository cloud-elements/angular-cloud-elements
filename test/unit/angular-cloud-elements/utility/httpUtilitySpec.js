describe('httpUtility', function () {

  var ceAuth;
  var httpUtility;
  var $httpBackend;

  beforeEach(module('angularCloudElements.utilities'));
  beforeEach(module('angularCloudElements.config'));
  beforeEach(inject(function (_httpUtility_, _$httpBackend_, _ceAuth_) {
    httpUtility = _httpUtility_;
    $httpBackend = _$httpBackend_;
    ceAuth = _ceAuth_;
    ceAuth.setConfig({
      baseUrl: ''
    });
  }));

  it('is a valid service', function () {
    expect(httpUtility)
      .to.be.ok;
  });

  it('returns rejected promise data for GET errors', function () {
    $httpBackend
      .when('GET', '/error')
      .respond(400, 'failure');

    var expected;

    httpUtility
      .get('/error')
      .then(function (response) {})
      .catch(function (error) {
        expected = error.data;
      });

    $httpBackend.flush();

    expect(expected)
      .to
      .equal('failure');

  });

  it('returns rejected promise data for DELETE errors', function () {
    $httpBackend
      .when('DELETE', '/error')
      .respond(400, 'failure');

    var expected;

    httpUtility
      .delete('/error')
      .then(function (response) {})
      .catch(function (error) {
        expected = error.data;
      });

    $httpBackend.flush();

    expect(expected)
      .to
      .equal('failure');

  });

  it('returns rejected promise data for PUT errors', function () {
    $httpBackend
      .when('PUT', '/error')
      .respond(400, 'failure');

    var expected;

    httpUtility
      .put('/error')
      .then(function (response) {})
      .catch(function (error) {
        expected = error.data;
      });

    $httpBackend.flush();

    expect(expected)
      .to
      .equal('failure');

  });

  it('returns rejected promise data for PATCH errors', function () {
    $httpBackend
      .when('PATCH', '/error')
      .respond(400, 'failure');

    var expected;

    httpUtility
      .patch('/error')
      .then(function (response) {})
      .catch(function (error) {
        expected = error.data;
      });

    $httpBackend.flush();

    expect(expected)
      .to
      .equal('failure');

  });
  it('returns rejected promise data for POST errors', function () {
    $httpBackend
      .when('POST', '/error')
      .respond(400, 'failure');

    var expected;

    httpUtility
      .post('/error')
      .then(function (response) {})
      .catch(function (error) {
        expected = error.data;
      });

    $httpBackend.flush();

    expect(expected)
      .to
      .equal('failure');

  });

  it('can make a get request', function () {
    $httpBackend
      .expectGET('/instances')
      .respond('200');
    httpUtility.get('/instances');
    $httpBackend.flush();

  });

  it('can make a post request', function () {
    var expected;
    var code;
    $httpBackend
      .expectPOST('/instances', {
        name: 'foo'
      })
      .respond(200, {
        name: 'foo'
      });
    httpUtility
      .post('/instances', {
        name: 'foo'
      })
      .then(function (response) {
        code = response.status;
        expected = response.data;
      });
    $httpBackend.flush();
    expect(code)
      .to
      .equal(200);
    expect(expected)
      .to
      .deep
      .equal({
        name: 'foo'
      });

  });

  it('can make a put request', function () {
    var expected;
    var code;
    $httpBackend
      .expectPUT('/instances/1', {
        name: 'foo'
      })
      .respond(200, {
        name: 'foo'
      });
    httpUtility
      .put('/instances/1', {
        name: 'foo'
      })
      .then(function (response) {
        code = response.status;
        expected = response.data;
      });
    $httpBackend.flush();
    expect(code)
      .to
      .equal(200);
    expect(expected)
      .to
      .deep
      .equal({
        name: 'foo'
      });
  });

  it('can make a patch request', function () {
    var expected;
    var code;
    $httpBackend
      .expectPATCH('/instances/1', {
        name: 'foo'
      })
      .respond(200, {
        name: 'foo'
      });
    httpUtility
      .patch('/instances/1', {
        name: 'foo'
      })
      .then(function (response) {
        code = response.status;
        expected = response.data;
      });
    $httpBackend.flush();
    expect(code)
      .to
      .equal(200);
    expect(expected)
      .to
      .deep
      .equal({
        name: 'foo'
      });
  });

  it('can make a delete request', function () {
    var expected;
    $httpBackend
      .expectDELETE('/instances/1')
      .respond(200);
    httpUtility
      .delete('/instances/1')
      .then(function (response) {
        expected = response.status;
      });
    $httpBackend.flush();
    expect(expected)
      .to
      .equal(200);
  });

  it('can set the headers for a request', function () {
    var expected;
    $httpBackend
      .expectGET('/instances', function (headers) {
        return headers['Authorization'] === 'foo';
      })
      .respond(200);

    httpUtility.setHeaders({
      'Authorization': 'foo'
    });

    httpUtility.get('/instances')
      .then(function (response) {
        expected = response.status;
      });

    $httpBackend.flush();

    expect(httpUtility.getHeaders())
      .to.deep.equal({
        'Authorization': 'foo'
      });

    expect(expected)
      .to.equal(200);

  });

});