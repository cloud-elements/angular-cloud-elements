(function ()
{
  angular
    .module('angularCloudElements.config')
    .factory('ceAuth', ceAuth);

  ceAuth.$inject = ['$http'];

  function ceAuth($http)
  {

    var config = {
      orgSecret: '',
      userSecret: '',
      baseUrl: ''
    };

    return {
      config: config,
      validateConfigs: validateConfigs,
      setConfig: setConfig
    };

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
      validateConfigs.bind(this);
      $http.defaults.headers.common = createHeaders({
        userSecret: this.config.userSecret,
        orgSecret: this.config.orgSecret
      });
    }

    function createHeaders(config)
    {
      var userSecret = config.userSecret;
      var orgSecret = config.orgSecret;
      var authString = "User " + userSecret + ", Organization " + orgSecret;
      return {
        "Authorization": authString,
        "Content-Type": "application/json"
      };
    }
  }

})();
