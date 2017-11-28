/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
/*@ngInject*/
function ConsultEvaluationAutoevaluationController($scope, $timeout, $state, $q, $sce, $translate, StatesResource, CompetencesResource, PillarsResource, QuestionsResource, AnswersResource, AnswersSelect, Principal, EvaluationsCn, EmpleadosCn, EvaluationsMandoCn, EvaluationsConsultLeader, AllocationsLeader, EmployeeEvaluableIdResource, EmployeeLeaderResource, EmployeesDIRECTOR, LeadersDIRECTOR, EmployeesGERENTE, ConsultEvaluationAutoevaluationService, LeadersGERENTE, EmployeesRRHH, LeadersRRHH, IsModificableService) {

    var vm = this;

    // Populate years combo
    vm.years = [];
    var currentYear = new Date().getFullYear();
    for (var firstYear = 2015; firstYear <= currentYear; firstYear++) {
        vm.years.push(firstYear);
    }

    if ($state.current.name != 'login') {
        Principal.identity().then(function (account) {
            // Activamos la opción de menú Consulta de Evaluación
            $scope.$root.activeOption = "consult";
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

                // Handle the visibility permissions
                if (vm.roleRRHH || vm.roleGERENTE || vm.roleDIRECTOR || vm.roleDIRECTORG || vm.roleADMIN) {
                    vm.isVisibleMando = true;
                } else if (vm.isLeader) {
                    vm.isVisibleLeader = true;
                }

                if (vm.roleUSER && !(vm.roleRRHH || vm.roleGERENTE || vm.roleDIRECTOR || vm.roleDIRECTORG || vm.roleADMIN)) {
                    if (vm.isLeader === 0) {
                        vm.empleadosLeaderUser = EvaluationsConsultLeader.query({
                            leaderId: account.employeeId
                        });
                    } else {
                        vm.empleadosLeaderUser = EvaluationsConsultLeader.query({
                            leaderId: account.employeeId
                        });
                    }
                    vm.esModificable = false;
                }

                if (vm.roleADMIN || vm.roleDIRECTORG) {
                    var promises = [];
                    promises.push(EmployeeEvaluableIdResource.query({}, function (result) {
                        vm.empleados = result;
                    }).$promise);
                    promises.push(EmployeeLeaderResource.query({}, function (result) {
                        vm.leaders = result;
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
                    vm.empleados = EmployeesGERENTE.query({
                        managerId: account.employeeId
                    });
                    vm.leaders = LeadersGERENTE.query({
                        managerId: account.employeeId
                    });
                }

                if (vm.roleRRHH) {
                    EmployeesRRHH.query(function (result4) {
                        vm.empleados = result4;
                        //busca y recupera el propio usuario para añadirlo a la lista de empleados
                        //los empleados con rol rrhh no ven a los otros de rrhh y asi puede verse a si mismo
                        EmpleadosCn.query({
                            employeeId: account.employeeId
                        }, function (result) {
                            angular.forEach(result, function (current) {
                                if (current.id == account.employeeId) {
                                    vm.empleados.push(current);
                                }
                            });
                        });
                    });
                    LeadersRRHH.query(function (result5) {
                        vm.leaders = result5;
                    });
                }
            }
            if ($state.current.name !== 'login') {
                vm.isAuthenticated = Principal.isAuthenticated();
            }
        });
    }

    vm.isEvaluador = function (evaluacion) {
        return evaluacion.leaderId == vm.account.employeeId;
    };

    vm.modificable = function (evaluacion) {
        return IsModificableService.modificable(vm.account, evaluacion, vm.isEvaluationDate, vm.isFinalEvaluationDate, vm.roleRRHH, vm.roleDIRECTORG, vm.roleADMIN);
    };

    // Get the employee self evaluation and his/her final evaluation.
    vm.getEvaluationsEmployee = function (employeeId) {
        if (!Mentoring.isUndefinedOrNull(employeeId)) {
            vm.autoEvaluation = null;
            vm.finalEvaluation = null;

            if (Mentoring.isUndefinedOrNull(vm.year)) {
                vm.year = vm.years[vm.years.length - 1];
            }
            // Get employee evaluations
            ConsultEvaluationAutoevaluationService.get({ employeeId: employeeId, year: vm.year }, function (result) {
                // If there is no auto evaluation or no autoevaluation
                if (result.finalEvaluation === null || result.autoEvaluation === null) {
                    var msg = result.finalEvaluation == null ? 'consult.evalauto.modal.final.evaluation.error' : 'consult.evalauto.modal.auto.evaluation.error';
                    vm.Modal = {
                        msg: msg,
                        title: 'consult.evalauto.modal.error.title',
                        button: 'consult.evalauto.modal.ok',
                        action: function action() {
                            $('#myModal').modal('hide');
                        }
                    };
                    $('#myModal').modal('show');
                    return;
                }

                vm.metadata = {};
                vm.autoEvaluation = {
                    respuesta: [], destacados: [], mejorar: [], listSelect: []
                };
                vm.finalEvaluation = {
                    respuesta: [], destacados: [], mejorar: [], listSelect: []
                };

                var finalEv = result.finalEvaluation;
                var autoEv = result.autoEvaluation;
                $translate('consult.evalauto.evaluation.' + autoEv.evaluationType).then(function (value) {
                    vm.metadata.autoEvaluation = {
                        creationDate: autoEv.creationDate,
                        employeeName: autoEv.employee.firstSurname + ' ' + autoEv.employee.secondSurname + ', ' + autoEv.employee.name,
                        leaderName: autoEv.leader.firstSurname + ' ' + autoEv.leader.secondSurname + ', ' + autoEv.leader.name,
                        evaluationType: value
                    };
                });
                $translate('consult.evalauto.evaluation.' + finalEv.evaluationType).then(function (value) {
                    vm.metadata.finalEvaluation = {
                        creationDate: finalEv.creationDate,
                        employeeName: finalEv.employee.firstSurname + ' ' + finalEv.employee.secondSurname + ', ' + finalEv.employee.name,
                        leaderName: finalEv.leader.firstSurname + ' ' + finalEv.leader.secondSurname + ', ' + finalEv.leader.name,
                        evaluationType: value
                    };
                });

                CompetencesResource.query({}, function (result) {
                    vm.competences = result;
                });
                PillarsResource.query(function (result) {
                    vm.pillars = result;
                });

                var promise = undefined;
                if (vm.isLeader === 0) {
                    promise = QuestionsResource.query({ leader: 0 }, function (result) {
                        vm.questionss = result;
                    }).$promise;
                } else {
                    promise = QuestionsResource.query(function (result) {
                        vm.questionss = result;
                    }).$promise;
                }
                promise.then(function () {
                    handleAnswersResponse(result.autoEvaluation.id, vm.autoEvaluation, result.weightQuestions);
                    handleAnswersResponse(result.finalEvaluation.id, vm.finalEvaluation, result.weightQuestions);
                });
            }, function (err) {
                var msg = err.data.msg || 'consult.evalauto.modal.error';
                vm.Modal = {
                    msg: msg,
                    title: 'consult.evalauto.modal.error.title',
                    button: 'consult.evalauto.modal.ok',
                    action: function action() {
                        $('#myModal').modal('hide');
                    }
                };
                $('#myModal').modal('show');
                return;
            });
        }
    };

    // Handles the changes on the evaluator combo
    vm.changeEvaluator = function (leaderId) {
        vm.autoEvaluation = null;
        vm.finalEvaluation = null;
        if (Mentoring.isUndefinedOrNull(vm.empleadosCopy)) {
            vm.empleadosCopy = angular.copy(vm.empleados);
        }
        if (Mentoring.isUndefinedOrNull(leaderId)) {
            vm.empleados = vm.empleadosCopy;
        } else {
            AllocationsLeader.query({ leaderId: leaderId }, function (result) {
                var emps = [];
                for (var i = 0, len = result.length; i < len; i++) {
                    emps.push(result[i].employeeId);
                }
                vm.empleados = vm.empleadosCopy.filter(function (emp) {
                    return emps.indexOf(emp.id) >= 0;
                });
            });
        }
    };

    // Handles the changes on the years combo
    vm.changeYear = function () {
        // Only do something if the others combos have value.
        if (!Mentoring.isUndefinedOrNull(vm.empleado.info) && !Mentoring.isUndefinedOrNull(vm.leader.info)) {
            vm.getEvaluationsEmployee(vm.empleado.info.id);
        }
    };

    var handleAnswersResponse = function handleAnswersResponse(id, evaluation, weightQuestions) {
        var promises = [];
        // Obtains the evaluation answers
        promises.push(AnswersResource.query({ id: id }, function (result) {
            var seleccionados = [];
            var competences = { 1: false, 2: false, 3: false };

            var _loop = function (a, len) {
                var item = result[a];

                // Obtains the question relative to the answer
                var question = vm.questionss.filter(function (q) {
                    return q.id == item.questionId;
                });

                // Adds the competenceId to the map
                competences[question[0].competenceId] = true;

                // Creates the answer object containing the question code, competence, pillar and value
                var sel = {
                    'class': '',
                    questionId: question[0].questionsCode,
                    pillarId: question[0].pillarId,
                    value: item.statesId,
                    competenceId: question[0].competenceId
                };
                seleccionados[a] = sel;
            };

            for (var a = 0, len = result.length; a < len; a++) {
                _loop(a, len);
            }

            // Now trim the competence array to show only the competences which apply
            var competencesTrim = [];
            for (var o = 0, len = vm.competences.length; o < len; o++) {
                var item = vm.competences[o];
                if (competences[item.competenceId]) {
                    competencesTrim.push(item);
                }
            }
            vm.competences = competencesTrim;

            evaluation.respuesta = seleccionados;
        }).$promise);

        promises.push(AnswersSelect.query({ id: id }, function (result22) {
            if (result22.length > 0) {
                evaluation.destacados = [result22[0].questionCode, result22[1].questionCode, result22[2].questionCode];

                evaluation.mejorar = [result22[3].questionCode, result22[4].questionCode, result22[5].questionCode];

                evaluation.listSelect = [evaluation.destacados[0], evaluation.destacados[1], evaluation.destacados[2], evaluation.mejorar[0], evaluation.mejorar[1], evaluation.mejorar[2]];
            }
        }).$promise);

        $q.all(promises).then(function () {
            var _loop2 = function (a, l) {
                var item = evaluation.respuesta[a];

                // First obtains the question weight
                var weightQuestion = weightQuestions.filter(function (wq) {
                    return wq.question.questionsCode === item.questionId;
                });
                var wq = weightQuestion[0];

                // If the current competence, is key and is on the competences to improve and the score is medium-low,
                // mark the competence as critical
                if (item.value <= 3 && wq.value === 5) {
                    if (evaluation.mejorar.indexOf(item.questionId) > -1) {
                        item['class'] = 'critical';
                    }
                }

                // If there are no colour yet, search the question weight to obtain its colour.
                if (item['class'] === '') {
                    switch (wq.value) {
                        case 3:
                            item['class'] = 'medium';break;
                        case 5:
                            item['class'] = 'high';break;
                    }
                }

                // Finally, get the item translation
                var key = 'Estado' + item.value;
                item.label = $translate.instant(key);
            };

            for (var a = 0, l = evaluation.respuesta.length; a < l; a++) {
                _loop2(a, l);
            }
        });
    };

    vm.getQuestionCode = function (questionCode) {
        vm.codePregunta = questionCode;
        vm.definicionInfo = $sce.trustAsHtml($translate.instant('evaluation.info.' + questionCode + '.comportamientoInfo'));
    };
}
angular.module('mentoringApp').controller('ConsultEvaluationAutoevaluationController', ConsultEvaluationAutoevaluationController);
//# sourceMappingURL=consultEvaluationAutoevaluation.controller.js.map
