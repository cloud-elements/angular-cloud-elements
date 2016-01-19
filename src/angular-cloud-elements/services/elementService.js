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
