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

    return {config: config, validateConfig: validateConfig, setConfig: setConfig, clearConfig: clearConfig};

    function validateConfig() {
      var hasUserSecret = this
        .config
        .hasOwnProperty('userSecret');
      var hasOrgSecret = this
        .config
        .hasOwnProperty('orgSecret');
      var hasBaseUrl = this
        .config
        .hasOwnProperty('baseUrl');
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
      var headersFromConfig = createHeaders({userSecret: this.config.userSecret, orgSecret: this.config.orgSecret});
      httpUtility.setHeaders(headersFromConfig);
      httpUtility.setBaseUrl(this.config.baseUrl);
    }

    function clearConfig() {
      this.config = {};
      httpUtility.setHeaders({});
      httpUtility.setBaseUrl('');
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

    return {
      getInstances: getInstances,
      getInstance: getInstance,
      createInstance: createInstance,
      updateInstance: updateInstance,
      deleteInstance: deleteInstance
    };

    function getInstances() {
      return httpUtility.get('/instances');
    }

    function getInstance(instanceId) {
      return httpUtility.get('/instances/' + instanceId);
    }

    function createInstance(instance) {
      return httpUtility.post('/instances', instance);
    }

    function updateInstance(instanceId, instance) {
      return httpUtility.patch('/instances/' + instanceId, instance);
    }

    function deleteInstance(instanceId) {
      return httpUtility.delete('/instances/' + instanceId);
    }

  }

})();

(function () {
  'use strict';

  angular
    .module('angularCloudElements.services')
    .factory('ceFormulas', ceFormulas);

  ceFormulas.$inject = ['httpUtility', 'ceAuth'];

  function ceFormulas(httpUtility, ceAuth) {

    ceAuth.validateConfig();

    return {
      getFormulas: getFormulas,
      getFormula: getFormula,
      getFormulaInstances: getFormulaInstances,
      getAllFormulaInstances: getAllFormulaInstances,
      getFormulaInstance: getFormulaInstance,
      createFormulaInstance: createFormulaInstance,
      updateFormulaInstance: updateFormulaInstance,
      deleteFormulaInstance: deleteFormulaInstance,
      getAllFormulaInstanceExecutions: getAllFormulaInstanceExecutions,
      getFormulaInstanceExecutions: getFormulaInstanceExecutions,
      getFormulaInstanceExecution: getFormulaInstanceExecution
    };

    function getFormulas() {
      return httpUtility.get('/formulas');
    }

    function getFormula(formulaId) {
      return httpUtility.get('/formulas/' + formulaId);
    }

    function getFormulaInstances(formulaId) {
      return httpUtility.get('/formulas/' + formulaId + '/instances');
    }

    function getAllFormulaInstances() {
      return httpUtility.get('/formulas/instances');
    }

    function getFormulaInstance(formulaId, formulaInstanceId) {
      return httpUtility.get('/formulas/' + formulaId + '/instances/' + formulaInstanceId);
    }

    function createFormulaInstance(formulaId, formulaInstance) {
      return httpUtility.post('/formulas/' + formulaId + '/instances', formulaInstance);
    }

    function updateFormulaInstance(formulaId, formulaInstanceId, formulaInstance) {
      return httpUtility.patch('/formulas/' + formulaId + '/instances/' + formulaInstanceId, formulaInstance);
    }

    function deleteFormulaInstance(formulaId, formulaInstanceId) {
      return httpUtility.delete('/formulas/' + formulaId + '/instances/' + formulaInstanceId);
    }

    function getAllFormulaInstanceExecutions() {
      return httpUtility.get('/formulas/instances/executions');
    }

    function getFormulaInstanceExecutions(formulaId, formulaInstanceId) {
      return httpUtility.get('/formulas' + formulaId + '/instances/' + formulaInstanceId + '/executions');
    }

    function getFormulaInstanceExecution(formulaId, formulaInstanceId, executionId) {
      return httpUtility.get('/formulas' + formulaId + '/instances/' + formulaInstanceId + '/executions/' + executionId);
    }

  }

})();

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
