/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
/*@ngInject*/
function EmployeesEvaluationsController($rootScope, $state, $translate, Principal, Directions, Areas, EmployeesEvaluationService) {
    var vm = this;
    $rootScope.activeOption = 'consult';

    vm.onNgInit = function () {
        if ($state.current.name != 'login') {
            // Check if the user is authenticated before doing anything
            Principal.identity().then(function () {
                if (!Principal.isAuthenticated) {
                    $state.go('login');
                }
                // Obtains all the directions
                Directions.query({}, function (res) {
                    vm.directions = res;
                }, function (err) {
                    showModal(function () {
                        $state.go('home');
                    });
                });

                // Creates the year array. The first year will always be 2015.
                var firstYear = 2015;
                var date = new Date();
                vm.years = [];
                while (firstYear <= date.getFullYear()) {
                    vm.years.push(firstYear);
                    firstYear++;
                }
            },
            // If not authenticated, forward to login page
            function (err) {
                $state.go('login');
            });
        }
    };

    // Handles the changes on direction combo
    vm.changeDirection = function () {
        vm.showTable = false;
        // First check if it's not an empty value
        if (!Mentoring.isUndefinedOrNull(vm.direction)) {
            // Then, obtain the direction's areas
            Areas.getDirectionAreas({ directionId: vm.direction }, function (res) {
                vm.areas = res;
            }, function (err) {
                showModal(function () {
                    $('#myModal').modal('hide');
                });
            });
        }
    };

    // Handles the changes on years combo
    vm.changeYear = function () {
        vm.showTable = false;
        if (!Mentoring.isUndefinedOrNull(vm.year) && !Mentoring.isUndefinedOrNull(vm.area)) {
            // Dispatch server request
            getResults();
        }
    };

    // Handles the changes on area combo
    vm.changeArea = function () {
        vm.showTable = false;
        // First check if it's not an empty value
        if (!Mentoring.isUndefinedOrNull(vm.area)) {
            // If there is no year selected, autoselect current year
            if (Mentoring.isUndefinedOrNull(vm.year)) {
                var date = new Date();
                vm.year = date.getFullYear();
            }
            // Dispatch the server request
            getResults();
        }
    };

    // Dispatch server request to obtain the data
    var getResults = function getResults() {
        EmployeesEvaluationService.get({ areaId: vm.area, year: vm.year }, function (res) {
            vm.showTable = true;
            res.map(processResults);
            vm.evaluations = res;
        }, function (err) {
            showModal(function () {
                $('#myModal').modal('hide');
            });
        });
    };

    // Handles the visualization of the controller Modal
    var showModal = function showModal(action) {
        vm.Modal = {
            msg: 'employeesEvaluation.modal.error',
            title: 'employeesEvaluation.modal.error.title',
            button: 'employeesEvaluation.modal.ok',
            action: action
        };
        $('#myModal').modal('show');
    };

    // Handles each result of the server request. This function do some process on each result before they are shown
    // to the user
    var processResults = function processResults(r) {
        // First, obtain the emplyee's full name
        var employee = r.employee;
        r.employee.name = employee.firstSurname + ' ' + employee.secondSurname + ', ' + employee.name;

        // Obtains the self evaluation label text and its class
        var selfEvalKey = 'employeesEvaluation.tabla.';
        if (r.selfEvaluation) {
            selfEvalKey += 'si';
            r.selfEvaluationClass = 'circle-green';
        } else {
            selfEvalKey += 'no';
            r.selfEvaluationClass = 'circle-red';
        }
        r.selfEvaluation = $translate.instant(selfEvalKey);

        // Same for final evaluation
        var finalEvalKey = 'employeesEvaluation.tabla.';
        if (r.finalEvaluation) {
            finalEvalKey += 'si';
            r.finalEvaluationClass = 'circle-green';
        } else {
            finalEvalKey += 'no';
            r.finalEvaluationClass = 'circle-red';
        }
        r.finalEvaluation = $translate.instant(finalEvalKey);
    };

    vm.onNgInit();
};
angular.module('mentoringApp').controller('EmployeesEvaluationsController', EmployeesEvaluationsController);
//# sourceMappingURL=employeesEvaluation.controller.js.map
