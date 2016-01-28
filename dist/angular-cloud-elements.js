(function (angular) {

  // Create all modules and define dependencies to make sure they exist
  // and are loaded in the correct order to satisfy dependency injection
  // before all nested files are concatenated by Gulp

  // Config
  angular.module('angularCloudElements.config', [])
      .value('angularCloudElements.config', {
          debug: true
      });

  // Modules
  angular.module('angularCloudElements.utilities', []);
  angular.module('angularCloudElements.directives', []);
  angular.module('angularCloudElements.filters', []);
  angular.module('angularCloudElements.services', []);
  angular.module('angularCloudElements',
      [
          'angularCloudElements.config',
          'angularCloudElements.utilities',
          'angularCloudElements.directives',
          'angularCloudElements.filters',
          'angularCloudElements.services'
      ]);

})(angular);

(function () {
  angular
    .module('angularCloudElements.config')
    .factory('ceAuth', ceAuth);

  ceAuth.$inject = ['httpUtility'];

  function ceAuth(httpUtility) {

    var config = {
      orgSecret: '',
      userSecret: '',
      baseUrl: ''
    };

    return {config: config, validateConfig: validateConfig, setConfig: setConfig};


    function validateConfig() {
      var hasUserSecret = this.config.hasOwnProperty('userSecret');
      var hasOrgSecret = this.config.hasOwnProperty('orgSecret');
      var hasBaseUrl = this.config.hasOwnProperty('baseUrl');
      if (!(hasUserSecret && hasOrgSecret && hasBaseUrl)) {
        throw new Error("The configuration object is invalid");
      }
    }

    function setConfig(config) {
      if (!angular.isObject(config)) {
        throw new Error("Options must be an object");
      }
      this.config = config;
      validateConfig.bind(this);
      httpUtility.setHeaders(createHeaders({userSecret: this.config.userSecret, orgSecret: this.config.orgSecret}));
      httpUtility.setBaseUrl(this.config.baseUrl);
    }

    function createHeaders(config) {
      var userSecret = config.userSecret;
      var orgSecret = config.orgSecret;
      var authString = "User " + userSecret + ", Organization " + orgSecret;
      return {"Authorization": authString, "Content-Type": "application/json"};
    }
  }

})();

(function () {
  'use strict';

  angular
    .module('angularCloudElements.services')
    .factory('ceElements', ceElements);

  ceElements.$inject = ['httpUtility', 'ceAuth'];

  function ceElements(httpUtility, ceAuth) {

    ceAuth.validateConfig();

    return {getInstances: getInstances, getInstance: getInstance};

    function getInstances() {
      return httpUtility.get("/instances");
    }

    function getInstance(instanceId) {
      return httpUtility.get("/instances/" + instanceId);
    }

  }

})();

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
