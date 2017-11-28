/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
/*@ngInject*/
function ConsultController($rootScope, $state, $q, $previousState, $stateParams, Principal, EvaluationsCn, EmpleadosCn, EvaluationsAllEmployees, isEvaluationDate, isFinalEvaluationDate, EvaluationYear, EvaluationsMandoCn, EvaluationsConsultLeader, EmployeeEvaluationResource, EvaluationEmployeeLeaderResource, EmployeeEvaluableIdResource, EmployeeLeaderResource, EmployeesDIRECTOR, LeadersDIRECTOR, EmployeesGERENTE, LeadersGERENTE, EmployeesRRHH, LeadersRRHH, SharingEvaluationService, IsModificableService) {

    var vm = this;

    var prevState = $previousState.get('consult');
    if ($state.current.name != 'login') {
        Principal.identity().then(function (account) {
            // Activamos la opción de menú Consulta de Evaluación
            $rootScope.activeOption = "consult";
            vm.account = account;
            vm.user = {
                firstName: account.firstName,
                lastName: account.lastName
            };
            vm.esModificable = true;

            if (!Mentoring.isUndefinedOrNull(account) && !Mentoring.isUndefinedOrNull(account.roles)) {
                vm.leader = {};
                vm.evaluation = {};
                vm.empleado = {};
                vm.empleadoLeaderUser = {};
                vm.isLeader = account.isLeader;
                vm.roleUSER = account.roles.indexOf('ROLE_USER') > -1;
                vm.roleRRHH = account.roles.indexOf('ROLE_RRHH') > -1;
                vm.roleGERENTE = account.roles.indexOf('ROLE_GERENTE') > -1;
                vm.roleDIRECTOR = account.roles.indexOf('ROLE_DIRECTOR') > -1;
                vm.roleDIRECTORG = account.roles.indexOf('ROLE_DIRECTORG') > -1;
                vm.roleADMIN = account.roles.indexOf('ROLE_ADMIN') > -1;

                isEvaluationDate.get(function (isDate) {
                    vm.isEvaluationDate = isDate.value;
                });
                isFinalEvaluationDate.get(function (isDate) {
                    vm.isFinalEvaluationDate = isDate.value;
                });

                // Obtains the evaluation's period year
                EvaluationYear.get(function (res) {
                    vm.evaluationYear = res.value;
                });

                vm.isVisibleEvaluator = !(vm.roleGERENTE || vm.roleDIRECTOR);

                if (vm.isLeader || vm.roleRRHH || vm.roleGERENTE || vm.roleDIRECTOR || vm.roleDIRECTORG || vm.roleADMIN) {
                    if (vm.isLeader && !(vm.roleRRHH || vm.roleGERENTE || vm.roleDIRECTOR || vm.roleDIRECTORG || vm.roleADMIN)) {
                        vm.isVisibleLeader = false;
                    } else {
                        vm.isVisibleLeader = true;
                    }
                    vm.isVisible = true;
                } else {
                    vm.isVisible = false;
                    vm.isVisibleLeader = false;
                }

                if (vm.roleUSER && !(vm.roleRRHH || vm.roleGERENTE || vm.roleDIRECTOR || vm.roleDIRECTORG || vm.roleADMIN)) {
                    if (vm.isLeader === 0) {
                        vm.evaluations = EvaluationsAllEmployees.query({
                            employeeId: account.employeeId
                        });
                    } else {
                        vm.empleadosLeaderUser = EvaluationsConsultLeader.query({
                            leaderId: account.employeeId
                        }, function (result) {

                            // Once we have the users, check if there is a previously selected employee
                            if (prevState && prevState.params.empleado) {
                                // Obtains the employee from the list of employees
                                var employeeLeader = result.filter(function (ev) {
                                    if (ev.employeeId === prevState.params.empleado) {
                                        return ev;
                                    }
                                });
                                if (employeeLeader.length > 0) {
                                    vm.empleadoLeaderUser.info = employeeLeader[0];
                                }
                                // If no employee has been found, it's because the leader has selected its own evaluation
                                // so we call the combo's change value method anyway
                                vm.changeLeaderUser();
                                return;
                            }
                            // If there is no previous employee, obtains all
                            vm.evaluations = EvaluationsAllEmployees.query({
                                employeeId: account.employeeId
                            });
                        });
                    }
                    vm.esModificable = false;
                }

                if (vm.roleADMIN || vm.roleDIRECTORG) {
                    var promises = [];
                    promises.push(EmployeeEvaluableIdResource.query({}, function (result) {
                        vm.empleados = result;
                        // Once we have the users, check if there is a previously selected employee
                        if (prevState && prevState.params.empleado) {
                            // Obtains the employee from the list of employees
                            var employee = result.filter(function (ev) {
                                if (ev.id === prevState.params.empleado) {
                                    return ev;
                                }
                            });
                            // Set the employee as the combo value
                            if (employee.length > 0) {
                                vm.empleado.info = employee[0];
                            }
                        }
                    }).$promise);
                    promises.push(EmployeeLeaderResource.query({}, function (result) {
                        vm.leaders = result;
                        // Once we have the users, check if there is a previously selected employee
                        if (prevState && prevState.params.leader) {
                            // Obtains the employee from the list of employees
                            var employee = result.filter(function (ev) {
                                if (ev.id === prevState.params.leader.id) {
                                    return ev;
                                }
                            });
                            // Set the employee as the combo value
                            if (employee.length > 0) {
                                vm.leader.info = employee[0];
                            }
                        }
                    }).$promise);

                    // Once all the request have finished, do the combo selection
                    $q.all(promises).then(function () {
                        // If there is a selected employee, only when we come back for consultEvaluation state
                        if (vm.empleado.info) {
                            vm.change(vm.empleado.info.id);
                        }
                    });
                }

                if (vm.roleDIRECTOR) {
                    vm.empleados = EmployeesDIRECTOR.query({
                        directionId: account.employeeId
                    });
                    vm.leaders = LeadersDIRECTOR.query({
                        directionId: account.employeeId
                    });
                    vm.esModificable = false;
                }

                if (vm.roleGERENTE) {
                    vm.empleados = EmployeesGERENTE.query({ managerId: account.employeeId
                    }, function (result) {
                        // Once we have the users, check if there is a previously selected employee
                        if (prevState && prevState.params.empleado) {
                            // Obtains the employee from the list of employees
                            var employee = result.filter(function (ev) {
                                if (ev.id === prevState.params.empleado) {
                                    return ev;
                                }
                            });
                            // Set the employee as the combo value
                            if (employee.length > 0) {
                                vm.empleado.info = employee[0];
                            }
                        }
                    });
                    vm.leaders = LeadersGERENTE.query({
                        managerId: account.employeeId
                    });

                    // Now checks if there is a previously selected employee and search for its evaluations
                    if (prevState && prevState.params !== undefined) {
                        vm.change(prevState.params.empleado);
                    }
                    vm.esModificable = false;
                }

                if (vm.roleRRHH) {
                    EmployeesRRHH.query(function (result) {
                        //busca y recupera el propio usuario para añadirlo a la lista de empleados
                        //los empleados con rol rrhh no ven a los otros de rrhh y asi puede verse a si mismo
                        result.splice(0, 0, {
                            id: vm.account.employeeId,
                            employeeId: vm.account.employeeId,
                            firstSurname: vm.account.lastName,
                            name: vm.account.firstName
                        });
                        vm.empleados = result;
                    });
                    LeadersRRHH.query(function (result5) {
                        vm.leaders = result5;
                    });
                }
                $previousState.forget('consult');
            }
            if ($state.current.name !== 'login') {
                vm.isAuthenticated = Principal.isAuthenticated();
            }
        });
    }

    vm.showEvaluatorInput = function (evaluacion) {
        var showInput = true;
        // Leaders, HR, Managers, Directors and Admin can see this input.
        if (vm.isLeader || vm.roleRRHH || vm.roleGERENTE || vm.roleDIRECTOR || vm.roleDIRECTORG || vm.roleADMIN) {
            showInput = true;
        }
        // Only case when the user cant see the input is when the user is the evaluated employee.
        if (evaluacion.employeeId == vm.account.employeeId) {
            showInput = false;
        }
        return showInput;
    };

    vm.isEvaluador = function (evaluacion) {
        return evaluacion.leaderId == vm.account.employeeId;
    };

    vm.modificable = function (evaluacion) {
        return IsModificableService.modificable(vm.account, evaluacion, vm.evaluationYear, vm.isEvaluationDate, vm.isFinalEvaluationDate, vm.roleRRHH, vm.roleDIRECTORG, vm.roleADMIN);
    };

    vm.mostrarEvaluacion = function (evaluacion) {
        SharingEvaluationService.setId(evaluacion.id);
        SharingEvaluationService.setModification(vm.modificable(evaluacion));
        SharingEvaluationService.setEvaluado(evaluacion);
        $stateParams.empleado = evaluacion.employeeId;
        $stateParams.leader = vm.leader.info;
        $stateParams.evaluation = evaluacion;
        $stateParams.showInput = vm.showEvaluatorInput(evaluacion);
        $state.go('consultEvaluation');
    };

    vm.changeLeaderUser = function (idEmpleado) {
        if (Mentoring.isUndefinedOrNull(vm.empleadoLeaderUser.info)) {
            EvaluationsAllEmployees.query({
                employeeId: vm.account.employeeId
            }, function (evaluaciones) {
                vm.evaluations = evaluaciones;
            });
        } else {
            EmployeeEvaluationResource.query({
                employeeId: vm.empleadoLeaderUser.info.employeeId
            }, function (evaluaciones) {
                vm.evaluations = evaluaciones;
            });
        }
    };

    vm.change = function (dato1) {
        if (Mentoring.isUndefinedOrNull(dato1)) {
            if (Mentoring.isUndefinedOrNull(vm.leader.info) || Mentoring.isUndefinedOrNull(vm.leader.info.id)) {
                vm.evaluations = [];
            } else {
                vm.evaluations = EvaluationsMandoCn.query({
                    leaderId: vm.leader.info.id
                });
            }
        } else {
            if (Mentoring.isUndefinedOrNull(vm.leader.info) || Mentoring.isUndefinedOrNull(vm.leader.info.id)) {
                vm.evaluations = EmployeeEvaluationResource.query({
                    employeeId: dato1
                });
            } else {
                vm.evaluations = EvaluationEmployeeLeaderResource.query({
                    employeeId: dato1,
                    leaderId: vm.leader.info.id
                });
            }
        }
    };

    vm.changeMando = function (dato2) {
        vm.dato2 = dato2;
        if (Mentoring.isUndefinedOrNull(dato2)) {
            if (Mentoring.isUndefinedOrNull(vm.empleado.info) || Mentoring.isUndefinedOrNull(vm.empleado.info.id)) {
                vm.evaluations = [];
            } else {
                vm.evaluations = EmployeeEvaluationResource.query({
                    employeeId: vm.empleado.info.id
                });
            }
        } else {
            if (Mentoring.isUndefinedOrNull(vm.empleado.info) || Mentoring.isUndefinedOrNull(vm.empleado.info.id)) {
                vm.evaluations = EvaluationsMandoCn.query({
                    leaderId: dato2
                });
            } else {
                vm.evaluations = EvaluationEmployeeLeaderResource.query({
                    employeeId: vm.empleado.info.id,
                    leaderId: dato2
                });
            }
        }
    };
}
angular.module('mentoringApp').controller('ConsultController', ConsultController);
//# sourceMappingURL=consult.controller.js.map
