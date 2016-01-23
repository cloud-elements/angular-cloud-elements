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

(function ()
{
  angular
    .module('angularCloudElements.config')
    .factory('ceAuth', ceAuth);

  ceAuth.$inject = ['$http'];

  function ceAuth($http)
  {

    this.config = {
      orgSecret: '',
      userSecret: '',
      baseUrl: ''
    };

    this.setConfig = setConfig;

    function validateConfigs()
    {
      var hasUserSecret = this
        .config
        .hasOwnProperty('userSecret');
      var hasOrgSecret = this
        .config
        .hasOwnProperty('orgSecret');
      var hasBaseUrl = this
        .config
        .hasOwnProperty('baseUrl');
      if (!(hasUserSecret && hasOrgSecret && hasBaseUrl))
      {
        throw new Error("The configuration object is invalid");
      }
    }

    function setConfig(config)
    {
      if (!angular.isObject(config))
      {
        throw new Error("Options must be an object");
      }
      this.config = config;
      $http.defaults.headers = createHeaders();
    }

    function createHeaders()
    {
      var userSecret = this.config.userSecret;
      var orgSecret = this.config.orgSecret;
      var authString = "User " + userSecret + ", Organization " + orgSecret;
      return {
        "Authorization": authString,
        "Content-Type": "application/json"
      };
    }
  }

})();

(function () {
  'use strict';

  angular
    .module('angularCloudElements.services')
    .factory('ceElementService', ceElementService);

  ceElementService.$inject = ['$http', 'httpUtility', 'ceAuth'];

  function ceElementService($http, httpUtility, ceAuth) {

    ceAuth.validateConfigs();

    return {getInstances: getInstances};

    function getInstances() {
      return $http
        .get('http://localhost:8080/elements/api-v2/instances')
        .then(function (response) {
          return httpUtility.handleApiResponse(response);
        })
        .catch(function (error) {
          return httpUtility.handleApiFailure(error);
        });
    }

  }

})();

(function () {
  'use strict';

  angular
    .module('angularCloudElements.utilities')
    .factory('httpUtility', httpUtility);

  httpUtility.$inject = ['$log'];

  function httpUtility($log) {

    return {
      handleApiResponse: handleApiResponse,
      handleApiFailure: handleApiFailure
    };

    function handleApiResponse(response) {
      return response.data;
    }

    function handleApiFailure(error) {
      $log.error(error);
    }

  }

})();
