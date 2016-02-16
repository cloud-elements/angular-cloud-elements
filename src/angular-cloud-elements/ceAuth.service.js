(function () {
  angular
    .module('angularCloudElements.config')
    .factory('ceAuth', ceAuth);

  ceAuth.$inject = ['httpUtility'];

  function ceAuth(httpUtility) {

    return {
      setConfig: setConfig,
      clearConfig: clearConfig
    };

    function setConfig(config) {
      var service = this;
      if (!angular.isObject(config)) {
        throw new Error('Configuration must be an object');
      }
      service.config = config;
      var headersFromConfig = createHeaders({
        userSecret: service.config.userSecret,
        orgSecret: service.config.orgSecret
      });
      httpUtility.setHeaders(headersFromConfig);
      httpUtility.setBaseUrl(service.config.baseUrl);
    }

    function clearConfig() {
      var service = this;
      service.config = {};
      httpUtility.setHeaders({});
      httpUtility.setBaseUrl('');
    }

    function createHeaders(config) {
      var userSecret = config.userSecret;
      var orgSecret = config.orgSecret;
      var authString = 'User ' + userSecret + ', Organization ' + orgSecret;
      return {
        'Authorization': authString,
        'Content-Type': 'application/json'
      };
    }
  }

})();