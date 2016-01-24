(function () {
  'use strict';

  angular
    .module('angularCloudElements.services')
    .factory('ceElements', ceElements);

  ceElements.$inject = ['$http', 'httpUtility', 'ceAuth'];

  function ceElements($http, httpUtility, ceAuth) {

    ceAuth.validateConfig();

    return {getInstances: getInstances, getInstance: getInstance};

    function getInstances() {
      return $http
        .get(ceAuth.config.baseUrl + '/instances')
        .then(function (response) {
          return httpUtility.handleApiResponse(response);
        })
        .catch(function (error) {
          return httpUtility.handleApiFailure(error);
        });
    }

    function getInstance(instanceId) {
      return $http
        .get(ceAuth.config.baseUrl + '/instances/' + instanceId)
        .then(function (response) {
          return httpUtility.handleApiResponse(response);
        })
        .catch(function (error) {
          return httpUtility.handleApiFailure(error);
        })
    }

  }

})();
