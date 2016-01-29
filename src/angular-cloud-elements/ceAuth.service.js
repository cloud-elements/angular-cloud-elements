(function ()
{
  angular
    .module('angularCloudElements.config')
    .factory('ceAuth', ceAuth);

  ceAuth.$inject = ['httpUtility'];

  function ceAuth(httpUtility)
  {

    var config = {
      orgSecret: '',
      userSecret: '',
      baseUrl: ''
    };

    return {
      config: config,
      validateConfig: validateConfig,
      setConfig: setConfig,
      clearConfig: clearConfig
    };

    function validateConfig()
    {
      var hasUserSecret = this.config.hasOwnProperty('userSecret');
      var hasOrgSecret = this.config.hasOwnProperty('orgSecret');
      var hasBaseUrl = this.config.hasOwnProperty('baseUrl');
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
      validateConfig.bind(this);
      httpUtility.setHeaders(createHeaders(
      {
        userSecret: this.config.userSecret,
        orgSecret: this.config.orgSecret
      }));
      httpUtility.setBaseUrl(this.config.baseUrl);
    }

    function clearConfig()
    {
      this.config = {};
      httpUtility.setHeaders(
      {});
      httpUtility.setBaseUrl('');
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
