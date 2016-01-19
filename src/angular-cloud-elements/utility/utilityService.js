(function () {
  'use strict';

  angular
    .module('angularCloudElements.utilities')
    .factory('Utility', Utility);

  Utility.$inject = ['$log'];

  function Utility($log) {

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
