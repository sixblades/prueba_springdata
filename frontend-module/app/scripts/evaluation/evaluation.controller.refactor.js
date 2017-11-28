/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
/*@ngInject*/
function EvaluationController($rootScope, $sce, $state, Principal, $translate, QuestionsResource, LastEvaluationAssigned, 
    GetLastAutoEvalByEmployeeId, LastEvaluationAssignedWithEvalType, StatesResource, AnswersSelect, AnswersEval, 
    EmpleadosEvaluables, EvaluationEmployeeLeaderResource, AnswersResource, EmpleadosAE, EmployeeEvaluationResource, 
    CompetencesResource, PillarsResource, isEvaluationDate, isFinalEvaluationDate, EmployeeIsLeaderResource, 
    EmployeesRRHH, PrintService) {

	var vm = this;
	
	var idToModify; //en caso de que en el alta se cargue una evaluacion existente, se almacenara su id por si se quiere modificar.

	// Comprobamos si el estado es diferente al login
	if ($state.current.name != 'login') {
		Principal.identity().then(function (account) {
			// Activamos la opción de menú Alta de Evaluación
			$rootScope.activeOption = "evaluation";
			// Recuperamos la información del usuario
			vm.account = account;
			// Asignamos los permisos del usuario a partir de su role.
			if (!Mentoring.isUndefinedOrNull(account) && !Mentoring.isUndefinedOrNull(account.roles) && !Mentoring.isUndefinedOrNull(account.isLeader)) {
				vm.isLeader = account.isLeader;
				vm.employeeId = account.employeeId;
				//permite al usuario dar de alta una evaluacion
				vm.evaluableByUser = (account.isLeader == 1 || account.roles.indexOf('ROLE_RRHH') > -1) ? true : false;
				vm.user = {
                    firstName: account.firstName,
                    lastName: account.lastName
                };
				vm.roleDIRECTOR = account.roles.indexOf('ROLE_DIRECTOR') > -1;
				vm.roleDIRECTORG = account.roles.indexOf('ROLE_DIRECTORG') > -1;
				vm.roleGERENTE = account.roles.indexOf('ROLE_GERENTE') > -1;
				vm.roleADMIN = account.roles.indexOf('ROLE_ADMIN') > -1;
				vm.roleRRHH = account.roles.indexOf('ROLE_RRHH') > -1;
				vm.isEvaluation = false;
                
				//El usuario puede autoevaluarse en funcion de su rol
				vm.isAutoEvaluation = (vm.roleDIRECTOR || vm.roleGERENTE || vm.roleDIRECTORG) ? false : true;
				vm.destacados = [];
				vm.mejorar = [];
				vm.listSelect = [];

				// Chart.js Data
				vm.data = {
					labels: ['Gestión: Talent', 'Gestión: Attitude', 'Gestión: Business', 'Mando: Talent Attitude', 'Mando: Business', 'VASS'],
					datasets: [{
						label: 'Evaluación', fillColor: 'rgba(151,187,205,0.2)', strokeColor: 'rgba(151,187,205,1)',
						pointColor: 'rgba(151,187,205,1)', pointStrokeColor: '#fff',
						pointHighlightFill: '#fff', pointHighlightStroke: 'rgba(220,220,220,1)',
						data: [70, 88, 87, 70, 75, 85]
					}]
				};

				// Chart.js Options
				vm.options = {
					responsive: true, scaleShowLine: true, angleShowLineOut: true, scaleShowLabels: false,
					scaleBeginAtZero: true, angleLineColor: 'rgba(0,0,0,.1)',
					angleLineWidth: 1, pointLabelFontFamily: '"Arial"',
					pointLabelFontStyle: 'normal', pointLabelFontSize: 10, pointLabelFontColor: '#666', pointDot: true,
					pointDotRadius: 3, pointDotStrokeWidth: 1, pointHitDetectionRadius: 20,
					datasetStroke: true, datasetStrokeWidth: 2, datasetFill: true,
					legendTemplate: '<ul class="tc-chart-js-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
				};

				//Recuperamos si estamos o no en periodo de evaluacion
				isEvaluationDate.get((isDate) => {
					vm.isEvaluationDate = isDate.value;
				});
                //Recuperamos si estamos en evaluacion final o no
                isFinalEvaluationDate.get((isDate) => {
                    vm.isFinalEvaluationDate = isDate.value;
                    populateAndShowEvaluations();
                });

				var populateAndShowEvaluations = () => {
                    let classStr = 'panel panel-info evaluacion_forms';
					if (account.isLeader == 1 || vm.roleRRHH) {
						vm.empleado = [];
						if (!(vm.roleDIRECTORG || vm.roleADMIN)) {
							EmpleadosAE.query({leaderId: vm.employeeId}, (result) => {
								vm.evaluables = result;
								if (vm.isEvaluationDate) {
									vm.classEval = classStr;
								}
							});
						}
						if (vm.roleDIRECTORG || vm.roleADMIN) {
							EmpleadosEvaluables.query({leaderId: vm.employeeId}, (result) => {
								vm.evaluables = result;
							});
						}
						if (vm.roleRRHH) {
							EmployeesRRHH.query((result) => {
								vm.evaluables = result;
							});
						}
					} else {
						if (vm.isEvaluationDate) {
							vm.classEval = classStr;
						} else {
							vm.classEval = classStr;
						}
					}
                    
                    vm.isFinalEvaluation = vm.isFinalEvaluationDate;
                    vm.classEval = vm.isFinalEvaluation ? classStr + ' final' : classStr;

					// Consultamos los valores para cargar las preguntas y respuestas
					vm.questions = []; vm.states = []; vm.empleado = []; vm.competence = []; vm.pillar = [];
					vm.evaluable = []; vm.destacados = []; vm.mejorar = []; vm.selected = []; vm.respuesta = [];
					vm.msgModal = 'incorrecto';

					vm.loadAll();

					/** vm.selected = [];
					vm.respuesta = []; */

					// En periodo de autoevaluacion renderizamos la ultima, si la hay
					if (vm.isEvaluationDate) {
						getAndRenderLastEvaluation(vm.employeeId, vm.employeeId, 'auto');
					}
					
					GetLastAutoEvalByEmployeeId.query({employeeId: vm.employeeId}, (result) => {
                        if (result.length > 0) {
                            idToModify = result[0].id;
                            vm.observaciones = result[0].observations;
                            let codigoResp = result[0].id;
                            if (codigoResp != undefined) {
                                AnswersResource.query({id: codigoResp}, answersResourceCb);
                                AnswersSelect.query({id: codigoResp}, (res) => {
                                    for(var i=0,len=result.length; i<len; i++) {
                                        if(i<3) {
                                            vm.destacados[i] = result[i].questionCode;
                                        } else {
                                            vm.mejorar[i] = result[i].questionCode;
                                        }
                                    }
                                });
                            }
                        }
					});
						
					// Comprobamos si el usuario está autenticado.
					if ($state.current.name != 'login') {
						vm.isAuthenticated = Principal.isAuthenticated();
					}
				};
			}
		});
	}
	
	/* Muestra o no el formulario de auto evaluacion */
	vm.showEvaluationForm = function() {
		return vm.roleDIRECTORG || vm.roleADMIN || vm.roleRRHH || vm.isLeader || vm.isEvaluationDate;
	};
	
	vm.getQuestionCode = function (questionCode) {
		vm.codePregunta = questionCode;
		vm.definicionInfo = $sce.trustAsHtml($translate.instant('evaluation.info.' + questionCode + '.comportamientoInfo'));
	};

	// Función para cargar los valores del controlador
	vm.loadAll = () => {
		if (Mentoring.isUndefinedOrNull(vm.evaluable.info)) {
			if (vm.isLeader === 0) {
				QuestionsResource.query({leader: 0}, (result) => {
					vm.questionss = result;
				});
			} else {
				QuestionsResource.query((result) => {
					vm.questionss = result;
				});
			}
		}
		CompetencesResource.query((result) => {
			let aux = [];
			let j = 0;
			if (vm.isLeader === 0) {
				for (let aa in result) {
					if (result[aa].competenceCode != 'mando') {
						aux[j] = result[aa];
						j++;
					}
				}
				vm.competences = aux;
			} else {
				vm.competences = result;
			}
		});
        loadPillarsAndStates();
	};
    
	vm.select = function (index, idPregunta) {
		vm.selected[idPregunta] = index;
	};

	vm.change = function () {
		idToModify = null;
		vm.observaciones = '';
		vm.selected = [];
		vm.respuesta = [];
		vm.destacados = [];
		vm.mejorar = [];
			
		// Comprobamos que hay seleccionado uno (evaluamos a alguien)
		if (!Mentoring.isUndefinedOrNull(vm.evaluable.info)) {
			// Pondremos las preguntas en funcion de si el evaluado es o no lider
			EmployeeIsLeaderResource
                .get({employeeId: (vm.evaluable.info.employeeId || vm.evaluable.info.id)}, (isLeaderResult) => {
                    buildQuestions4Evaluation(parseInt(isLeaderResult[0]));
                    // Solo recuperamos en caso de autoevaluaciones o evaluaciones finales
                    if (vm.isFinalEvaluationDate || vm.isEvaluationDate) {
                        var employeeId = (vm.evaluable.info.employeeId || vm.evaluable.info.id);
                        getAndRenderLastEvaluation(employeeId, vm.employeeId, getEvaluationType());
                    }
			});
		}
	};

	function getEvaluationType() {
		var result = 'eval';
        
		if (vm.isFinalEvaluationDate) {
			result = 'final';
		} else if (vm.isEvaluationDate) {
			result = 'auto';
		}
		return result;
	}

	// creo que no esta bien, hace consulta de las evaluaciones (empleado, lider) y renderiza la primera posicion del resultado
	function heredado(employeeIdVal, leaderIdVal) {
		EvaluationEmployeeLeaderResource.query({employeeId: employeeIdVal, leaderId: leaderIdVal}, 
            (result) => {
                if (result.length > 0) {
                    idToModify = result[0].id;
                    var codigoResp = result[0].id;
                    var observaciones = result[0].observations;
                    vm.observaciones = observaciones;
                    if (!Mentoring.isUndefinedOrNull(codigoResp)) {
                        getAnswersCodigo(codigoResp, true);
                    }
                }
		});
	}

	function getAndRenderAllEvaluationByEmployee(employeeId) {
		EmployeeEvaluationResource.query({employeeId: employeeId}, obtainEvaluationEmployeeCb);
	}

	function isDirectorOrDirectorGOrAdminIrRRHHRol() {
		return (vm.roleDIRECTOR || vm.roleDIRECTORG || vm.roleADMIN || vm.roleRRHH);
	}

	function getAndRenderLastEvaluation(employeeIdVal, leaderIdVal, evaluationTypeVal) {
		LastEvaluationAssignedWithEvalType.get({
			employeeId: employeeIdVal, 
            leaderId: leaderIdVal, 
            evaluationType: evaluationTypeVal
		}, lastEvaluationCb);
	}

	function buildQuestions4Evaluation(isLeaderResult) {
		vm.loadAll = function () {
			if (isLeaderResult === 0) {
				QuestionsResource.query({leader: 0}, (result) => {
					vm.questionss = result;
				});
			} else {
				QuestionsResource.query((result) => {
					vm.questionss = result;
				});
			}
		};
		CompetencesResource.query((result) => {
			let aux = [];
			let j = 0;
			if (isLeaderResult === 0) {
				for (let aa in result) {
					if (result[aa].competenceCode != 'mando') {
						aux[j] = result[aa];
						j++;
					}
				}
				vm.competences = aux;
			} else {
				vm.competences = result;
			}
		});
		loadPillarsAndStates();
		vm.loadAll();
	}

	/** Función que se lanza al realizar un cambio en alguno de los selectores. */
	vm.changeoLD = function (dato) {
		idToModify = undefined;
        vm.observaciones = '';
        vm.selected = [];
        vm.respuesta = [];
        vm.observaciones = '';
        vm.destacados = [];
        vm.mejorar = [];
        
		if (!(vm.roleDIRECTOR || vm.roleDIRECTORG || vm.roleADMIN || vm.roleRRHH)) {
			if (Mentoring.insUndefinedOrNull(vm.evaluable.info)) {
				vm.isAutoEvaluation = vm.isEvaluation ? true : false;
				EmployeeEvaluationResource.query({employeeId: vm.employeeId}, obtainEvaluationEmployeeCb);

			} else {
				vm.isEvaluation = true;
				EmployeeIsLeaderResource.get({employeeId: vm.evaluable.info.employeeId}, obtainEmployeeLeaderCb);

				LastEvaluationAssigned.get({
					employeeId: vm.evaluable.info.employeeId, leaderId: vm.employeeId
				}, lastEvaluationCb);

			}
		} else {

			if (Mentoring.insUndefinedOrNull(vm.evaluable.info)) {
				vm.isAutoEvaluation = vm.isEvaluation ? true : false;
				EmployeeEvaluationResource.query({employeeId: vm.employeeId}, obtainEvaluationEmployeeCb);

			} else {
				vm.isEvaluation = true;
				EmployeeIsLeaderResource.get({employeeId: vm.evaluable.info.id}, obtainEmployeeLeaderCb);
				EvaluationEmployeeLeaderResource.query(
                    {employeeId: vm.evaluable.info.id, 
                    leaderId: vm.employeeId
				}, obtainEvaluationEmployeeCb);
			}
		}
	};
    
    var lastEvaluationCb = (lastEvaluation) => {
        if (!Mentoring.isUndefinedOrNull(lastEvaluation)) {
            idToModify = lastEvaluation.id;
            var codigoResp = lastEvaluation.id;
            vm.observaciones = lastEvaluation.observations;
            if (!Mentoring.isUndefinedOrNull(codigoResp)) {
                getAnswersCodigo(codigoResp, true);
            }
        }
    };
    var obtainEvaluationEmployeeCb = (result) => {
        if (result.length > 0) {
            idToModify = result[0].id;
            var codigoResp = result[0].id;
            vm.observaciones = result[0].observations;
            if (!Mentoring.isUndefinedOrNull(codigoResp)) {
                getAnswersCodigo(codigoResp, true);
            }
        }
    };
    var obtainEmployeeLeaderCb = (result2) => {
		vm.evaluadoLider = parseInt(result2[0]);
        vm.loadAll = function () {
            if (vm.evaluadoLider === 0) {
                QuestionsResource.query({leader: 0}, (result) => {
                    vm.questionss = result;
                });
            } else {
                QuestionsResource.query((result) => {
                    vm.questionss = result;
                });
            }
        };
        CompetencesResource.query((result) => {
            let aux = [];
            let j = 0;
            if (vm.evaluadoLider === 0) {
                for (let aa in result) {
                    if (result[aa].competenceCode != 'mando') {
                        aux[j] = result[aa];
                        j++;
                    }
                }
                vm.competences = aux;
            } else {
                vm.competences = result;
            }
        });
        loadPillarsAndStates();
        vm.loadAll();
    };
    
    /* Loads the pillars and states */
    var loadPillarsAndStates = () => {
        StatesResource.query((result) => {
            vm.statess = result;
        });
        PillarsResource.query((result) => {
            vm.pillars = result;
        });
    };

	/** Función para enviar la evaluación. */
	vm.submitForm = function (valido, datos, observaciones) {
		if (!vm.account.isLeader && vm.roleRRHH && !vm.roleADMIN) {
			// Dialogo de error al guardar un alta nueva siendo RRHH y no siendo leader
			vm.msgModal = 'errorRRHHAlta';
            $('#myModalGuardado12345').modal('show');
		}
		// intenta autoevaluarse alguien no evaluable
		else if (Mentoring.isUndefinedOrNull(vm.evaluable.info) && !vm.account.isEvaluable) {
			vm.msgModal = 'errorNoEvaluable';
            $('#myModalGuardado12345').modal('show');
		}
		// empleado se intenta autoevaluar cuando no es periodo de autoevaluacion
		else if (Mentoring.isUndefinedOrNull(vm.evaluable.info) && !vm.isEvaluationDate) {
			vm.msgModal = 'errorNoAutoEvaluable';
            $('#myModalGuardado12345').modal('show');
            
		} else if (valido) {
			if (vm.validarNoSeObserva(datos)) {
				vm.msgModal = 'correcto';
				let evaluationToSave = null;
				let evaluationType = null;
				let employee = null;
				
                if ((Mentoring.isUndefinedOrNull(vm.evaluable.info) || vm.evaluable.info.id === vm.employeeId) && vm.isEvaluationDate) {
					employee = vm.employeeId;
					evaluationType = 'auto';
					evaluationToSave = AnswersEval.agrupar2(datos, employee, employee, observaciones, evaluationType, vm.isFinalEvaluationDate, idToModify);
				} else {
					if (!(vm.roleDIRECTOR || vm.roleDIRECTORG || vm.roleADMIN)) {
						employee = vm.evaluable.info.employeeId;
					} else {
						employee = vm.evaluable.info.id;
					}
					var evaluator = vm.employeeId;
					evaluationType = vm.isFinalEvaluationDate ? 'final' : 'eval';
					evaluationToSave = AnswersEval.agrupar2(datos, evaluator, employee, observaciones, evaluationType, vm.isFinalEvaluationDate, idToModify);
				}
				var numDes = 1;
				var numMej = 4;
                
				//despues de guardar la evaluacion y recuperar el id , se guardan y se relacionan sus respuestas
				AnswersEval.guardar2(evaluationToSave).then((obj) => {
					let currentEvalId = obj.data.id;
					let respuestaJSON = AnswersEval.agrupar(datos, currentEvalId, vm.isFinalEvaluationDate);
					AnswersEval.guardar(respuestaJSON);

					let respuestaJSON3 = AnswersEval.agrupar3(currentEvalId, numDes, vm.destacados, vm.isFinalEvaluationDate);
					AnswersEval.guardar3(respuestaJSON3);
					
                    let respuestaJSON4 = AnswersEval.agrupar3(currentEvalId, numMej, vm.mejorar, vm.isFinalEvaluationDate);
					AnswersEval.guardar3(respuestaJSON4);
                    
                    $('#myModalGuardado12345').modal('show');
				}, (reason) => {
					vm.msgModal = 'guardarFalla';
                    $('#myModalGuardado12345').modal('show');
					PrintService.print(reason.stack);
				});
			} else {
				vm.msgModal = 'noSeObserva';
                $('#myModalGuardado12345').modal('show');
			}
		}

	};

	/**
	* Método que comprueba si sólo existe una respuesta "No se Observa" por pilar.
	* @param datos
	* 			Datos que ha contestado el usuario.
	* @return boolean
	* 			Booleano que indica si e
	*/
	vm.validarNoSeObserva = function (datos) {
		var pillars = '';
		var pillar;
		for (var i in datos) {
			if (datos[i] === 6) {
				pillar = vm.getPillar('preg' + i);
				// Comprobamos si existe el pillar
				if (pillar !== 0) {
					if (pillars.indexOf(pillar) < 0) {
						pillars += pillar;
					} else {
						return false;
					}
				}
			}
		}
		return true;
	};

	/**
	* Método que recupera del listado de competencias el código del pilar al que pertenece a partir del código de la competencia.
	* 
	* @param questionId
	* 			Identificador de la pregunta.
	* @return pillarId 
	* 			indentificador del pilar al que pertenece la competencia
	*/
	vm.getPillar = function (questionId) {
		var questions = vm.questionss;
		if (!Mentoring.isUndefinedOrNull(questions)) {
			for (var i = 0, len=questions.length; i < len; i++) {
				if (questions[i].questionsCode === questionId) {
					return questions[i].pillarId;
				}
			}
		}
		return 0;
	};


	vm.add = function () {
		vm.listSelect = [];
		for(var i=0; i<3;i++) {
			if (!Mentoring.isUndefinedOrNull(vm.destacados[i])) {
				vm.listSelect.push(vm.destacados[i]);
			}
			if (!Mentoring.isUndefinedOrNull(vm.mejorar[i])) {
				vm.listSelect.push(vm.mejorar[i]);
			}
		}
	};
	
	function getAnswersCodigo(codigoResp, push) {
		AnswersResource.query({id: codigoResp}, answersResourceCb);
        
		AnswersSelect.query({id: codigoResp}, (result) => {
			for(var i=0,len=result.length;i<len;i++) {
				if(i<3) {
					vm.destacados[i] = result[i].questionCode;
				} else {
					vm.mejorar[i] = result[i].questionCode;
				}
				if(push) {
					vm.listSelect.push(result[i].questionCode);
				}
			}
		});
	}
    
    var answersResourceCb = (result) => {
        vm.respuesta = [];
        for (var i in result) {
            let item = result[i];
            vm.respuesta[item.questionId] = item.statesId;
            vm.selected[item.questionId] = item.statesId - 1;
        }
    }
}
angular.module('mentoringApp').controller('EvaluationController', EvaluationController);