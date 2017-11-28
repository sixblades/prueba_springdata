/* jshint -W097 */
/* globals angular, $, Mentoring */
'use strict';
/*@ngInject*/
function AllocationController($rootScope, $filter, $translate, EmployeeEvaluableIdResource,
    EmployeeLeaderResource, Allocation, Allocations, AllocationsLeader, AllocationSave, AllocationsLE) {

    var vm = this;

    vm.onNgInit = () => {
        // Activamos la opción de menú Consulta de Evaluación
        $rootScope.activeOption = 'allocation';
        
        vm.empleado = {};
        vm.leader = {};
        vm.asignacion = [];
        vm.fecha2 = null;

        //Obtenemos empleados y mandos
        EmployeeEvaluableIdResource.query((res) => {
            vm.empleados = res;
        });
        EmployeeLeaderResource.query((res) => {
            vm.leaders = res;
        });
    }

    vm.change = () => {
        let idEmployee = vm.empleado.id;
        if (Mentoring.isUndefinedOrNull(vm.leader) || Mentoring.isUndefinedOrNull(vm.leader.id)) {
            if (!Mentoring.isUndefinedOrNull(idEmployee)) {
                Allocations.query({employeeId: idEmployee}, (res) => {
                    vm.asignaciones = res;
                });
            } else {
                vm.asignaciones = [];
            }
        } else {
            if (Mentoring.isUndefinedOrNull(idEmployee)) {
                AllocationsLeader.query({leaderId: vm.leader.id}, (res) => {
                    vm.asignaciones = res;
                });
            }
            else {
                AllocationsLE.query({leaderId: vm.leader.id, employeeId: idEmployee }, (res) => {
                    vm.asignaciones = res;
                });
            }
        }
    };

    vm.changeMando = () => {
        // If no employee selected, check if there is leader selected also
        if (Mentoring.isUndefinedOrNull(vm.empleado) || Mentoring.isUndefinedOrNull(vm.empleado.id)) {
            if (!Mentoring.isUndefinedOrNull(vm.leader) && !Mentoring.isUndefinedOrNull(vm.leader.id)) {
                AllocationsLeader.query({ leaderId: vm.leader.id }, (res) => {
                    vm.asignaciones = res;
                });
            } else {
                vm.asignaciones = [];
            }
        
        // Else, if employee selected, check if there is leader selected to search for thier common allocations
        } else {
            if (!Mentoring.isUndefinedOrNull(vm.leader) && !Mentoring.isUndefinedOrNull(vm.leader.id)) {
                AllocationsLE.query({ leaderId: vm.leader.id, employeeId: vm.empleado.id }, (res) => {
                    vm.asignaciones = res;
                });
                // If no leader selected, search employee alocations only
            } else {
                Allocations.query({employeeId: vm.empleado.id }, (res) => {
                    vm.asignaciones = res;
                });
            }
        }
    };

    // Handles the click on New button
    vm.showNewAllocation = () => {
        vm.newAllocation = {};
        $('form').removeClass('ng-sent');
       
        // If there is an employee selected, preselect it on the new dialog
        if(vm.empleado) {
            vm.newAllocation.employeeId = vm.empleado.id;
        }
        // Shows the new dialog
        $('#myModalNew').modal('show');
        let d = new Date();
        vm.fecha = $filter('date')(d, $translate.instant('dateFormat'));
        vm.today = new Date();
    };
    
    // Saves an allocation
    vm.saveAllocation = () => {
        // First of all, check if the form is valid
        if(Mentoring.isUndefinedOrNull(vm.newAllocation.employeeId) || Mentoring.isUndefinedOrNull(vm.newAllocation.leaderId) 
            || Mentoring.isUndefinedOrNull(vm.newAllocation.dateFrom)) {
            showModal({msg:'allocation.modal.new.invalid', title: 'allocation.modal.new.warning'});
            return;
        }
        AllocationSave.guardar(vm.newAllocation, () =>  {
            $('#myModalNew').modal('hide');
            showModal({msg:'allocation.modal.new.modify', title: 'allocation.modal.new.title'});
            vm.change();
        }, (err) => {
            showModal({msg:err.data.msg});
        });
    };

    // Handles the modification of an allocation
    vm.modificar = () => {
        // Creates the object to be sent to the server
        let allocMod = vm.allocationToMod;
        let dateFrom = $filter('date')(allocMod.dateFrom, 'dd/MM/yyyy');
        let dateUntil = allocMod.dateUntil ? $filter('date')(allocMod.dateUntil, 'dd/MM/yyyy') : null;
        let allocationToSave = {
            id: allocMod.id,
            employeeId: allocMod.employeeId,
            leaderId: allocMod.leaderId,
            dateFrom,
            dateUntil
        };
        // Dispath server request
        AllocationSave.update(allocationToSave, () => {
            $('#myModalModify').modal('hide');
            showModal({msg:'allocation.modal.success.modify', title: 'allocation.modal.success.title'});
            vm.change();
        }, (err) => { 
            let msg = 'allocation.modal.error.modify';
            if (err.data && err.data.msg) {
                msg = err.data.msg;
            }
            showModal({msg});
        });
    };

    // Handles the click on the modify icon.
    vm.obtenerId = (allocation) => {
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

    vm.cancelar = () => {
        vm.fecha = null;
    };
    
    var showModal = (opts) => {
        vm.Modal = {
            msg: opts.msg || 'allocation.modal.error.default',
            title: opts.title || 'allocation.modal.error.title',
            button: 'allocation.modal.ok',
            action: opts.action || (() => {
                $('#myModal').modal('hide');
            })
        };
        $('#myModal').modal('show');
    }
}
angular.module('mentoringApp').controller('AllocationController', AllocationController);
