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
          'angularCloudElements.services',
          'ngResource',
          'ngCookies',
          'ngSanitize'
      ]);

})(angular);

angular
  .module('angularCloudElements')
  .provider('CloudElements', CloudElements);

function CE(options) {
  this.options = options;
  this.getUserSecret = function() {
    return this.options.userSecret;
  }
  this.getBaseUrl = function() {
    return this.options.baseUrl;
  }
}

function CloudElements() {

  this.options = {
    orgSecret: '',
    userSecret: '',
    baseUrl: 'http://localhost:8080/elements/api-v2'
  };

  this.setOptions = function (options) {
    if (!angular.isObject(options)) {
      throw new Error("Options must be an object");
    }
    this.options = options;
  };

  this.$get = [function () {
      return new CE(this.options);
    }
  ];

}

(function () {
  'use strict';

  angular
    .module('angularCloudElements.services')
    .factory('ElementService', ElementService);

  ElementService.$inject = ['$http', 'Utility'];

  function ElementService($http, Utility) {

    return {getInstances: getInstances};

    function getInstances() {
      return $http
        .get('http://localhost:8080/elements/api-v2/instances')
        .then(function(response) {
          return Utility.handleApiResponse(response);
        })
        .catch(function(error) {
          return Utility.handleApiFailure(error);
        });
    }

  }

})();

(function () {
  'use strict';

  angular
    .module('angularCloudElements.utilities')
    .factory('Utility', Utility);

  Utility.$inject = ['$log'];

  function Utility($log) {

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
