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