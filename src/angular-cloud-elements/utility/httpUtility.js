(function () {
  'use strict';

  angular
    .module('angularCloudElements.utilities')
    .factory('httpUtility', httpUtility);

  httpUtility.$inject = ['$log', '$http', '$q'];

  function httpUtility($log, $http, $q) {

    var headers;
    var baseUrl;

    return {
      setHeaders: setHeaders,
      setBaseUrl: setBaseUrl,
      getHeaders: getHeaders,
      getBaseUrl: getBaseUrl,
      get: get,
      post: post,
      delete: destroy,
      patch: patch,
      put: put
    };

    function get(url) {
      var defer = $q.defer();
      var promise = $http({
        method: 'GET',
        headers: this.headers,
        url: this.baseUrl + url
      }).then(function(response) {
        defer.resolve(response);
      }).catch(function(error) {
        $log.error(error);
        defer.reject(error);
      });
      return defer.promise;
    }

    function post(url, body) {
      var defer = $q.defer();
      var promise = $http({
        method: 'POST',
        headers: this.headers,
        url: this.baseUrl + url,
        data: body
      }).then(function(response) {
        defer.resolve(response);
      }).catch(function(error) {
        $log.error(error);
        defer.reject(error);
      });
      return defer.promise;
    }

    function patch(url, body) {
      var defer = $q.defer();
      var promise = $http({
        method: 'PATCH',
        headers: this.headers,
        url: this.baseUrl + url,
        data: body
      }).then(function(response) {
        defer.resolve(response);
      }).catch(function(error) {
        $log.error(error);
        defer.reject(error);
      });
      return defer.promise;
    }

    function destroy(url) {
      var defer = $q.defer();
      var promise = $http({
        method: 'DELETE',
        headers: this.headers,
        url: this.baseUrl + url
      }).then(function(response) {
        defer.resolve(response);
      }).catch(function(error) {
        $log.error(error);
        defer.reject(error);
      });
      return defer.promise;
    }

    function put(url, body) {
      var defer = $q.defer();
      var promise = $http({
        method: 'PUT',
        headers: this.headers,
        url: this.baseUrl + url,
        data: body
      }).then(function(response) {
        defer.resolve(response);
      }).catch(function(error) {
        $log.error(error);
        defer.reject(error);
      });
      return defer.promise;
    }

    function getHeaders() {
      return this.headers;
    }

    function getBaseUrl() {
      return this.baseUrl;
    }

    function setHeaders(headers) {
      this.headers = headers;
    }

    function setBaseUrl(baseUrl) {
      this.baseUrl = baseUrl;
    }
  }

})();
