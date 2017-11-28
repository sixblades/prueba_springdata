/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
/*@ngInject*/
function ConfigurationController($rootScope, ConfigurationService) {
    
    var vm = this;
    
    // Activamos la opción de menú Configuración
    $rootScope.activeOption = 'configuration';
    
    ConfigurationService.get().then(function(configuration) {
        vm.configuration = configuration;
    });
}
angular.module('mentoringApp').controller('ConfigurationController', ConfigurationController);