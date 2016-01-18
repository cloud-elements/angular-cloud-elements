(function (angular) {

  // Create all modules and define dependencies to make sure they exist
  // and are loaded in the correct order to satisfy dependency injection
  // before all nested files are concatenated by Gulp

  // Config
  angular.module('angularCloudElements.config', [])
      .value('angularCloudElements.config', {
          debug: true
      });

  // Modules
  angular.module('angularCloudElements.directives', []);
  angular.module('angularCloudElements.filters', []);
  angular.module('angularCloudElements.services', []);
  angular.module('angularCloudElements',
      [
          'angularCloudElements.config',
          'angularCloudElements.directives',
          'angularCloudElements.filters',
          'angularCloudElements.services',
          'ngResource',
          'ngCookies',
          'ngSanitize'
      ]);

})(angular);
