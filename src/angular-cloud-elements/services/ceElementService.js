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
