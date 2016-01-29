Function.prototype.bind = Function.prototype.bind || function (thisp) {
  var fn = this;
  return function () {
    return fn.apply(thisp, arguments);
  };
};

describe('httpUtility', function () {

  var ceAuth;

  beforeEach(module('angularCloudElements.utilities'));
  beforeEach(module('angularCloudElements.config'));
  beforeEach(inject(function (_httpUtility_, _$httpBackend_, _ceAuth_) {
    httpUtility = _httpUtility_;
    $httpBackend = _$httpBackend_;
    ceAuth = _ceAuth_;
    ceAuth.setConfig({baseUrl: ''});
  }));

  it('is a valid service', function () {
    expect(httpUtility).to.be.ok;
  })

  it('returns rejected promise data for errors', function () {
    $httpBackend
      .when('GET', '/error')
      .respond(400, 'failure')

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

  })

  it('can make a get request', function () {
    $httpBackend
      .expectGET('/instances')
      .respond('200');
    httpUtility.get("/instances");
    $httpBackend.flush();

  });

  it('can make a post request', function () {
    var expected;
    $httpBackend
      .expectPOST('/instances', {name: 'foo'})
      .respond(200, {name: 'foo'});
    httpUtility
      .post("/instances", {name: 'foo'})
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
      .equal({name: 'foo'});

  });

  it('can make a patch request', function () {
    var expected;
    $httpBackend
      .expectPATCH('/instances/1', {name: 'foo'})
      .respond(200, {name: 'foo'});
    httpUtility
      .patch("/instances/1", {name: 'foo'})
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
      .equal({name: 'foo'});
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
    $httpBackend.flush()
    expect(expected)
      .to
      .equal(200);
  })

});
