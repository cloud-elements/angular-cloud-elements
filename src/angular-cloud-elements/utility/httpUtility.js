(function () {
  'use strict';

  angular
    .module('angularCloudElements.utilities')
    .factory('httpUtility', httpUtility);

  httpUtility.$inject = ['$log', '$http'];

  function httpUtility($log, $http) {

    var headers;
    var baseUrl;

    return {
      handleApiResponse: handleApiResponse,
      handleApiFailure: handleApiFailure,
      setHeaders: setHeaders,
      setBaseUrl: setBaseUrl,
      getHeaders: getHeaders,
      getBaseUrl: getBaseUrl,
      get: get
    };

    function getHeaders() {
      return this.headers;
    }

    function getBaseUrl() {
      return this.baseUrl;
    }

    function get(url) {
      return $http({
        method: 'GET',
        url: this.baseUrl + url
      }).then(function(response) {
        return handleApiResponse(response);
      }).catch(function(error) {
        return handleApiFailure(error);
      });
    }

    function setHeaders(headers) {
      this.headers = headers;
    };

    function setBaseUrl(baseUrl) {
      this.baseUrl = baseUrl;
    }

    function handleApiResponse(response) {
      return response.data;
    }

    function handleApiFailure(error) {
      $log.error(error);
    }

  }

})();
