(function () {
  'use strict';

  angular
    .module('angularCloudElements.services')
    .factory('ceFormulas', ceFormulas);

  ceFormulas.$inject = ['httpUtility', 'ceAuth'];

  function ceFormulas(httpUtility, ceAuth) {

    return {
      getFormulas: getFormulas,
      getFormula: getFormula,
      getFormulaInstances: getFormulaInstances,
      getAllFormulaInstances: getAllFormulaInstances,
      getFormulaInstance: getFormulaInstance,
      createFormulaInstance: createFormulaInstance,
      updateFormulaInstance: updateFormulaInstance,
      deleteFormulaInstance: deleteFormulaInstance,
      getAllFormulaInstanceExecutions: getAllFormulaInstanceExecutions,
      getFormulaInstanceExecutions: getFormulaInstanceExecutions,
      getFormulaInstanceExecution: getFormulaInstanceExecution
    };

    function getFormulas() {
      return httpUtility.get('/formulas');
    }

    function getFormula(formulaId) {
      return httpUtility.get('/formulas/' + formulaId);
    }

    function getFormulaInstances(formulaId) {
      return httpUtility.get('/formulas/' + formulaId + '/instances');
    }

    function getAllFormulaInstances() {
      return httpUtility.get('/formulas/instances');
    }

    function getFormulaInstance(formulaId, formulaInstanceId) {
      return httpUtility.get('/formulas/' + formulaId + '/instances/' +
        formulaInstanceId);
    }

    function createFormulaInstance(formulaId, formulaInstance) {
      return httpUtility.post('/formulas/' + formulaId + '/instances',
        formulaInstance);
    }

    function updateFormulaInstance(formulaId, formulaInstanceId,
      formulaInstance) {
      return httpUtility.patch('/formulas/' + formulaId + '/instances/' +
        formulaInstanceId, formulaInstance);
    }

    function deleteFormulaInstance(formulaId, formulaInstanceId) {
      return httpUtility.delete('/formulas/' + formulaId + '/instances/' +
        formulaInstanceId);
    }

    function getAllFormulaInstanceExecutions() {
      return httpUtility.get('/formulas/instances/executions');
    }

    function getFormulaInstanceExecutions(formulaId, formulaInstanceId) {
      return httpUtility.get('/formulas/' + formulaId + '/instances/' +
        formulaInstanceId + '/executions');
    }

    function getFormulaInstanceExecution(formulaId, formulaInstanceId,
      executionId) {
      return httpUtility.get('/formulas/' + formulaId + '/instances/' +
        formulaInstanceId + '/executions/' + executionId);
    }

  }

})();