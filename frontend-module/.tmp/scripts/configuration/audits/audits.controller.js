/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
/*@ngInject*/
function AuditsController($rootScope, $filter, AuditsService) {

    var vm = this;

    // Activamos la opción de menú Configuración
    $rootScope.activeOption = "configuration";

    vm.onChangeDate = function () {
        var dateFormat = 'yyyy-MM-dd';
        var fromDate = $filter('date')(vm.fromDate, dateFormat);
        var toDate = $filter('date')(vm.toDate, dateFormat);

        AuditsService.findByDates(fromDate, toDate).then(function (data) {
            vm.audits = data;
        });
    };

    // Date picker configuration
    vm.today = function () {
        // Today + 1 day - needed if the current day must be included
        var today = new Date();
        vm.toDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    };

    vm.previousMonth = function () {
        var fromDate = new Date();
        if (fromDate.getMonth() === 0) {
            fromDate = new Date(fromDate.getFullYear() - 1, 0, fromDate.getDate());
        } else {
            fromDate = new Date(fromDate.getFullYear(), fromDate.getMonth() - 1, fromDate.getDate());
        }

        vm.fromDate = fromDate;
    };

    vm.today();
    vm.previousMonth();
    vm.onChangeDate();
}
angular.module('mentoringApp').controller('AuditsController', AuditsController);
//# sourceMappingURL=audits.controller.js.map
