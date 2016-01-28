(function () {
  'use strict';

  angular
    .module('angularCloudElements.services')
    .factory('ceElements', ceElements);

  ceElements.$inject = ['httpUtility', 'ceAuth'];

  function ceElements(httpUtility, ceAuth) {

    ceAuth.validateConfig();

    return {getInstances: getInstances, getInstance: getInstance};

    function getInstances() {
      return httpUtility.get("/instances");
    }

    function getInstance(instanceId) {
      return httpUtility.get("/instances/" + instanceId);
    }

  }

})();
