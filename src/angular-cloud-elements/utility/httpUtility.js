(function () {
  'use strict';

  angular
    .module('angularCloudElements.utilities')
    .factory('httpUtility', httpUtility);

  httpUtility.$inject = ['$log'];

  function httpUtility($log) {

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
