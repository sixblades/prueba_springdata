/* jshint -W097 */
/* globals angular, $, Mentoring */
'use strict';
/*@ngInject*/
function AllocationController($rootScope, $filter, $translate, EmployeeEvaluableIdResource, EmployeeLeaderResource, Allocation, Allocations, AllocationsLeader, AllocationSave, AllocationsLE) {

    var vm = this;

    vm.onNgInit = function () {
        // Activamos la opción de menú Consulta de Evaluación
        $rootScope.activeOption = 'allocation';

        vm.empleado = {};
        vm.leader = {};
        vm.asignacion = [];
        vm.fecha2 = null;

        //Obtenemos empleados y mandos
        EmployeeEvaluableIdResource.query(function (res) {
            vm.empleados = res;
        });
        EmployeeLeaderResource.query(function (res) {
            vm.leaders = res;
        });
    };

    vm.change = function () {
        var idEmployee = vm.empleado.id;
        if (Mentoring.isUndefinedOrNull(vm.leader) || Mentoring.isUndefinedOrNull(vm.leader.id)) {
            if (!Mentoring.isUndefinedOrNull(idEmployee)) {
                Allocations.query({ employeeId: idEmployee }, function (res) {
                    vm.asignaciones = res;
                });
            } else {
                vm.asignaciones = [];
            }
        } else {
            if (Mentoring.isUndefinedOrNull(idEmployee)) {
                AllocationsLeader.query({ leaderId: vm.leader.id }, function (res) {
                    vm.asignaciones = res;
                });
            } else {
                AllocationsLE.query({ leaderId: vm.leader.id, employeeId: idEmployee }, function (res) {
                    vm.asignaciones = res;
                });
            }
        }
    };

    vm.changeMando = function () {
        // If no employee selected, check if there is leader selected also
        if (Mentoring.isUndefinedOrNull(vm.empleado) || Mentoring.isUndefinedOrNull(vm.empleado.id)) {
            if (!Mentoring.isUndefinedOrNull(vm.leader) && !Mentoring.isUndefinedOrNull(vm.leader.id)) {
                AllocationsLeader.query({ leaderId: vm.leader.id }, function (res) {
                    vm.asignaciones = res;
                });
            } else {
                vm.asignaciones = [];
            }

            // Else, if employee selected, check if there is leader selected to search for thier common allocations
        } else {
                if (!Mentoring.isUndefinedOrNull(vm.leader) && !Mentoring.isUndefinedOrNull(vm.leader.id)) {
                    AllocationsLE.query({ leaderId: vm.leader.id, employeeId: vm.empleado.id }, function (res) {
                        vm.asignaciones = res;
                    });
                    // If no leader selected, search employee alocations only
                } else {
                        Allocations.query({ employeeId: vm.empleado.id }, function (res) {
                            vm.asignaciones = res;
                        });
                    }
            }
    };

    // Handles the click on New button
    vm.showNewAllocation = function () {
        vm.newAllocation = {};
        $('form').removeClass('ng-sent');

        // If there is an employee selected, preselect it on the new dialog
        if (vm.empleado) {
            vm.newAllocation.employeeId = vm.empleado.id;
        }
        // Shows the new dialog
        $('#myModalNew').modal('show');
        var d = new Date();
        vm.fecha = $filter('date')(d, $translate.instant('dateFormat'));
        vm.today = new Date();
    };

    // Saves an allocation
    vm.saveAllocation = function () {
        // First of all, check if the form is valid
        if (Mentoring.isUndefinedOrNull(vm.newAllocation.employeeId) || Mentoring.isUndefinedOrNull(vm.newAllocation.leaderId) || Mentoring.isUndefinedOrNull(vm.newAllocation.dateFrom)) {
            showModal({ msg: 'allocation.modal.new.invalid', title: 'allocation.modal.new.warning' });
            return;
        }
        AllocationSave.guardar(vm.newAllocation, function () {
            $('#myModalNew').modal('hide');
            showModal({ msg: 'allocation.modal.new.modify', title: 'allocation.modal.new.title' });
            vm.change();
        }, function (err) {
            showModal({ msg: err.data.msg });
        });
    };

    // Handles the modification of an allocation
    vm.modificar = function () {
        // Creates the object to be sent to the server
        var allocMod = vm.allocationToMod;
        var dateFrom = $filter('date')(allocMod.dateFrom, 'dd/MM/yyyy');
        var dateUntil = allocMod.dateUntil ? $filter('date')(allocMod.dateUntil, 'dd/MM/yyyy') : null;
        var allocationToSave = {
            id: allocMod.id,
            employeeId: allocMod.employeeId,
            leaderId: allocMod.leaderId,
            dateFrom: dateFrom,
            dateUntil: dateUntil
        };
        // Dispath server request
        AllocationSave.update(allocationToSave, function () {
            $('#myModalModify').modal('hide');
            showModal({ msg: 'allocation.modal.success.modify', title: 'allocation.modal.success.title' });
            vm.change();
        }, function (err) {
            var msg = 'allocation.modal.error.modify';
            if (err.data && err.data.msg) {
                msg = err.data.msg;
            }
            showModal({ msg: msg });
        });
    };

    // Handles the click on the modify icon.
    vm.obtenerId = function (allocation) {
        // Flag to show or not the select date input
        vm.showInputDate = false;
        if (Mentoring.isUndefinedOrNull(allocation.dateUntil)) {
            vm.showInputDate = true;
        }

        // Gets a copy of the allocation to mod
        vm.allocationToMod = angular.copy(allocation);
        // Shows the modify dialog
        $('#myModalModify').modal('show');
    };

    vm.cancelar = function () {
        vm.fecha = null;
    };

    var showModal = function showModal(opts) {
        vm.Modal = {
            msg: opts.msg || 'allocation.modal.error.default',
            title: opts.title || 'allocation.modal.error.title',
            button: 'allocation.modal.ok',
            action: opts.action || function () {
                $('#myModal').modal('hide');
            }
        };
        $('#myModal').modal('show');
    };
}
angular.module('mentoringApp').controller('AllocationController', AllocationController);
//# sourceMappingURL=allocation.controller.js.map
