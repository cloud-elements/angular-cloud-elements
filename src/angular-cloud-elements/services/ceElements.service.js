(function () {
  'use strict';

  angular
    .module('angularCloudElements.services')
    .factory('ceElements', ceElements);

  ceElements.$inject = ['httpUtility', 'ceAuth'];

  function ceElements(httpUtility, ceAuth) {

    return {
      getInstances: getInstances,
      getInstance: getInstance,
      createInstance: createInstance,
      updateInstance: updateInstance,
      deleteInstance: deleteInstance
    };

    function getInstances() {
      return httpUtility.get('/instances');
    }

    function getInstance(instanceId) {
      return httpUtility.get('/instances/' + instanceId);
    }

    function createInstance(instance) {
      return httpUtility.post('/instances', instance);
    }

    function updateInstance(instanceId, instance) {
      return httpUtility.patch('/instances/' + instanceId, instance);
    }

    function deleteInstance(instanceId) {
      return httpUtility.delete('/instances/' + instanceId);
    }

  }

})();