/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
/*@ngInject*/
function CTModelController($rootScope, $log, $state, $stateParams, $q, $translate, $window, Principal, EvaluationsConsultLeader, EmployeeEvaluableIdResource, EmployeeLeaderResource, EmployeesDIRECTOR, LeadersDIRECTOR, EmployeesGERENTE, LeadersGERENTE, EmployeesRRHH, LeadersRRHH, EmpleadosCn, AllocationsLeader, CTModelService) {

    var vm = this;
    $rootScope.activeOption = 'information';

    // Function that inits the values of the controller.
    vm.initCtrl = function () {
        if ($state.current.name !== 'login') {
            $rootScope.activeOption = 'information';
            Principal.identity().then(function (account) {
                if (account == null) {
                    $state.go('login');
                }
                // If the employee is authorized to see the page...
                if (handleRoles(account.roles) || account.isLeader) {
                    vm.linkPDF = 'InfoV&Y/PDFs/COMPONENTES-TEMPERAMENTALES.pdf';
                    if (!Mentoring.isUndefinedOrNull(account) && !Mentoring.isUndefinedOrNull(account.roles)) {
                        vm.leader = {};
                        vm.evaluation = {};
                        vm.empleado = {};
                        vm.empleadoLeaderUser = {};
                        vm.isLeader = account.isLeader;

                        // Handle the visibility permissions
                        if (vm.roleRRHH || vm.roleGERENTE || vm.roleDIRECTOR || vm.roleDIRECTORG || vm.roleADMIN) {
                            vm.isVisibleMando = true;
                        } else if (vm.roleUSER) {
                            vm.isVisibleLeader = true;
                            vm.empleadosLeaderUser = EvaluationsConsultLeader.query({
                                leaderId: account.employeeId
                            });
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
                                        if (current.id === account.employeeId) {
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

                    // Finally, handles the possible state params
                    if ($stateParams.leaderId !== '' && $stateParams.employeeId !== '') {
                        // Obtains both employee and leader ids from the $state params
                        vm.employeeId = parseInt($stateParams.employeeId);
                        vm.leaderId = parseInt($stateParams.leaderId);

                        // Load init information from those values
                        vm.getCTModelsEmployee(vm.employeeId);
                    }
                } else {
                    $log.error('Usuario intentado acceder a un area donde no tiene autorizacion -> ' + $state.current.name);
                    $state.go('home');
                }
            });
        }
    };

    // Handles the change on employees combo.
    vm.getCTModelsEmployee = function (employeeId) {
        // If there is an employee selected, obtains the CT Results.
        if (employeeId) {
            // Stores the employeeId, we can use it later when reloading the page after a ct result save
            vm.employeeId = employeeId;
            CTModelService.getByEmployeeId({ employeeId: employeeId }, handleCTResultsResponse);
            // If there is no employee selected, first check if there was a leader selected.
            // In this case do the same as if the user has selected that leader id.
        } else if (!Mentoring.isUndefinedOrNull(vm.leaderId)) {
                vm.changeEvaluator(vm.leaderId);
                // Otherwise, empty the resuts table.
            } else {
                    vm.CTResults = null;
                }
    };

    // Handles the changes on the evaluator combo
    vm.changeEvaluator = function (leaderId) {
        // Stores the selected leader id because we may need it later, in the case that the user selects an empty
        // option on employees combo.
        vm.leaderId = leaderId;

        vm.autoEvaluation = null;
        vm.finalEvaluation = null;
        // Check if we have a copy of all the employee combo list before doing nothing
        if (Mentoring.isUndefinedOrNull(vm.empleadosCopy)) {
            vm.empleadosCopy = angular.copy(vm.empleados);
        }
        // If there is no leaderId selected, the employees combo should be filled with all the employees
        if (Mentoring.isUndefinedOrNull(leaderId)) {
            vm.empleados = vm.empleadosCopy;
        } else {
            // Obtains leader CT evaluations to be shown in the table
            CTModelService.getLeaderEvaluations({ leaderId: leaderId }, handleCTResultsResponse);

            // Obtains the leader allocation to handle the employee combo
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

    // Handles the click event on a CTResult
    vm.showResult = function (result) {
        // Initialize variables
        vm.newCtResult = false;
        vm.CTResult = result;
        prepareShowCTResult();

        // Delete previous selected rows§
        vm.CTResults.map(function (r) {
            delete r.selected;
        });
        // Select the current row
        result.selected = true;

        // Obtains the answers
        CTModelService.getCTAnswers({ employeeId: result.employeeId, answersId: result.answersId }, function (result) {
            var _loop = function (r, l) {
                var res = result[r];
                // Iterate over vm.Questions to obtain the question object of the current answer
                vm.Questions.filter(function (q) {
                    return q.id === res.ctQuestion.id;
                }).map(function (q) {
                    // Once we have the Question, iterate over vm.Answers to know which label it should have§
                    for (var a = 0, la = vm.Answers.length; a < la; a++) {
                        var ans = vm.Answers[a];
                        // If the Answer defind value it's the same as the iterated answer,
                        // assign Answer label to Question Object
                        if (ans.value === res.value) {
                            q.value = ans.label;
                            break;
                        }
                    }
                });
            };

            // Iterate over all the answers to obtain its question from vm.Questions
            for (var r = 0, l = result.length; r < l; r++) {
                _loop(r, l);
            }
        });
    };

    // Handles the neccesary steps to create a new CT Result evaluation.
    vm.newCTResult = function () {
        // Flag to mark the CTResult as new.
        vm.newCtResult = true;
        vm.ResultEvaluation = null;
        vm.CTResults.map(function (r) {
            delete r.selected;
        });
        prepareShowCTResult();

        // Creates the object that will hold the CT Result values
        vm.CTResult = {
            employeeId: vm.empleado.info.employeeId
        };
    };

    // Calculates the result of a CT Evaluation
    vm.calculateCTResult = function () {
        // Calculate the result
        var result = prepareInputObject();
        if (!result) {
            defaultMsgModal();
            vm.Modal.msg = 'information.ct.modal.error.combo';
            $('#myModal').modal('show');
            return;
        }

        CTModelService.obtainResult(vm.CTResult, function (result) {
            // Creates the ResultEvaluation object
            vm.ResultEvaluation = {
                principal: result.principal,
                second: result.second,
                third: result.third,
                control: result.control
            };

            // Get the styles
            vm.ResultEvaluation.principal['class'] = getStyle(vm.ResultEvaluation.principal.key);
            vm.ResultEvaluation.second['class'] = getStyle(vm.ResultEvaluation.second.key);
            vm.ResultEvaluation.third['class'] = getStyle(vm.ResultEvaluation.third.key);

            // Calculates Control label
            var control = vm.ResultEvaluation.control;
            if (control <= 3) {
                control = 'information.ct.control.muybajo';
            } else if (control >= 4 && control <= 6) {
                control = 'information.ct.control.mediobajo';
            } else if (control >= 7 && control <= 9) {
                control = 'information.ct.control.medio';
            } else if (control >= 10 && control <= 13) {
                control = 'information.ct.control.medioalto';
            } else {
                control = 'information.ct.control.alto';
            }
        }, function (error) {
            defaultMsgModal();
            vm.Modal.msg = 'information.ct.modal.error.calculate';
            $('#myModal').modal('show');
        });
    };

    // Saves a CT Result
    vm.saveCTResult = function () {
        // First, prepare the input object
        var result = prepareInputObject();
        if (!result) {
            defaultMsgModal();
            vm.Modal.msg = 'information.ct.modal.error.combo';
            $('#myModal').modal('show');
            return;
        }

        // Finally, dispatch the request
        CTModelService.saveCTResult(vm.CTResult, function (result) {
            defaultMsgModal();
            vm.Modal.title = 'information.ct.modal.success.title';
            vm.Modal.msg = 'information.ct.modal.success.save';
            vm.Modal.action = function () {
                $state.go($state.current, { leaderId: vm.leaderId, employeeId: vm.employeeId }, { reload: true, notify: true });
            };
            $('#myModal').modal('show');
        }, function (error) {
            defaultMsgModal();
            vm.Modal.msg = 'information.ct.modal.error.save';
            $('#myModal').modal('show');
        });
    };

    // Prepares an object ready to be sent to the server
    var prepareInputObject = function prepareInputObject() {
        var questionsAux = angular.copy(vm.Questions);

        // Validates the form
        var error = false;
        vm.Questions.map(function (q) {
            if (Mentoring.isUndefinedOrNull(q.value) || q.value === '?') {
                q.styleClass = 'ct-model-error';
                error = true;
            } else {
                q.styleClass = '';
            }
        });
        // If there is a validation error, return false
        if (error) {
            return false;
        }

        // Otherwise, process the object
        vm.CTResult.answers = [];
        // First, adds the answer values to the object
        vm.Questions.map(function (q) {
            var value = q.value;
            delete q.value;
            vm.CTResult.answers.push({
                ctQuestion: {
                    id: q.id,
                    ctModel: {
                        id: q.ctModel.id
                    } },
                value: value
            });
        });

        vm.Questions = angular.copy(questionsAux);
        return true;
    };

    // Handles a server response containing CTResults.
    var handleCTResultsResponse = function handleCTResultsResponse(result) {
        vm.CTResults = [];
        result.map(function (r) {
            var employee = r.employee.firstSurname + ' ' + r.employee.secondSurname + ', ' + r.employee.name;
            var leader = r.leader.firstSurname + ' ' + r.leader.secondSurname + ', ' + r.leader.name;

            // Calculates Control label
            var control = r.control;
            if (control <= 3) {
                control = 'information.ct.control.muybajo';
            } else if (control >= 4 && control <= 6) {
                control = 'information.ct.control.mediobajo';
            } else if (control >= 7 && control <= 9) {
                control = 'information.ct.control.medio';
            } else if (control >= 10 && control <= 13) {
                control = 'information.ct.control.medioalto';
            } else {
                control = 'information.ct.control.alto';
            }

            // Push the result in the results array
            vm.CTResults.push({
                employeeId: r.employee.id, answersId: r.answersId,
                principal: r.principal.key, second: r.second.key, third: r.third.key, control: control,
                principalClass: getStyle(r.principal.key),
                secondClass: getStyle(r.second.key),
                thirdClass: getStyle(r.third.key),
                date: r.dateAdd, employee: employee, leader: leader
            });
        });
    };

    // Prepares the controller for show a CTResult, wheter is a new one or a saved one.
    var prepareShowCTResult = function prepareShowCTResult() {
        // Creates the Answers object that will contain the combo options.
        if (vm.Answers === undefined) {
            vm.Answers = [{ value: 2, label: $translate.instant('information.ct.answer.yes') }, { value: 0, label: $translate.instant('information.ct.answer.no') }, { value: 1, label: $translate.instant('information.ct.answer.na') }];
        }

        // Obtains the questions
        vm.Questions = [];
        vm.Models = {};
        // If the questions hasn't been obtained before, get them!
        if (vm.Questions.length === 0) {
            CTModelService.getQuestions({}, function (result) {
                vm.Questions = result;
                result.map(function (q) {
                    switch (q.ctModel.id) {
                        case 1:
                            vm.Models.red = q.ctModel;break;
                        case 2:
                            vm.Models.yellow = q.ctModel;break;
                        case 3:
                            vm.Models.blue = q.ctModel;break;
                        case 4:
                            vm.Models.green = q.ctModel;break;
                        case 5:
                            vm.Models.orange = q.ctModel;break;
                        case 6:
                            vm.Models.pink = q.ctModel;break;
                        case 7:
                            vm.Models.grey = q.ctModel;break;
                    }
                });
            });
        };
    };

    /* Prepares Model object with default variables */
    var defaultMsgModal = function defaultMsgModal() {
        vm.Modal = {
            title: 'information.ct.modal.error.title',
            button: 'information.ct.modal.ok',
            action: function action() {
                $('#myModal').modal('hide');
            }
        };
    };

    /* Creates the roles values for the controller and returns if the role is valid for access the page */
    var handleRoles = function handleRoles(roles) {
        vm.roleUSER = roles.indexOf('ROLE_USER') > -1;
        vm.roleRRHH = roles.indexOf('ROLE_RRHH') > -1;
        vm.roleGERENTE = roles.indexOf('ROLE_GERENTE') > -1;
        vm.roleDIRECTOR = roles.indexOf('ROLE_DIRECTOR') > -1;
        vm.roleDIRECTORG = roles.indexOf('ROLE_DIRECTORG') > -1;
        vm.roleADMIN = roles.indexOf('ROLE_ADMIN') > -1;

        return vm.roleADMIN || vm.roleRRHH || vm.roleGERENTE || vm.roleDIRECTOR || vm.roleDIRECTORG;
    };

    // Returns the correpondant css class for a given component key
    var getStyle = function getStyle(item) {
        if (item.indexOf('red') > -1) {
            return 'circle-red';
        } else if (item.indexOf('yellow') > -1) {
            return 'circle-yellow';
        } else if (item.indexOf('blue') > -1) {
            return 'circle-blue';
        } else if (item.indexOf('green') > -1) {
            return 'circle-green';
        } else if (item.indexOf('orange') > -1) {
            return 'circle-orange';
        } else if (item.indexOf('pink') > -1) {
            return 'circle-pink';
        } else if (item.indexOf('grey') > -1) {
            return 'circle-grey';
        }
    };

    /* Inits the controller */
    vm.initCtrl();
};
angular.module('mentoringApp').controller('CTModelController', CTModelController);
//# sourceMappingURL=CTModel.controller.js.map
