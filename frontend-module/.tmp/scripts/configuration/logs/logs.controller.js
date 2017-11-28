/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
/*@ngInject*/
angular.module('mentoringApp').controller('LogsController', function ($rootScope, $scope, LogsService) {

    // Activamos la opción de menú Configuración
    $rootScope.activeOption = "configuration";

    $scope.loggers = LogsService.findAll();

    $scope.changeLevel = function (name, level) {
        LogsService.changeLevel({ name: name, level: level }, function () {
            $scope.loggers = LogsService.findAll();
        });
    };
});
//# sourceMappingURL=logs.controller.js.map
